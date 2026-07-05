import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../context/AuthContext';
import { CheckCircle, AlertTriangle, Truck } from 'lucide-react';

interface Landmark {
  name: string;
  lat: number;
  lon: number;
  distanceSim: number;
}

export const LocationChecker: React.FC = () => {
  const { language, t } = useLanguage();
  const { deliveryDetails, setDeliveryDetails } = useCart();

  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [selectedLandmark, setSelectedLandmark] = useState<string>('');
  const [customDistance, setCustomDistance] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [checking, setChecking] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'warn' | 'error', text: string } | null>(null);

  // Load preset landmarks on load
  useEffect(() => {
    const fetchLandmarks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/delivery/landmarks`);
        if (response.ok) {
          const data = await response.json();
          setLandmarks(data);
        }
      } catch (error) {
        console.error('Error fetching landmarks:', error);
      }
    };
    fetchLandmarks();
  }, []);

  // When deliveryDetails exist, sync address state
  useEffect(() => {
    if (deliveryDetails) {
      setAddress(deliveryDetails.address);
    }
  }, [deliveryDetails]);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      setStatusMsg({
        type: 'error',
        text: language === 'en' ? 'Please specify your delivery address first.' : 'దయచేసి మీ డెలివరీ చిరునామాను నమోదు చేయండి.'
      });
      return;
    }

    setChecking(true);
    setStatusMsg(null);

    let lat = 16.2268; // Gadwal Fort center default
    let lon = 77.8080;

    // A. Check if landmark is selected
    if (selectedLandmark) {
      const landmark = landmarks.find(l => l.name === selectedLandmark);
      if (landmark) {
        lat = landmark.lat;
        lon = landmark.lon;
      }
    } 
    // B. Check if custom distance is supplied, we will simulate coords by walking away
    else if (customDistance) {
      const distanceVal = parseFloat(customDistance);
      if (!isNaN(distanceVal)) {
        // Approximate coordinates change for simulation: 1 km ~ 0.009 degrees
        lat = 16.2268 + (distanceVal * 0.009) / Math.sqrt(2);
        lon = 77.8080 + (distanceVal * 0.009) / Math.sqrt(2);
      }
    } else {
      // Default: within Gadwal town center (0.5 km)
      lat = 16.2268 + 0.003;
      lon = 77.8080 + 0.003;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/delivery/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude: lat, longitude: lon, address })
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const result = await response.json();

      setDeliveryDetails({
        distance: result.distance,
        fee: result.deliveryFee,
        address,
        phone: '', // to be filled at checkout
        latitude: lat,
        longitude: lon,
        eligible: result.eligibleForDelivery
      });

      if (!result.eligibleForDelivery) {
        setStatusMsg({
          type: 'error',
          text: language === 'en' ? result.messageEn : result.messageTe
        });
      } else if (result.deliveryFee === 0) {
        setStatusMsg({
          type: 'success',
          text: language === 'en' ? result.messageEn : result.messageTe
        });
      } else {
        setStatusMsg({
          type: 'warn',
          text: language === 'en' ? result.messageEn : result.messageTe
        });
      }

    } catch (error) {
      setStatusMsg({
        type: 'error',
        text: language === 'en' ? 'Unable to connect to delivery checker API.' : 'డెలివరీ తనిఖీ కనెక్షన్ విఫలమైంది.'
      });
    } finally {
      setChecking(false);
    }
  };

  const handleLandmarkSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedLandmark(val);
    if (val) {
      setCustomDistance('');
      const landmark = landmarks.find(l => l.name === val);
      if (landmark) {
        setAddress(prev => prev ? prev : landmark.name + ", Gadwal");
      }
    }
  };

  return (
    <div style={{
      backgroundColor: 'var(--bg-white)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      padding: '30px',
      boxShadow: 'var(--shadow-md)',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <Truck size={36} style={{ color: 'var(--chilli-red)' }} />
        <div>
          <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--chilli-red)' }}>
            {t('deliveryCheckTitle')}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {t('deliveryCheckSubtitle')}
          </p>
        </div>
      </div>

      <form onSubmit={handleCheck} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Address Input */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t('address')}</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={language === 'en' ? "E.g., Fort Road, Opp. Temple, Gadwal" : "ఉదాహరణ: కోట రోడ్డు, గుడి దగ్గర, గద్వాల"}
            required
            style={{ width: '100%' }}
          />
        </div>

        {/* Landmark Dropdown Selector */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t('landmarkSelect')}</label>
          <select
            className="form-control"
            value={selectedLandmark}
            onChange={handleLandmarkSelect}
            style={{ width: '100%', cursor: 'pointer' }}
          >
            <option value="">-- Choose local testing location --</option>
            {landmarks.map((l) => (
              <option key={l.name} value={l.name}>
                {l.name} ({l.distanceSim} km from Gadwal Fort)
              </option>
            ))}
          </select>
        </div>

        {/* Custom Distance simulation input */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t('customLocation')}</label>
          <input
            type="number"
            className="form-control"
            value={customDistance}
            onChange={(e) => {
              setCustomDistance(e.target.value);
              setSelectedLandmark('');
            }}
            placeholder={t('distancePlaceholder')}
            min="0"
            max="100"
            step="0.1"
          />
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="btn btn-primary"
          disabled={checking}
          style={{ padding: '14px', borderRadius: 'var(--radius-sm)', width: '100%', fontSize: '1rem' }}
        >
          {checking ? 'Checking...' : t('checkBtn')}
        </button>
      </form>

      {/* Result Indicator Badge */}
      {statusMsg && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          backgroundColor: statusMsg.type === 'success' ? '#EBF7EC' : statusMsg.type === 'warn' ? '#FFF9E6' : '#FFECEC',
          color: statusMsg.type === 'success' ? '#2E7D32' : statusMsg.type === 'warn' ? '#B78103' : '#C62828',
          border: `1px solid ${statusMsg.type === 'success' ? '#A5D6A7' : statusMsg.type === 'warn' ? '#FFE082' : '#EF9A9A'}`,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {statusMsg.type === 'success' ? (
            <CheckCircle size={22} style={{ flexShrink: 0 }} />
          ) : (
            <AlertTriangle size={22} style={{ flexShrink: 0 }} />
          )}
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '2px' }}>
              {statusMsg.type === 'success' ? t('freeDeliveryMsg') : statusMsg.type === 'warn' ? t('paidDeliveryMsg') : t('noDeliveryMsg')}
            </div>
            <div style={{ fontSize: '0.85rem' }}>{statusMsg.text}</div>
          </div>
        </div>
      )}
    </div>
  );
};
