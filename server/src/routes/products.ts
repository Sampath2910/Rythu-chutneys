import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAdmin } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, spiceLevel, search } = req.query;

    const filters: any = {};

    if (category) {
      filters.category = String(category);
    }
    if (spiceLevel) {
      filters.spiceLevel = String(spiceLevel);
    }
    if (search) {
      filters.OR = [
        { nameEn: { contains: String(search) } },
        { nameTe: { contains: String(search) } },
        { descriptionEn: { contains: String(search) } },
        { descriptionTe: { contains: String(search) } }
      ];
    }

    const products = await prisma.product.findMany({
      where: filters,
      orderBy: { createdAt: 'desc' }
    });

    return res.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error retrieving products list' });
  }
});

// Get a single product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (error: any) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Error retrieving product details' });
  }
});

// Create product (Admin Only)
router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      nameEn,
      nameTe,
      descriptionEn,
      descriptionTe,
      price250g,
      price500g,
      price1kg,
      imageUrl,
      spiceLevel,
      category,
      inStock,
      weight1,
      weight2,
      weight3
    } = req.body;

    if (!nameEn || !nameTe || !price250g || !price500g || !price1kg) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const customId = nameEn.toLowerCase().replace(/\s+/g, '-');

    const product = await prisma.product.create({
      data: {
        id: customId,
        nameEn,
        nameTe,
        descriptionEn: descriptionEn || '',
        descriptionTe: descriptionTe || '',
        price250g: parseFloat(price250g),
        price500g: parseFloat(price500g),
        price1kg: parseFloat(price1kg),
        imageUrl: imageUrl || '/images/default.jpg',
        spiceLevel: spiceLevel || 'MEDIUM',
        category: category || 'PICKLE',
        inStock: inStock !== undefined ? !!inStock : true,
        weight1: weight1 || undefined,
        weight2: weight2 || undefined,
        weight3: weight3 || undefined
      }
    });

    return res.status(201).json(product);
  } catch (error: any) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Error adding new product', error: error.message });
  }
});

// Update product (Admin Only)
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Convert numeric fields if present
    if (updateData.price250g !== undefined) updateData.price250g = parseFloat(updateData.price250g);
    if (updateData.price500g !== undefined) updateData.price500g = parseFloat(updateData.price500g);
    if (updateData.price1kg !== undefined) updateData.price1kg = parseFloat(updateData.price1kg);
    if (updateData.inStock !== undefined) updateData.inStock = !!updateData.inStock;

    const product = await prisma.product.update({
      where: { id },
      data: updateData
    });

    return res.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return res.status(500).json({ message: 'Error updating product info', error: error.message });
  }
});

// Delete product (Admin Only)
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id }
    });

    return res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Error deleting product' });
  }
});

export default router;
