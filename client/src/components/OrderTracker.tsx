import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, ChefHat, Package, Truck, Calendar, Phone, MapPin } from 'lucide-react';

interface OrderItem {
  id: string;
  weight: string;
  quantity: number;
  price: number;
  product?: {
    nameEn: string;
    nameTe: string;
    imageUrl: string;
  } | null;
}

export interface Order {
  id: string;
  status: 'PENDING' | 'PREPARING' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  paymentMethod: string;
  address: string;
  phone: string;
  deliveryDistance: number;
  deliveryFee: number;
  createdAt: string;
  items: OrderItem[];
  deliveryDate?: string | null;
  deliveryTimeSlot?: string | null;
}

interface OrderTrackerProps {
  order: Order;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  const { language, t } = useLanguage();

  const stages = [
    { key: 'PENDING', labelEn: 'Order Placed', labelTe: 'ఆర్డర్ చేయబడింది', descEn: 'We have received your order.', descTe: 'మీ ఆర్డర్ మాకు చేరింది.', icon: Calendar },
    { key: 'PREPARING', labelEn: 'Preparing in Traditional Kitchen', labelTe: 'వంటగదిలో సిద్ధమౌతోంది', descEn: 'Prepared hygienically with farm fresh ingredients.', descTe: 'తాజా దినుసులతో శుభ్రంగా సిద్ధం చేయబడుతోంది.', icon: ChefHat },
    { key: 'PACKED', labelEn: 'Hygienically Packed', labelTe: 'ప్యాక్ చేయబడింది', descEn: 'Carefully sealed in sterilized jars.', descTe: 'సురక్షితమైన జార్లలో ప్యాక్ చేయబడింది.', icon: Package },
    { key: 'SHIPPED', labelEn: 'Out for Delivery', labelTe: 'డెలివరీకి బయలుదేరింది', descEn: 'Rider is on the way from Gadwal center.', descTe: 'డెలివరీ రైడర్ బయలుదేరారు.', icon: Truck },
    { key: 'DELIVERED', labelEn: 'Delivered', labelTe: 'డెలివరీ చేయబడింది', descEn: 'Enjoy the authentic Andhra taste!', descTe: 'కమ్మని పచ్చడి రుచిని ఆస్వాదించండి!', icon: CheckCircle }
  ];

  const getStatusIndex = (status: string) => {
    if (status === 'CANCELLED') return -1;
    return stages.findIndex(stage => stage.key === status);
  };

  const currentStageIndex = getStatusIndex(order.status);

  return (
    <div style={{
      backgroundColor: 'var(--bg-white)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '30px',
      boxShadow: 'var(--shadow-md)',
      width: '100%',
      maxWidth: '800px',
      margin: '0 auto',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      {/* Header Info */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '20px',
        marginBottom: '24px',
        gap: '12px'
      }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Order ID:
          </span>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--chilli-red)', wordBreak: 'break-all' }}>
            {order.id}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {t('orderDate')}:
          </span>
          <div style={{ fontWeight: 600 }}>
            {new Date(order.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'te-IN', {
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}
          </div>
        </div>
      </div>

      {/* Cancelled State */}
      {order.status === 'CANCELLED' ? (
        <div style={{
          backgroundColor: '#FFECEC',
          color: '#C62828',
          padding: '16px',
          borderRadius: 'var(--radius-sm)',
          textAlign: 'center',
          fontWeight: 700,
          marginBottom: '24px'
        }}>
          {t('statusCancelled')}
        </div>
      ) : (
        /* Vertical Stepper Timeline */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative', paddingLeft: '16px', marginBottom: '32px' }}>
          {/* Connecting Line */}
          <div style={{
            position: 'absolute',
            left: '35px',
            top: '20px',
            bottom: '20px',
            width: '3px',
            backgroundColor: 'var(--border-color)',
            zIndex: 1
          }} />

          {/* Active Progress Line */}
          {currentStageIndex >= 0 && (
            <div style={{
              position: 'absolute',
              left: '35px',
              top: '20px',
              height: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
              width: '3px',
              backgroundColor: 'var(--leaf-green)',
              zIndex: 2,
              transition: 'height 0.8s ease-in-out'
            }} />
          )}

          {/* Steps */}
          {stages.map((stage, index) => {
            const IconComponent = stage.icon;
            const isCompleted = index < currentStageIndex;
            const isActive = index === currentStageIndex;

            let stepColor = 'var(--text-muted)';
            let bgColor = 'var(--bg-cream)';
            let borderStyle = '1px solid var(--border-color)';

            if (isCompleted) {
              stepColor = 'var(--leaf-green)';
              bgColor = '#EBF7EC';
              borderStyle = '2px solid var(--leaf-green)';
            } else if (isActive) {
              stepColor = 'var(--chilli-red)';
              bgColor = 'var(--chilli-red-light)';
              borderStyle = '2px solid var(--chilli-red)';
            }

            return (
              <div key={stage.key} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', zIndex: 3 }}>
                {/* Step Circle */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: bgColor,
                  color: stepColor,
                  border: borderStyle,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: isActive ? '0 0 10px rgba(139, 0, 0, 0.3)' : 'none'
                }}>
                  <IconComponent size={20} />
                </div>

                {/* Step Content */}
                <div>
                  <h4 style={{ 
                    fontSize: '1.05rem', 
                    fontWeight: 600, 
                    color: isActive ? 'var(--chilli-red)' : isCompleted ? 'var(--leaf-green)' : 'var(--text-dark)' 
                  }}>
                    {language === 'en' ? stage.labelEn : stage.labelTe}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {language === 'en' ? stage.descEn : stage.descTe}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Order Details & Summary */}
      <div style={{
        backgroundColor: 'var(--bg-cream)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        border: '1px solid var(--border-color)'
      }}>
        <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginBottom: '16px', fontSize: '1.2rem' }}>
          Summary of Items
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {order.items.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 600 }}>
                  {item.product ? (language === 'en' ? item.product.nameEn : item.product.nameTe) : 'Homemade Pickle'}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                  ({item.weight}) x {item.quantity}
                </span>
              </div>
              <div style={{ fontWeight: 600 }}>
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Rows */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span>Subtotal</span>
            <span>₹{order.totalAmount - order.deliveryFee}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <span>Delivery Fee ({order.deliveryDistance} km)</span>
            <span>{order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: 'var(--chilli-red)', paddingTop: '8px' }}>
            <span>Total Paid ({order.paymentMethod})</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Delivery Destination */}
        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '20px', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
            <MapPin size={16} style={{ color: 'var(--chilli-red)' }} />
            <span><strong>Address:</strong> {order.address}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
            <Phone size={16} style={{ color: 'var(--spice-gold-hover)' }} />
            <span><strong>Contact:</strong> {order.phone}</span>
          </div>
          {order.deliveryDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
              <Calendar size={16} style={{ color: 'var(--chilli-red)' }} />
              <span><strong>Scheduled Delivery:</strong> {order.deliveryDate} ({order.deliveryTimeSlot || 'Anytime'})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
