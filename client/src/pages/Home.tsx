import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Leaf, Flame, Sparkles, MessageSquare } from 'lucide-react';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab }) => {
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '60px' }}>
      
      {/* 1. Hero Splash Section */}
      <section style={{
        position: 'relative',
        minHeight: '80vh',
        background: 'linear-gradient(rgba(28, 25, 22, 0.6), rgba(28, 25, 22, 0.8)), url("https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=1200") no-repeat center/cover',
        display: 'flex',
        alignItems: 'center',
        color: '#FFFFFF',
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        overflow: 'hidden',
        marginTop: '-20px' // adjust for header alignment
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', padding: '40px 24px' }}>
          <span style={{ 
            color: 'var(--spice-gold)', 
            fontSize: '1rem', 
            fontWeight: 800, 
            letterSpacing: '3px', 
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} /> Authentic Traditional Heritage
          </span>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            fontFamily: 'var(--font-serif)', 
            lineHeight: 1.15 
          }}>
            {t('heroTitle')}
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#E6DFD3', lineHeight: 1.6 }}>
            {t('heroSubtitle')}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
            <button 
              className="btn btn-gold" 
              onClick={() => setCurrentTab('shop')}
              style={{ padding: '14px 36px', fontSize: '1.05rem' }}
            >
              {t('orderNow')}
            </button>
            <a 
              href="https://wa.me/c/916309574197" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary" 
              style={{ 
                padding: '14px 30px', 
                fontSize: '1.05rem', 
                color: '#FFFFFF', 
                borderColor: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              <MessageSquare size={18} />
              <span>{t('viewCatalog')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Brand Core Values (Features) */}
      <section className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--chilli-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px' }}>
            Why Choose Us
          </span>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginTop: '8px' }}>
            Traditional Perfection
          </h2>
          <div style={{ width: '80px', height: '3px', backgroundColor: 'var(--spice-gold)', margin: '16px auto 0 auto' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {/* Card 1 */}
          <div style={{ 
            background: 'var(--bg-white)', 
            padding: '40px 30px', 
            borderRadius: '16px', 
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--chilli-red-light)', color: 'var(--chilli-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flame size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-dark)' }}>{t('featAuthentic')}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('featAuthenticDesc')}</p>
          </div>

          {/* Card 2 */}
          <div style={{ 
            background: 'var(--bg-white)', 
            padding: '40px 30px', 
            borderRadius: '16px', 
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--leaf-green-light)', color: 'var(--leaf-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-dark)' }}>{t('featHygienic')}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('featHygienicDesc')}</p>
          </div>

          {/* Card 3 */}
          <div style={{ 
            background: 'var(--bg-white)', 
            padding: '40px 30px', 
            borderRadius: '16px', 
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--spice-gold-light)', color: 'var(--spice-gold-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-dark)' }}>{t('featNoPreservatives')}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{t('featNoPreservativesDesc')}</p>
          </div>
        </div>
      </section>



      {/* 4. Farmers & Heritage Philosophy Story */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
        <div>
          <span style={{ color: 'var(--chilli-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px' }}>
            {t('homeFarmStoryTag')}
          </span>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginTop: '8px', marginBottom: '24px' }}>
            {t('homeFarmStoryTitle')}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.7' }}>
            {t('homeFarmStoryP1')}
          </p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.7' }}>
            {t('homeFarmStoryP2')}
          </p>
          <button className="btn btn-primary" onClick={() => setCurrentTab('shop')}>
            {t('homeFarmStoryBtn')}
          </button>
        </div>
        <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '400px', boxShadow: 'var(--shadow-lg)' }}>
          <img 
            src="/images/gongura.jpg" 
            alt="Farm fields" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* 5. Meet Our Founder */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center', backgroundColor: 'var(--bg-cream)', padding: '50px 30px', borderRadius: '16px', border: '1px solid var(--border-color)', margin: '60px auto' }}>
        <div style={{ position: 'relative', borderRadius: '16px', boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
          <img 
            src="/images/founder.jpg" 
            alt="Mohan Reddy .R - Founder" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '20px', color: 'white' }}>
            <h3 style={{ margin: 0, fontSize: '1.4rem', fontFamily: 'var(--font-serif)' }}>Mohan Reddy.R</h3>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--spice-gold)' }}>{t('homeFounderRole')}</p>
          </div>
        </div>
        <div>
          <span style={{ color: 'var(--chilli-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px' }}>
            {t('homeFounderSectionTag')}
          </span>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginTop: '8px', marginBottom: '20px' }}>
            {t('homeFounderSectionTitle')}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.7' }}>
            {t('homeFounderBioP1')}
          </p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.7' }}>
            {t('homeFounderBioP2')}
          </p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0', lineHeight: '1.7' }}>
            {t('homeFounderQuote')}
          </p>
        </div>
      </section>

      {/* 6. Customer Testimonials */}
      <section className="container" style={{ marginBottom: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--chilli-red)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '2px' }}>
            {t('homeReviewsTag')}
          </span>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginTop: '8px' }}>
            {t('homeReviewsTitle')}
          </h2>
          <div style={{ width: '80px', height: '3px', backgroundColor: 'var(--spice-gold)', margin: '16px auto 0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          <div style={{ background: 'var(--bg-white)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ color: 'var(--spice-gold)', fontSize: '1.5rem', marginBottom: '10px' }}>★★★★★</div>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '16px' }}>
              {t('homeReview1Text')}
            </p>
            <strong style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{t('homeReview1Author')}</strong>
          </div>
          
          <div style={{ background: 'var(--bg-white)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ color: 'var(--spice-gold)', fontSize: '1.5rem', marginBottom: '10px' }}>★★★★★</div>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '16px' }}>
              {t('homeReview2Text')}
            </p>
            <strong style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{t('homeReview2Author')}</strong>
          </div>

          <div style={{ background: 'var(--bg-white)', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ color: 'var(--spice-gold)', fontSize: '1.5rem', marginBottom: '10px' }}>★★★★★</div>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.95rem', marginBottom: '16px' }}>
              {t('homeReview3Text')}
            </p>
            <strong style={{ fontSize: '0.9rem', color: 'var(--text-dark)' }}>{t('homeReview3Author')}</strong>
          </div>
        </div>
      </section>
    </div>
  );
};
