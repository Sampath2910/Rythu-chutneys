import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OrderTracker } from '../components/OrderTracker';
import type { Order } from '../components/OrderTracker';
import { API_BASE_URL } from '../context/AuthContext';
import { Search, Loader2, ClipboardList } from 'lucide-react';

interface TrackingProps {
  trackedOrderId: string;
  setTrackedOrderId: (orderId: string) => void;
}

export const Tracking: React.FC<TrackingProps> = ({ trackedOrderId, setTrackedOrderId }) => {
  const { t, language } = useLanguage();
  const [orderIdInput, setOrderIdInput] = useState(trackedOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchOrderDetails = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setErrorMsg(null);
    setOrder(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders/track/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(language === 'en' ? 'Order ID not found. Verify and try again.' : 'ఆర్డర్ ఐడీ కనుగొనబడలేదు. సరిచూసుకుని మళ్లీ ప్రయత్నించండి.');
        }
        throw new Error('Failed to load tracking data.');
      }
      const data = await response.json();
      setOrder(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trackedOrderId) {
      setOrderIdInput(trackedOrderId);
      fetchOrderDetails(trackedOrderId);
    }
  }, [trackedOrderId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    setTrackedOrderId(orderIdInput.trim());
    fetchOrderDetails(orderIdInput.trim());
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '30px 0 60px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--chilli-red)' }}>
          {t('trackingTitle')}
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Enter your unique Order ID to track preparation and delivery status in Gadwal.
        </p>
      </div>

      {/* Lookup Bar */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'var(--bg-white)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '24px',
        maxWidth: '600px',
        margin: '0 auto 40px auto',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>{t('enterOrderId')}</label>
        <div style={{ display: 'flex', gap: '10px', position: 'relative' }}>
          <input
            type="text"
            className="form-control"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
            required
            style={{ flexGrow: 1 }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ borderRadius: 'var(--radius-sm)', padding: '10px 24px' }}>
            {loading ? <Loader2 className="spin-animation" size={18} /> : <Search size={18} />}
            <span style={{ marginLeft: '4px' }} className="desktop-only">{t('trackBtn')}</span>
          </button>
        </div>
      </form>

      {/* Loading Indicator */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Loader2 size={32} className="spin-animation" style={{ color: 'var(--chilli-red)', margin: '0 auto 16px auto' }} />
          <p style={{ fontWeight: 600 }}>Retrieving status details...</p>
        </div>
      )}

      {/* Error display */}
      {errorMsg && (
        <div style={{
          backgroundColor: '#FFECEC',
          color: '#C62828',
          padding: '16px',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          border: '1px solid #EF9A9A'
        }}>
          {errorMsg}
        </div>
      )}

      {/* Order Tracker component display */}
      {order && !loading && (
        <OrderTracker order={order} />
      )}

      {/* Unsearched state illustration */}
      {!order && !loading && !errorMsg && (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
          <ClipboardList size={48} style={{ color: 'var(--border-color)', marginBottom: '16px' }} />
          <p>No order is currently loaded for tracking. Enter an ID above.</p>
        </div>
      )}

      <style>{`
        @keyframes spin { 100% { transform:rotate(360deg); } }
        .spin-animation { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};
