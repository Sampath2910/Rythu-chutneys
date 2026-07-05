import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Phone, MapPin, MessageSquare, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer style={{
      backgroundColor: 'var(--bg-dark)',
      color: '#FFFFFF',
      padding: '60px 0 30px 0',
      borderTop: '3px solid var(--spice-gold)',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Philosophy */}
          <div>
            <h3 style={{ 
              fontFamily: 'var(--font-serif)', 
              color: 'var(--spice-gold)', 
              fontSize: '1.6rem',
              marginBottom: '16px' 
            }}>
              🌾 Rythu Chutneys
            </h3>
            <p style={{ color: '#B3AAA0', fontSize: '0.95rem', marginBottom: '20px' }}>
              {t('footerBrandDesc')}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ 
                fontSize: '0.75rem', 
                background: 'rgba(212, 175, 55, 0.1)', 
                color: 'var(--spice-gold)', 
                padding: '4px 10px', 
                borderRadius: '4px',
                border: '1px solid var(--spice-gold)'
              }}>
                🥭 {t('footerAuthenticTag')}
              </span>
              <span style={{ 
                fontSize: '0.75rem', 
                background: 'rgba(30, 70, 32, 0.2)', 
                color: '#81C784', 
                padding: '4px 10px', 
                borderRadius: '4px',
                border: '1px solid #2E7D32'
              }}>
                🌿 {t('footerHygienicTag')}
              </span>
            </div>
          </div>

          {/* Quick Contact & WhatsApp */}
          <div>
            <h4 style={{ 
              color: '#FFFFFF', 
              fontSize: '1.2rem', 
              marginBottom: '16px',
              fontFamily: 'var(--font-serif)'
            }}>
              {t('footerContactTitle')}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#B3AAA0' }}>
                <Phone size={18} style={{ color: 'var(--spice-gold)' }} />
                <span>+91 63095 74197</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#B3AAA0' }}>
                <MapPin size={18} style={{ color: 'var(--chilli-red)' }} />
                <span>
                  {t('footerAddr')} <br />
                  <a 
                    href="https://maps.app.goo.gl/fAUsfM1cqHL2mfGGA?g_st=aw" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: 'var(--spice-gold)', fontSize: '0.85rem', textDecoration: 'underline', wordBreak: 'break-all' }}
                  >
                    https://maps.app.goo.gl/fAUsfM1cqHL2mfGGA?g_st=aw
                  </a>
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#B3AAA0' }}>
                <Clock size={18} style={{ color: 'var(--spice-gold)' }} />
                 <span>{t('footerHours')}</span>
              </li>
            </ul>
            
            <a 
              href="https://wa.me/c/916309574197" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                padding: '10px 18px',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginTop: '16px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <MessageSquare size={18} />
              <span>{t('whatsappOrder')}</span>
            </a>
          </div>

          {/* Location Delivery Service */}
          <div>
            <h4 style={{ 
              color: '#FFFFFF', 
              fontSize: '1.2rem', 
              marginBottom: '16px',
              fontFamily: 'var(--font-serif)'
            }}>
              {t('footerDeliveryTitle')}
            </h4>
            <p style={{ color: '#B3AAA0', fontSize: '0.95rem', marginBottom: '12px' }}>
              📍 {t('footerFreeDeliveryDesc')}
            </p>
            <p style={{ color: '#B3AAA0', fontSize: '0.95rem', marginBottom: '16px' }}>
              📍 {t('footerExtendedDeliveryDesc')}
            </p>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '12px',
              borderRadius: '8px',
              borderLeft: '4px solid var(--chilli-red)',
              fontSize: '0.85rem',
              color: '#B3AAA0'
            }}>
              {t('footerNoteDesc')}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #2B2621', margin: '30px 0' }} />

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          color: '#6E655C',
          fontSize: '0.85rem'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Rythu Chutneys. {t('footerRights')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>{t('footerMadeWith')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
