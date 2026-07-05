import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'te';

interface Translations {
  [key: string]: {
    en: string;
    te: string;
  };
}

const translations: Translations = {
  // Navigation
  navHome: { en: 'Home', te: 'హోమ్' },
  navShop: { en: 'Pickle Shop', te: 'పచ్చళ్ల దుకాణం' },
  navTrack: { en: 'Track Order', te: 'ఆర్డర్ ట్రాకింగ్' },
  navCart: { en: 'Cart', te: 'కార్ట్' },
  navAdmin: { en: 'Admin Panel', te: 'అడ్మిన్ ప్యానెల్' },
  login: { en: 'Login', te: 'లాగిన్' },
  logout: { en: 'Logout', te: 'లాగౌట్' },
  register: { en: 'Sign Up', te: 'రిజిస్టర్' },

  // Hero Section
  heroTitle: { en: 'Authentic Homemade Pickles', te: 'నిజమైన గృహ నిల్వ పచ్చళ్లు' },
  heroSubtitle: { en: 'Bringing you the rich, traditional homemade taste with farm-fresh ingredients, hygienic preparation, and absolutely zero preservatives.', te: 'తాజా కూరగాయలు, సాంప్రదాయ పద్ధతులు మరియు ఎటువంటి ప్రిజర్వేటివ్స్ లేకుండా తయారు చేసిన నోరూరించే స్వచ్ఛమైన సాంప్రదాయ నిల్వ పచ్చళ్లు.' },
  orderNow: { en: 'Order Now', te: 'ఇప్పుడే ఆర్డర్ చేయండి' },
  viewCatalog: { en: 'View Catalogue', te: 'క్యాటలాగ్ చూడండి' },
  whatsappOrder: { en: 'Order via WhatsApp', te: 'వాట్సాప్ ద్వారా ఆర్డర్' },

  // Features
  featAuthentic: { en: '100% Authentic', te: 'అసలైన సాంప్రదాయం' },
  featAuthenticDesc: { en: 'Prepared using traditional stone-ground techniques and Guntur chillies.', te: 'సాంప్రదాయ రోటి పద్ధతులు మరియు గుంటూరు మిరపకాయలతో తయారుచేయబడింది.' },
  featHygienic: { en: 'Hygienically Made', te: 'పరిశుభ్రమైన తయారీ' },
  featHygienicDesc: { en: 'Prepared in small batches with strict hygiene protocols and quality checks.', te: 'కఠినమైన పరిశుభ్రతా ప్రమాణాలు మరియు నాణ్యత తనిఖీలతో చిన్న బ్యాచ్‌లలో సిద్ధం చేయబడుతుంది.' },
  featNoPreservatives: { en: 'No Preservatives', te: 'ప్రిజర్వేటివ్స్ లేవు' },
  featNoPreservativesDesc: { en: 'Absolutely no chemical preservatives or artificial colors added.', te: 'ఎటువంటి రసాయన ప్రిజర్వేటివ్స్ లేదా కృత్రిమ రంగులు కలపబడలేదు.' },

  // Shop / Product details
  spiceLevel: { en: 'Spice Level', te: 'కారం స్థాయి' },
  selectWeight: { en: 'Select Quantity/Weight', te: 'పరిమాణం/బరువు ఎంచుకోండి' },
  addToCart: { en: 'Add to Cart', te: 'కార్ట్‌కి చేర్చండి' },
  addedToCart: { en: 'Added!', te: 'చేర్చబడింది!' },
  inStock: { en: 'In Stock', te: 'స్టాక్ ఉంది' },
  outOfStock: { en: 'Out of Stock', te: 'స్టాక్ లేదు' },
  allCategories: { en: 'All Items', te: 'అన్ని రకాలు' },
  categoryPickles: { en: 'Traditional Pickles', te: 'నిల్వ పచ్చళ్లు' },
  categoryNonVeg: { en: 'Non-Veg Pickles', te: 'మాంసాహార పచ్చళ్లు' },
  categoryChutneys: { en: 'Fresh Chutneys', te: 'తాజా పచ్చళ్లు' },
  categoryRotis: { en: 'Fresh Rotis (₹10/each)', te: 'తాజా చపాతీలు / రోటీలు (ఒక్కొక్కటి ₹10)' },
  filterSpice: { en: 'Filter by Spice', te: 'కారం బట్టి వడపోత' },

  // Location / Delivery Check
  deliveryCheckTitle: { en: 'Check Delivery Eligibility', te: 'డెలివరీ అర్హతను తనిఖీ చేయండి' },
  deliveryCheckSubtitle: { en: 'Free delivery within 5 km of Gadwal. We deliver up to 25 km!', te: 'గద్వాల నుండి 5 కి.మీ పరిధిలో ఉచిత డెలివరీ. 25 కి.మీ వరకు డెలివరీ సదుపాయం కలదు!' },
  checkBtn: { en: 'Check Status', te: 'స్థితిని తనిఖీ చేయి' },
  landmarkSelect: { en: 'Select a Landmark around Gadwal:', te: 'గద్వాల పరిసర ప్రాంతాన్ని ఎంచుకోండి:' },
  customLocation: { en: 'Or enter custom coordinates / distance:', te: 'లేదా మీ దూరాన్ని నమోదు చేయండి:' },
  distancePlaceholder: { en: 'Enter distance (km)', te: 'దూరం నమోదు చేయండి (కి.మీ)' },
  freeDeliveryMsg: { en: 'Eligible for FREE delivery!', te: 'ఉచిత డెలివరీకి అర్హులు!' },
  paidDeliveryMsg: { en: 'Eligible for delivery (charges apply)', te: 'డెలివరీ అందుబాటులో ఉంది (ఛార్జీలు వర్తిస్తాయి)' },
  noDeliveryMsg: { en: 'Outside delivery range', te: 'డెలివరీ పరిధి వెలుపల ఉంది' },

  // Cart / Checkout
  cartTitle: { en: 'Your Shopping Cart', te: 'మీ షాపింగ్ కార్ట్' },
  cartEmpty: { en: 'Your cart is empty. Add some spicy pickles!', te: 'మీ కార్ట్ ఖాళీగా ఉంది. కొన్ని రుచికరమైన పచ్చళ్లను జోడించండి!' },
  subtotal: { en: 'Subtotal', te: 'ఉపమొత్తం' },
  deliveryFee: { en: 'Delivery Fee', te: 'డెలివరీ రుసుము' },
  total: { en: 'Total Amount', te: 'మొత్తం ధర' },
  checkoutTitle: { en: 'Delivery & Checkout Details', te: 'డెలివరీ & చెల్లింపు వివరాలు' },
  fullName: { en: 'Full Name', te: 'పూర్తి పేరు' },
  phoneNum: { en: 'Phone Number', te: 'ఫోన్ నంబర్' },
  address: { en: 'Delivery Address', te: 'డెలివరీ చిరునామా' },
  paymentMethod: { en: 'Payment Method', te: 'చెల్లింపు విధానం' },
  cod: { en: 'Cash on Delivery (COD)', te: 'క్యాష్ ఆన్ డెలివరీ (COD)' },
  onlinePay: { en: 'Pay Online (Mock Razorpay)', te: 'ఆన్‌లైన్ పేమెంట్' },
  placeOrder: { en: 'Place Order', te: 'ఆర్డర్ చేయండి' },
  orderSuccess: { en: 'Order Placed Successfully!', te: 'ఆర్డర్ విజయవంతంగా పూర్తయింది!' },
  orderSuccessDesc: { en: 'Thank you for ordering. Keep your Order ID to track status.', te: 'ధన్యవాదాలు. మీ ఆర్డర్ ఐడీ ఉపయోగించి స్థితిని ట్రాక్ చేయండి.' },

  // Order Tracking
  trackingTitle: { en: 'Track Your Fresh Pickle Order', te: 'మీ పచ్చడి ఆర్డర్ ట్రాక్ చేయండి' },
  enterOrderId: { en: 'Enter Order ID:', te: 'ఆర్డర్ ఐడీ నమోదు చేయండి:' },
  trackBtn: { en: 'Track Now', te: 'ట్రాక్ చేయి' },
  statusPending: { en: 'Order Placed', te: 'ఆర్డర్ చేయబడింది' },
  statusPreparing: { en: 'Preparing in Traditional Kitchen', te: 'వంటగదిలో సిద్ధమౌతోంది' },
  statusPacked: { en: 'Hygienically Packed', te: 'శుభ్రంగా ప్యాక్ చేయబడింది' },
  statusShipped: { en: 'Out for Delivery', te: 'డెలివరీకి బయలుదేరింది' },
  statusDelivered: { en: 'Delivered', te: 'డెలివరీ చేయబడింది' },
  statusCancelled: { en: 'Cancelled', te: 'రద్దు చేయబడింది' },
  orderDate: { en: 'Order Date', te: 'ఆర్డర్ తేదీ' },

  // Admin Dashboard
  adminTitle: { en: 'Rythu Chutneys Admin Dashboard', te: 'అడ్మిన్ డ్యాష్‌బోర్డ్' },
  adminStats: { en: 'Sales Overview', te: 'సేల్స్ విశ్లేషణ' },
  totalSales: { en: 'Total Revenue', te: 'మొత్తం ఆదాయం' },
  totalOrders: { en: 'Total Orders', te: 'మొత్తం ఆర్డర్లు' },
  activeOrders: { en: 'Active Deliveries', te: 'ప్రస్తుత ఆర్డర్లు' },
  manageProducts: { en: 'Manage Catalog', te: 'ఉత్పత్తుల నిర్వహణ' },
  manageOrders: { en: 'Manage Orders', te: 'ఆర్డర్ల నిర్వహణ' },

  // Home Page story, founder, and reviews
  homeFarmStoryTag: { en: 'From Fields to Plates', te: 'పొలాల నుండి ప్లేట్ల వరకు' },
  homeFarmStoryTitle: { en: 'Our Pure Agri-Root Story', te: 'మా స్వచ్ఛమైన వ్యవసాయ-మూల కథ' },
  homeFarmStoryP1: { en: 'Rythu Chutneys supports local farming. Our raw mangoes, gongura leaves, tomatoes, and chillies are sourced directly from traditional agricultural cooperative farms in Gadwal and nearby regions.', te: 'రైతు చట్నీస్ స్థానిక వ్యవసాయానికి మద్దతు ఇస్తుంది. మా మామిడికాయలు, గోంగూర ఆకులు, టమాటాలు మరియు మిరపకాయలు నేరుగా గద్వాల మరియు పరిసర ప్రాంతాల వ్యవసాయ సహకార సంఘాల నుండి సేకరిస్తాము.' },
  homeFarmStoryP2: { en: 'Each batch is stone-ground and hand-pressed in clean conditions to ensure you receive a premium product that evokes childhood memories of pickles handmade by grandmothers (Ammamma).', te: 'ప్రతి పచ్చడి రోటి పద్ధతిలో రుబ్బబడి, పరిశుభ్రమైన వాతావరణంలో తయారు చేయబడుతుంది. దీనివల్ల మీకు అమ్మమ్మ చేసిన పచ్చళ్ల నాణ్యత మరియు చిన్ననాటి జ్ఞాపకాలు లభిస్తాయి.' },
  homeFarmStoryBtn: { en: 'Explore Our Selection', te: 'మా పచ్చళ్లను అన్వేషించండి' },
  homeFounderSectionTag: { en: 'Our Heritage', te: 'మన వారసత్వం' },
  homeFounderSectionTitle: { en: 'Visionary Behind the Flavors', te: 'రుచుల వెనుక ఉన్న దార్శనికత' },
  homeFounderBioP1: { en: 'Rythu Chutneys was established in 2011 by our founder, Mohan Reddy .R, with a clear vision to preserve the rich pickle-making traditions of Telangana. Established 15 years ago, our kitchen has remained dedicated to serving customers authentic, premium tastes with a focus on absolute purity.', te: 'రైతు చట్నీస్ 2011 లో మా వ్యవస్థాపకుడు మోహన్ రెడ్డి .ఆర్ గారి ద్వారా తెలంగాణ సాంప్రదాయ పచ్చళ్ల రుచులను కాపాడాలనే స్పష్టమైన లక్ష్యంతో స్థాపించబడింది. 15 సంవత్సరాల క్రితం ప్రారంభమైన మా వంటశాల,  వినియోగదారులకు నాణ్యత మరియు స్వచ్ఛతను అందించడంలో అంకితభావంతో ఉంది.' },
  homeFounderBioP2: { en: 'Over the past 15 years of service, Mohan Reddy R has personally overseen the sourcing of raw ingredients from local Gadwal cooperative farmers and closely monitored the entire selection process to ensure only the finest produce is picked. He has also carefully refined and perfected our traditional recipes, enhancing their flavors to make them richer, more authentic, and more appealing to local households, while preserving the original taste and cultural essence.', te: 'గత 15 సంవత్సరాల సేవలో, మోహన్ రెడ్డి ఆర్ గారు వ్యక్తిగతంగా గద్వాల సహకార రైతుల నుండి ముడి పదార్థాల సేకరణను పర్యవేక్షించారు మరియు కేవలం ఉత్తమమైన పంటను మాత్రమే ఎంపిక చేసేలా మొత్తం ప్రక్రియను నిశితంగా పరిశీలించారు. ఆయన మా సాంప్రదాయ వంటకాలను జాగ్రత్తగా సవరించి సంపూర్ణంగా తీర్చిదిద్దారు, అసలు రుచి మరియు సాంప్రదాయాన్ని కోల్పోకుండా, స్థానిక కుటుంబాలకు మరింత నచ్చేలా వీటిని మరింత ఘుమఘుమలాడేలా తయారుచేశారు.' },
  homeFounderQuote: { en: '"We believe that a pickle isn\'t just a side dish; it\'s a nostalgic connection to our land and families. Our commitment to zero chemical preservatives means you taste only pure farm freshness in every spoonful."', te: '"పచ్చడి అనేది కేవలం ఆహారం కాదు; అది మన నేల మరియు కుటుంబాలతో ముడిపడి ఉన్న జ్ఞాపకం. ఎటువంటి రసాయన ప్రిజర్వేటివ్స్ ఉపయోగించకపోవడం వల్ల మీకు ప్రతి స్పూన్‌లో స్వచ్ఛమైన పొలాల తాజా రుచి లభిస్తుంది."' },
  homeFounderRole: { en: 'Founder', te: 'వ్యవస్థాపకుడు' },
  homeReviewsTag: { en: 'Reviews', te: 'సమీక్షలు' },
  homeReviewsTitle: { en: 'Loved by Pickle Enthusiasts', te: 'పచ్చడి ప్రేమికుల ఆదరణ' },
  homeReview1Text: { en: '"The Premium Avakaya Mango Pickle tastes exactly like my grandmother\'s recipe in Kurnool. The spice kick of Guntur red chilli is authentic and mouth-watering!"', te: '"ప్రీమియం ఆవకాయ మామిడి పచ్చడి మా అమ్మమ్మ చేసిన రుచితో సరిగ్గా సరిపోలింది. గుంటూరు మిరపకాయల ఘాటు చాలా అద్భుతంగా మరియు నోరూరించేలా ఉంది!"' },
  homeReview1Author: { en: '— Lokesh.M, Ieeja', te: '— లోకేష్.ఎమ్, ఐజ' },
  homeReview2Text: { en: '"Exceptional taste and highly hygienic packing. Deliveries inside Gadwal town are extremely fast, and the free delivery under 5 km makes ordering pickles super convenient!"', te: '"అసాధారణమైన రుచి మరియు పరిశుభ్రమైన ప్యాకింగ్. గద్వాల పట్టణంలో డెలివరీ చాలా వేగంగా ఉంది, మరియు 5 కి.మీ పరిధిలో ఉచిత డెలివరీ మాకు చాలా సౌకర్యవంతంగా ఉంది!"' },
  homeReview2Author: { en: '— Rajesh.p, Wanaparthy', te: '— రాజేష్.పి, వనపర్తి' } ,
  homeReview3Text: { en: '"We regularly order the Allam Ginger Pickle and Gongura Pickle. Absolutely no preservatives and a very premium quality. Highly recommended brand!"', te: '"మేము క్రమం తప్పకుండా అల్లం మరియు గోంగూర పచ్చళ్లను ఆర్డర్ చేస్తుంటాము. రసాయనాలు ఏవీ వాడరు మరియు నాణ్యత చాలా బాగుంటుంది. తప్పకుండా వాడదగిన బ్రాండ్!"' },
  homeReview3Author: { en: '— Srinivas, Maldakal Road', te: '— శ్రీనివాస్, మల్దకల్ రోడ్డు' },

  // Footer translations
  footerBrandDesc: { en: 'We bring you the rich, traditional taste of Andhra with a wide range of homemade chutneys and pickles. Prepared with farm-fresh ingredients, hygienic standards, love, and absolutely no chemical preservatives.', te: 'స్వచ్ఛమైన మరియు పరిశుభ్రమైన పద్ధతుల్లో, గృహ వాతావరణంలో ఎటువంటి రసాయన ప్రిజర్వేటివ్స్ లేకుండా తయారు చేసిన నోరూరించే ఆంధ్ర నిల్వ పచ్చళ్లు మరియు తాజా చట్నీలు.' },
  footerAuthenticTag: { en: 'Authentic', te: 'అసలైన రుచి' },
  footerHygienicTag: { en: 'Hygienic', te: 'పరిశుభ్రమైనది' },
  footerContactTitle: { en: 'Place Order & Support', te: 'ఆర్డర్ మరియు మద్దతు' },
  footerAddr: { en: 'Gadwal Town, Telangana, India', te: 'గద్వాల పట్టణం, తెలంగాణ, భారతదేశం' },
  footerHours: { en: 'Shop Timings: 9 AM - 8 PM', te: 'షాప్ సమయాలు: ఉదయం 9 నుండి రాత్రి 8 వరకు' },
  footerDeliveryTitle: { en: 'Delivery Radius', te: 'డెలివరీ పరిధి' },
  footerFreeDeliveryDesc: { en: 'Free Delivery: All locations within a 5 km radius of Gadwal Fort.', te: 'ఉచిత డెలివరీ: గద్వాల కోట నుండి 5 కి.మీ పరిధిలో ఉన్న అన్ని ప్రాంతాలకు ఉచితం.' },
  footerExtendedDeliveryDesc: { en: 'Extended Delivery: Up to 25 km of Gadwal (nominal delivery charge of ₹10 for every 2 km beyond 5 km applies).', te: 'విస్తరించిన డెలివరీ: గద్వాల నుండి 25 కి.మీ వరకు (5 కి.మీ దాటిన ప్రతి 2 కి.మీకి ₹10 చొప్పున డెలివరీ ఛార్జీ వర్తిస్తుంది).' },
  footerNoteDesc: { en: '* Note: Fresh batches are prepared daily. Standard delivery time is 1-3 hours in Gadwal town.', te: '* గమనిక: ప్రతిరోజూ కొత్త బ్యాచ్‌లు సిద్ధం చేయబడతాయి. గద్వాల పట్టణంలో డెలివరీ సమయం 1-3 గంటలు.' },
  footerRights: { en: 'All rights reserved.', te: 'సర్వ హక్కులు ప్రత్యేకించబడినవి.' },
  footerMadeWith: { en: 'Made with ❤️ in Gadwal, Telangana', te: 'గద్వాల, తెలంగాణలో  ❤️ తో తయారు చేయబడింది' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('rythu_lang');
    return (saved === 'te' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rythu_lang', lang);
  };

  const t = (key: string): string => {
    if (!translations[key]) return key;
    return translations[key][language] || translations[key]['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
