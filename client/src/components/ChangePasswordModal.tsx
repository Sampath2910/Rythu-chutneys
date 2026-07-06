import React, { useState } from 'react';
import { useAuth, API_BASE_URL } from '../context/AuthContext';
import { X, Lock, Loader2 } from 'lucide-react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setErrorMsg('New passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
      }

      setSuccessMsg('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        onClose();
        setSuccessMsg(null);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(5px)',
      padding: '20px'
    }} className="animate-fade-in" onClick={onClose}>
      
      <div style={{
        backgroundColor: 'var(--bg-white)',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        maxWidth: '450px',
        width: '100%',
        padding: '30px',
        position: 'relative',
        boxShadow: 'var(--shadow-lg)'
      }} onClick={(e) => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            padding: 0
          }}
        >
          <X size={20} />
        </button>

        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.6rem',
          color: 'var(--chilli-red)',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Change Password
        </h3>

        {errorMsg && (
          <div style={{
            backgroundColor: '#FFECEC',
            color: '#C62828',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '20px',
            border: '1px solid #EF9A9A'
          }}>
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{
            backgroundColor: '#EBF7EC',
            color: '#2E7D32',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '20px',
            border: '1px solid #A5D6A7',
            textAlign: 'center'
          }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Current Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                style={{ paddingLeft: '40px', width: '100%' }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{ paddingLeft: '40px', width: '100%' }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Confirm New Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ paddingLeft: '40px', width: '100%' }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
            style={{ padding: '12px', borderRadius: '25px', width: '100%', fontSize: '0.95rem', marginTop: '10px' }}
          >
            {submitting ? <Loader2 className="spin-animation" size={18} /> : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};
