import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Flame, ShoppingCart, Check } from 'lucide-react';

export interface Product {
  id: string;
  nameEn: string;
  nameTe: string;
  descriptionEn: string;
  descriptionTe: string;
  price250g: number;
  price500g: number;
  price1kg: number;
  imageUrl: string;
  spiceLevel: 'MILD' | 'MEDIUM' | 'HOT' | 'ANDHRA_HOT';
  category: 'PICKLE' | 'DRY_CHUTNEY' | 'FRESH_CHUTNEY' | 'NON_VEG' | 'ROTI';
  inStock: boolean;
  weight1?: string;
  weight2?: string;
  weight3?: string;
}

interface ProductCardProps {
  product: Product;
  onClickDetail?: () => void;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onToggleStock?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onClickDetail,
  isAdmin = false,
  onEdit,
  onDelete,
  onToggleStock
}) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '500g' | '1kg'>('250g');
  const [added, setAdded] = useState(false);

  const getPrice = () => {
    if (selectedWeight === '250g') return product.price250g;
    if (selectedWeight === '500g') return product.price500g;
    return product.price1kg;
  };

  const getSpiceBadgeClass = () => {
    switch (product.spiceLevel) {
      case 'MILD': return 'badge-mild';
      case 'MEDIUM': return 'badge-medium';
      case 'HOT': return 'badge-hot';
      case 'ANDHRA_HOT': return 'badge-andhra';
      default: return 'badge-medium';
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering card click
    
    const weightLabel = selectedWeight === '250g' 
      ? (product.weight1 || (product.category === 'ROTI' ? '1 Roti' : '250g'))
      : selectedWeight === '500g'
        ? (product.weight2 || (product.category === 'ROTI' ? '5 Rotis' : '500g'))
        : (product.weight3 || (product.category === 'ROTI' ? '10 Rotis' : '1kg'));

    addToCart({
      productId: product.id,
      nameEn: product.nameEn,
      nameTe: product.nameTe,
      weight: selectedWeight,
      weightLabel,
      price: getPrice(),
      imageUrl: product.imageUrl
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-card" onClick={onClickDetail} style={{ cursor: onClickDetail ? 'pointer' : 'default' }}>
      {/* Product Image */}
      <div style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#F0EBE0' }}>
        <img 
          src={product.imageUrl} 
          alt={product.nameEn}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onError={(e) => {
            // fallback image if custom asset doesn't load
            e.currentTarget.src = 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600';
          }}
        />
        
        {/* Category and Spice Badge */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span className={`badge ${getSpiceBadgeClass()}`} style={{ gap: '4px' }}>
            <Flame size={12} fill="currentColor" />
            {product.spiceLevel === 'ANDHRA_HOT' ? 'Andhra Hot 🔥' : product.spiceLevel}
          </span>
        </div>

        {!product.inStock && (
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.2rem'
          }}>
            {t('outOfStock')}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-dark)' }}>
          {language === 'en' ? product.nameEn : product.nameTe}
        </h3>
        <p style={{ 
          color: 'var(--text-muted)', 
          fontSize: '0.88rem', 
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flexGrow: 1
        }}>
          {language === 'en' ? product.descriptionEn : product.descriptionTe}
        </p>

        {/* Weight Selector */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
            {t('selectWeight')}
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['250g', '500g', '1kg'] as const).map((weight) => (
              <button
                key={weight}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedWeight(weight);
                }}
                disabled={!product.inStock}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedWeight === weight ? '2px solid var(--chilli-red)' : '1px solid var(--border-color)',
                  backgroundColor: selectedWeight === weight ? 'var(--chilli-red-light)' : 'var(--bg-white)',
                  color: selectedWeight === weight ? 'var(--chilli-red)' : 'var(--text-dark)',
                  transition: 'all 0.15s'
                }}
              >
                {weight === '250g' 
                  ? (product.weight1 || (product.category === 'ROTI' ? '1 Roti' : '250g'))
                  : weight === '500g'
                    ? (product.weight2 || (product.category === 'ROTI' ? '5 Rotis' : '500g'))
                    : (product.weight3 || (product.category === 'ROTI' ? '10 Rotis' : '1kg'))}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Add To Cart Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Price:</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--chilli-red)' }}>
              ₹{getPrice()}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            style={{
              padding: '10px 18px',
              borderRadius: '25px',
              border: 'none',
              fontWeight: 600,
              cursor: product.inStock && !added ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: added ? 'var(--leaf-green)' : 'var(--chilli-red)',
              color: 'white',
              transition: 'all 0.2s'
            }}
          >
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
            <span>{added ? t('addedToCart') : t('addToCart')}</span>
          </button>
        </div>

        {/* Admin actions block */}
        {isAdmin && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => onEdit?.(product)}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-cream)',
                color: 'var(--text-dark)',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => onToggleStock?.(product)}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: product.inStock ? 'var(--leaf-green-light)' : '#FFECEC',
                color: product.inStock ? 'var(--leaf-green)' : '#C62828',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              {product.inStock ? 'STOCK: IN' : 'STOCK: OUT'}
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this product?')) {
                  onDelete?.(product);
                }
              }}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: '#FFECEC',
                color: '#C62828',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🗑️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
