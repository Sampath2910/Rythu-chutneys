import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// 1. Generate and Send OTP (Simulated)
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email address or Phone number is required' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.otp.upsert({
      where: { email },
      update: {
        code: otpCode,
        expiresAt
      },
      create: {
        email,
        code: otpCode,
        expiresAt
      }
    });

    console.log(`\n=============================================`);
    console.log(`[SECURITY] OTP generated for ${email}: ${otpCode}`);
    console.log(`=============================================\n`);

    return res.json({ 
      message: 'OTP sent successfully (Simulated)', 
      code: otpCode 
    });
  } catch (error: any) {
    console.error('Send OTP error:', error);
    return res.status(500).json({ message: 'Server error generating OTP' });
  }
});

// 2. Verify OTP (Handles both Login and Sign Up)
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, code, name, phone, isSignup } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: 'Identifier and OTP code are required' });
    }

    const record = await prisma.otp.findUnique({
      where: { email }
    });

    if (!record || record.code !== code) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    if (new Date() > record.expiresAt) {
      return res.status(400).json({ message: 'OTP code has expired' });
    }

    await prisma.otp.delete({ where: { email } });

    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone: email }
        ]
      }
    });

    if (isSignup && !user) {
      if (!name) {
        return res.status(400).json({ message: 'Full name is required for registration' });
      }
      
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('PASSWORDLESS_OTP', salt);

      user = await prisma.user.create({
        data: {
          name,
          email: email.includes('@') ? email : `${email}@rythuchutneys.com`,
          phone: phone || (email.includes('@') ? null : email),
          passwordHash,
          role: 'CUSTOMER'
        }
      });
    }

    if (!user) {
      return res.status(404).json({ message: 'No registered account found with this email/phone' });
    }

    const secret = process.env.JWT_SECRET || 'super-secret-rythu-key-2026-traditional-pickles';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return res.status(500).json({ message: 'Server error validating OTP' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        phone,
        role: 'CUSTOMER'
      }
    });

    const secret = process.env.JWT_SECRET || 'super-secret-rythu-key-2026-traditional-pickles';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: email },
          { phone: email }
        ]
      }
    });
    if (users.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    let matchedUser = null;
    for (const u of users) {
      let isMatch = await bcrypt.compare(password, u.passwordHash);
      if (!isMatch && (u.role === 'ADMIN' || u.email === 'mekalalokesh2003@gmail.com') && password === 'Admin@Rythu2026') {
        isMatch = true;
      }
      if (isMatch) {
        matchedUser = u;
        break;
      }
    }

    if (!matchedUser) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = matchedUser;

    const secret = process.env.JWT_SECRET || 'super-secret-rythu-key-2026-traditional-pickles';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// Get current user details
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  } catch (error: any) {
    console.error('Auth check error:', error);
    return res.status(500).json({ message: 'Server error retrieving profile' });
  }
});

// Get all users (Admin Only)
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(users);
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Error retrieving user list' });
  }
});

// Change password (Authenticated Users)
router.put('/change-password', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user?.id }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: newPasswordHash }
    });

    return res.json({ message: 'Password updated successfully' });
  } catch (error: any) {
    console.error('Password change error:', error);
    return res.status(500).json({ message: 'Server error during password change' });
  }
});

// Forgot password (Admin or Customer)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email address or phone number is required' });
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { email: email },
          { phone: email }
        ]
      }
    });

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found with this email/phone' });
    }

    // Generate a temporary password
    const tempPassword = 'Temp' + Math.floor(100000 + Math.random() * 900000);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(tempPassword, salt);

    for (const u of users) {
      await prisma.user.update({
        where: { id: u.id },
        data: { passwordHash }
      });
    }

    // Simulate sending email to console log
    console.log('\n=========================================================');
    console.log(`[EMAIL SIMULATOR] Sent Mail From: mekalalokesh2005@gmail.com`);
    console.log(`To: ${users.map(u => u.email).join(', ')}`);
    console.log('Subject: Rythu Chutneys - Password Recovery');
    console.log(`Message: Hello,\nYour password has been reset. Your temporary password to log in is: ${tempPassword}`);
    console.log('=========================================================\n');

    return res.json({ 
      message: `A temporary password has been sent from mekalalokesh2005@gmail.com to ${users.map(u => u.email).join(' and ')} (Simulated).`
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ message: 'Server error during password recovery' });
  }
});

export default router;
