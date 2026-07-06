import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Default Admin User
  const adminEmail = 'mekalalokesh2003@gmail.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail }
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@Rythu2026', salt);

    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'lokesh',
        passwordHash,
        phone: '7207324983',
        role: 'ADMIN'
      }
    });
    console.log('Admin user seeded successfully!');
  } else {
    console.log('Admin user already exists.');
  }

  // 2. Create Default Products (Veg, Non-Veg, and Dry Pickles/Chutneys)
  const products = [
    // --- VEG PICKLES ---
    {
      nameEn: "Premium Avakaya Mango Pickle",
      nameTe: "ప్రీమియం ఆవకాయ మామిడికాయ పచ్చడి",
      descriptionEn: "Traditional Andhra style raw mango pickle made with Guntur red chilli powder, cold-pressed mustard oil, and premium spices. Prepared in small batches with love, hygienic standards, and zero preservatives.",
      descriptionTe: "గుంటూరు కారం, స్వచ్ఛమైన ఆవనూనె మరియు సాంప్రదాయక మసాలాలతో తయారు చేసిన అసలైన ఆంధ్రా ఆవకాయ పచ్చడి. గృహ వాతావరణంలో ఎటువంటి ప్రిజర్వేటివ్స్ లేకుండా పరిశుభ్రంగా తయారు చేయబడింది.",
      price250g: 150,
      price500g: 280,
      price1kg: 520,
      imageUrl: "/images/avakaya_mango.jpg",
      spiceLevel: "ANDHRA_HOT",
      category: "PICKLE",
      inStock: true
    },
    {
      nameEn: "Spicy Gongura Pickle",
      nameTe: "ఘాటైన గోంగూర పచ్చడి",
      descriptionEn: "Tangy sorrel leaves cooked in wood-pressed oil with roasted coriander seeds, garlic, and hand-ground red chillies. The ultimate pride of Andhra cuisine, best enjoyed with hot rice and ghee.",
      descriptionTe: "రుచికరమైన గోంగూర ఆకులను వేయించిన ధనియాల పొడి, వెల్లుల్లి మరియు దంచిన ఎర్ర మిరపకాయలతో సాంప్రదాయక పద్ధతిలో తయారుచేసిన గోంగూర నిల్వ పచ్చడి. వేడి వేడి అన్నం, నెయ్యితో అద్భుతమైన కలయిక.",
      price250g: 130,
      price500g: 240,
      price1kg: 450,
      imageUrl: "/images/gongura.jpg",
      spiceLevel: "HOT",
      category: "PICKLE",
      inStock: true
    },
    {
      nameEn: "Traditional Tomato Pickle",
      nameTe: "సాंప్రదాయ టమాటో పచ్చడి",
      descriptionEn: "Sun-ripened farm-fresh tomatoes slow-cooked with organic tamarind, and seasoned with mustard seeds, curry leaves, and red chillies. Gives a home-cooked feel to every meal.",
      descriptionTe: "ఎండలో పండిన తాజా టమోటాలు, సేంద్రీయ చింతపండు మరియు ఆవాలు, కరివేపాకు పోపుతో మగ్గించి చేసిన రుచికరమైన సాంప్రదాయ టమాటో పచ్చడి. ప్రతి ముద్దలో ఇంట్లోనే తిన్న అనుభూతిని ఇస్తుంది.",
      price250g: 120,
      price500g: 220,
      price1kg: 400,
      imageUrl: "/images/tomato.jpg",
      spiceLevel: "MEDIUM",
      category: "PICKLE",
      inStock: true
    },
    {
      nameEn: "Allam Ginger Pickle",
      nameTe: "స్వీట్ & స్పైసీ అల్లం పచ్చడి",
      descriptionEn: "A perfect blend of sweet, tangy, and spicy flavors made with fresh ginger, jaggery, and tamarind. Best side dish for traditional breakfasts like Idli, Dosa, and Pesarattu.",
      descriptionTe: "తాజా అల్లం, బెల్లం మరియు చింతపండు సమపాళ్లలో కలిపి చేసిన తీపి, పులుపు మరియు కారాల అల్లం పచ్చడి. ఇడ్లీ, దోశ మరియు పెసరట్టు లాంటి బ్రేక్‌ఫాస్ట్‌లకు సరైన జోడి.",
      price250g: 140,
      price500g: 260,
      price1kg: 480,
      imageUrl: "/images/ginger.jpg",
      spiceLevel: "MEDIUM",
      category: "PICKLE",
      inStock: true
    },
    {
      nameEn: "Pandu Mirapa Chutney (Red Chilli)",
      nameTe: "పండు మిరపకాయ పచ్చడి",
      descriptionEn: "Fiery fresh ripe red chillies pounded with aged tamarind, garlic cloves, and fenugreek powder. A highly aromatic, authentic spicy pickle that spices up your tastebuds.",
      descriptionTe: "తాజా ఎర్ర పండు మిరపకాయలు, చింతపండు, వెల్లుల్లిపాయలు మరియు మెంతుల పొడి వేసి రోట్లో దంచి తయారుచేసిన ఘాటైన ఆంధ్రా పండు మిరప పచ్చడి.",
      price250g: 160,
      price500g: 300,
      price1kg: 550,
      imageUrl: "/images/pandu_mirapa.jpg",
      spiceLevel: "ANDHRA_HOT",
      category: "PICKLE",
      inStock: true
    },
    {
      nameEn: "Traditional Lemon Pickle",
      nameTe: "ఉప్పూ కారం నిమ్మకాయ పచ్చడి",
      descriptionEn: "Sun-cured juicy lemons marinated with hand-pounded red chillies, mustard powder, and sea salt. It gets softer and more intensely flavorful with age.",
      descriptionTe: "ఎండబెట్టిన రసవంతమైన నిమ్మకాయ ముక్కలను కారం, ఆవపొడి మరియు సముద్రపు ఉప్పుతో ఊరబెట్టి చేసిన సాంప్రదాయ నిమ్మకాయ పచ్చడి.",
      price250g: 110,
      price500g: 200,
      price1kg: 380,
      imageUrl: "/images/lemon_pickle.jpg",
      spiceLevel: "MEDIUM",
      category: "PICKLE",
      inStock: true
    },
    {
      nameEn: "Spicy Garlic Pickle",
      nameTe: "వెల్లుల్లి నిల్వ పచ్చడి",
      descriptionEn: "Whole peeled fresh garlic cloves cooked in cold-pressed sesame oil with tamarind pulp, jaggery, and red chillies. Very aromatic and spicy.",
      descriptionTe: "వలిచిన తాజా వెల్లుల్లి రెబ్బలను నువ్వుల నూనె, చింతపండు గుజ్జు మరియు ఎర్ర మిరపకాయలతో పోపు వేసి చేసిన ఘాటైన వెల్లుల్లి పచ్చడి.",
      price250g: 140,
      price500g: 260,
      price1kg: 480,
      imageUrl: "/images/garlic_pickle.jpg",
      spiceLevel: "HOT",
      category: "PICKLE",
      inStock: true
    },
    {
      nameEn: "Raw Tamarind Chintakaya Pickle",
      nameTe: "సాంప్రదాయ చింతకాయ పచ్చడి",
      descriptionEn: "A rustic, stone-pounded pickle made from fresh green raw tamarind pods, salt, and turmeric, tempered with mustard seeds and dry red chillies.",
      descriptionTe: "తాజా పచ్చి చింతకాయలను పసుపు, ఉప్పు వేసి రోట్లో దంచి ఆవాలు, ఎండుమిర్చి తిరగవాత వేసిన అసలైన పల్లెటూరి చింతకాయ పచ్చడి.",
      price250g: 130,
      price500g: 240,
      price1kg: 450,
      imageUrl: "/images/chintakaya_pickle.jpg",
      spiceLevel: "HOT",
      category: "PICKLE",
      inStock: true
    },

    // --- NON-VEG PICKLES ---
    {
      nameEn: "Andhra Boneless Chicken Pickle",
      nameTe: "ఆంధ్రా చికెన్ పచ్చడి (బోన్‌లెస్)",
      descriptionEn: "Premium boneless chicken chunks slow-fried in wood-pressed groundnut oil, blended with traditional ginger-garlic paste and Guntur red chilli spices. Super succulent and flavorful.",
      descriptionTe: "మెత్తటి చికెన్ ముక్కలను వేరుశనగ నూనెలో వేయించి, తాజా అల్లం వెల్లుల్లి పేస్ట్, ప్రత్యేక మసాలాలు మరియు గుంటూరు కారంతో చేసిన అథెంటిక్ చికెన్ నిల్వ పచ్చడి.",
      price250g: 280,
      price500g: 540,
      price1kg: 1050,
      imageUrl: "/images/chicken_pickle.jpg",
      spiceLevel: "HOT",
      category: "NON_VEG",
      inStock: true
    },
    {
      nameEn: "Gongura Mutton Pickle",
      nameTe: "ఘాటైన గోంగూర మటన్ పచ్చడి",
      descriptionEn: "Tender boneless mutton pieces slow-cooked with fresh, tangy gongura (sorrel) leaves and ground spices. A rich and tangy non-veg masterpiece from Royal Andhra kitchens.",
      descriptionTe: "తాజా గోంగూర ఆకులు మరియు లేత మటన్ ముక్కల కలయికతో, ఘాటైన పోపు మరియు సాంప్రదాయ మసాలాలతో చేసిన నోరూరించే గోంగూర మటన్ పచ్చడి.",
      price250g: 320,
      price500g: 620,
      price1kg: 1200,
      imageUrl: "/images/mutton_pickle.jpg",
      spiceLevel: "ANDHRA_HOT",
      category: "NON_VEG",
      inStock: true
    },
    {
      nameEn: "Royal Prawns Pickle",
      nameTe: "రుచికరమైన రొయ్యల పచ్చడి",
      descriptionEn: "Premium prawns cleaned and crispy fried with ginger-garlic paste, fenugreek powder, and traditional Andhra pickling spices. A seafood lover's dream.",
      descriptionTe: "పరిశుభ్రం చేసిన తాజా రొయ్యలను అల్లం వెల్లుల్లి పేస్ట్, మెంతి పొడి మరియు సాంప్రదాయ ఆంధ్రా పోపుతో దోరగా వేయించి చేసిన ఘాటైన రొయ్యల పచ్చడి.",
      price250g: 300,
      price500g: 580,
      price1kg: 1100,
      imageUrl: "/images/prawns_pickle.jpg",
      spiceLevel: "MEDIUM",
      category: "NON_VEG",
      inStock: true
    },
    {
      nameEn: "Gongura Chicken Pickle",
      nameTe: "గోంగూర చికెన్ పచ్చడి",
      descriptionEn: "Succulent boneless chicken pieces fried with tangy green sorrel (gongura) leaves, hand-pound Andhra spices, and wood-pressed oil.",
      descriptionTe: "తాజా చికెన్ ముక్కలను పుల్లని గోంగూర ఆకులతో వేరుశనగ నూనెలో మగ్గించి చేసిన రుచికరమైన గోంగూర చికెన్ పచ్చడి.",
      price250g: 290,
      price500g: 560,
      price1kg: 1080,
      imageUrl: "/images/gongura_chicken.jpg",
      spiceLevel: "ANDHRA_HOT",
      category: "NON_VEG",
      inStock: true
    },
    {
      nameEn: "Andhra Fish Pickle",
      nameTe: "చేపల నిల్వ పచ్చడి",
      descriptionEn: "Boneless freshwater fish fillets cut into chunks, fried with ginger-garlic paste, curry leaves, and spicy Andhra Guntur chilli mix.",
      descriptionTe: "తాజా చేప ముక్కలను అల్లం, వెల్లుల్లి, నిమ్మరసం మరియు ఘాటైన పోపుతో దోరగా వేయించి చేసిన అథెంటిక్ ఆంధ్రా చేపల పచ్చడి.",
      price250g: 310,
      price500g: 600,
      price1kg: 1150,
      imageUrl: "/images/fish_pickle.jpg",
      spiceLevel: "HOT",
      category: "NON_VEG",
      inStock: true
    },

    // --- DRY PICKLES / GUNPOWDERS ---
    {
      nameEn: "Authentic Kandi Podi (Gunpowder)",
      nameTe: "సాంప్రదాయ కంది పొడి",
      descriptionEn: "A classic dry roasted lentil powder seasoned with cumin seeds, dry red chillies, and a pinch of asafoetida. Best served with piping hot rice and clarified butter (ghee).",
      descriptionTe: "దోరగా వేపిన కందిపప్పు, జీలకర్ర, ఎండుమిర్చి మరియు ఇంగువ పోపుతో రుబ్బిన పాతకాలపు కందిపొడి. వేడి అన్నం, నెయ్యితో తింటే అమృతంలా ఉంటుంది.",
      price250g: 90,
      price500g: 160,
      price1kg: 300,
      imageUrl: "/images/kandi_podi.jpg",
      spiceLevel: "MILD",
      category: "DRY_CHUTNEY",
      inStock: true
    },
    {
      nameEn: "Andhra Karappodi (Spicy Garlic Powder)",
      nameTe: "స్పైసీ ఆంధ్రా కారప్పొడి",
      descriptionEn: "A spicy, dry condiment powder made from roasted black gram, garlic cloves, coriander seeds, and Guntur dry red chillies. The perfect topping for hot idlis and crispy dosas.",
      descriptionTe: "మినప్పప్పు, శనగపప్పు, వెల్లుల్లిపాయలు, ధనియాలు మరియు కారపు ఎండుమిర్చితో రుబ్బిన ఘాటైన ఆంధ్రా కారప్పొడి. ఇడ్లీ, దోశలపై చల్లుకోవడానికి అద్భుతం.",
      price250g: 80,
      price500g: 150,
      price1kg: 280,
      imageUrl: "/images/karappodi.jpg",
      spiceLevel: "HOT",
      category: "DRY_CHUTNEY",
      inStock: true
    },
    {
      nameEn: "Roasted Peanut Chutney Powder",
      nameTe: "కమ్మని పల్లీల కారప్పొడి",
      descriptionEn: "Slow roasted premium peanuts ground with red chillies, garlic, and cumin. Adds a delicious rich nutty texture to breakfast and rice.",
      descriptionTe: "దోరగా వేపిన వేరుశనగ పల్లీలను వెల్లుల్లి, జీలకర్ర మరియు ఎండుమిర్చితో రుబ్బిన కమ్మని పల్లీల కారప్పొడి.",
      price250g: 95,
      price500g: 180,
      price1kg: 340,
      imageUrl: "/images/palli_podi.jpg",
      spiceLevel: "MEDIUM",
    },
    {
      nameEn: "Soft Homemade Roti",
      nameTe: "తాజా చపాతీ / రోటి",
      descriptionEn: "Freshly prepared soft whole wheat rotis. Healthy, oil-free, and clay-oven baked. Perfect companion for traditional pickles.",
      descriptionTe: "తాజా గోధుమ పిండితో మెత్తగా కాల్చిన చపాతీలు. మా పచ్చళ్లతో తింటే ఎంతో రుచిగా ఉంటాయి.",
      price250g: 10,
      price500g: 50,
      price1kg: 100,
      imageUrl: "/images/roti.jpg",
      spiceLevel: "MILD",
      category: "ROTI",
      inStock: true
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '') }, // stable test id based on name
      update: product,
      create: {
        id: product.nameEn.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''),
        ...product
      }
    });
  }

  console.log('Products seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
