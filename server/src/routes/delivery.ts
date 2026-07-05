import { Router } from 'express';

const router = Router();

// Center of Gadwal (Gadwal Fort area)
const GADWAL_CENTER = { lat: 16.2268, lon: 77.8080 };

// Popular landmarks around Gadwal for interactive UI testing
const GADWAL_LANDMARKS = [
  { name: "Gadwal Fort (Town Center)", lat: 16.2268, lon: 77.8080, distanceSim: 0 },
  { name: "Gadwal Railway Station", lat: 16.2255, lon: 77.8001, distanceSim: 1.2 },
  { name: "Gadwal RTC Bus Stand", lat: 16.2212, lon: 77.8035, distanceSim: 0.9 },
  { name: "Dharur Road Junction", lat: 16.2415, lon: 77.7850, distanceSim: 3.5 },
  { name: "Beechupally Krishna Temple (NH-44)", lat: 16.2690, lon: 77.9250, distanceSim: 14.5 },
  { name: "Maldakal Temple Town", lat: 16.1420, lon: 77.6740, distanceSim: 18.2 },
  { name: "Kurnool Gate (Outer Circle)", lat: 16.2085, lon: 77.8180, distanceSim: 2.3 }
];

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return parseFloat(distance.toFixed(2));
}

// Check delivery feasibility and fee
router.post('/check', (req, res) => {
  const { latitude, longitude, address } = req.body;

  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ message: 'Latitude and Longitude coordinates are required' });
  }

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({ message: 'Invalid coordinates' });
  }

  const distance = haversineDistance(GADWAL_CENTER.lat, GADWAL_CENTER.lon, lat, lon);
  
  let eligibleForDelivery = true;
  let deliveryFee = 0;
  let messageEn = "";
  let messageTe = "";

  if (distance <= 5.0) {
    eligibleForDelivery = true;
    deliveryFee = 0;
    messageEn = `Congratulations! You are within ${distance} km of Gadwal. Free delivery applied!`;
    messageTe = `అభినందనలు! మీరు గద్వాల నుండి ${distance} కి.మీ పరిధిలో ఉన్నారు. ఉచిత డెలివరీ వర్తిస్తుంది!`;
  } else if (distance <= 25.0) {
    eligibleForDelivery = true;
    // Charge 10 rupees for every 2 km above 5 km
    deliveryFee = Math.ceil((distance - 5.0) / 2.0) * 10; 
    messageEn = `You are ${distance} km from Gadwal. Delivery is available with a fee of ₹${deliveryFee}.`;
    messageTe = `మీరు గద్వాల నుండి ${distance} కి.మీ దూరంలో ఉన్నారు. ₹${deliveryFee} డెలివరీ ఛార్జీతో డెలివరీ అందుబాటులో ఉంది.`;
  } else {
    eligibleForDelivery = false;
    deliveryFee = 0;
    messageEn = `Sorry, you are ${distance} km from Gadwal, which is outside our current 25 km delivery radius.`;
    messageTe = `క్షమించండి, మీరు గద్వాల నుండి ${distance} కి.మీ దూరంలో ఉన్నారు. ఇది మా డెలివరీ పరిధి దాటి ఉంది.`;
  }

  return res.json({
    distance,
    eligibleForDelivery,
    deliveryFee,
    messageEn,
    messageTe,
    gadwalCenter: GADWAL_CENTER
  });
});

// Get predefined landmarks for easy manual coordinate picking in the UI
router.get('/landmarks', (req, res) => {
  res.json(GADWAL_LANDMARKS);
});

export default router;
