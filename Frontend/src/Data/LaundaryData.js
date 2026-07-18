
// Import service background images
import Laundry from '../assets/Laundry.jpg';
import dryclean from '../assets/dryclean.webp';
import Iron from '../assets/Iron.jpg';
import HomeCurtain from '../assets/HomeCurtain.jpg'
import HomeShoe from "../assets/HomeShoe.jpg"
import HomeCarpet  from '../assets/HomeCarpet.png'
// Import feature icons
import supportIcon from '../assets/customersupport.webp';
import deliveryIcon from '../assets/fastdelivery.webp';
import ecoIcon from '../assets/freshandechofriendly.webp';



// Laundry-Service Page Images

import LaundryHeroBackground from '../assets/Laundry-Service/LaundryHerobackground1.png'
import LaundryHeroVector from '../assets/Laundry-Service/LaundryHeroVector.png'
import baby from '../assets/Laundry-Service/baby.webp'
import Curtain from '../assets/Laundry-Service/Curtain.webp'
import Eco from '../assets/Laundry-Service/Eco.webp'
import FabSpecialist from '../assets/Laundry-Service/FabSpecialist.webp'
import LaundrySteps from '../assets/Steps.png'
import Product from '../assets/Laundry-Service/Product.webp'
import washfold from '../assets/Laundry-Service/washfold.webp'
import washiron from '../assets/Laundry-Service/washiron.webp'
import winter from '../assets/Laundry-Service/winter.webp'
import Wool from '../assets/Laundry-Service/Wool.webp'
import woolen from '../assets/Laundry-Service/woolen.webp'


// DryClean-Service Page Images

import DryHeroBackground from '../assets/DryClean/DryHeroBackground2.png'
import DryHeroVector from '../assets/DryClean/DryHeroVector.png'
import bags from '../assets/DryClean/bags.webp'
import Step from '../assets/DryClean/steps.webp'

import gown from '../assets/DryClean/gown.jpeg'
import leather from '../assets/DryClean/leather.jpeg'
import kids from '../assets/DryClean/Kids.webp'
import MenWear from '../assets/DryClean/Menswear.jpeg'
import WomenWear from '../assets/DryClean/WomenWear.jpeg'



import shoe from '../assets/DryClean/shoe.webp'
import Weeding from '../assets/DryClean/Weeding.jpeg'


// Iron Service page Images

import IronHeroBackground from '../assets/Iron-Service/IronHeroBackground1.png'
import IronHeroVector1 from '../assets/Iron-Service/IronHeroVector1.png'
import pant from '../assets/Iron-Service/pant.webp'
import saree from '../assets/Iron-Service/saree.jpeg'
import Steps from '../assets/Iron-Service/Steps.webp'
import suit from '../assets/Iron-Service/suit.jpeg'

//Curatin service page Images

import CurtainHeroBackground from '../assets/CurtainClean/CurtainHeroBackground1.png'
import CurtainHeroVector from '../assets/CurtainClean/CurtainHeroVector.png'
import antibacteria from '../assets/CurtainClean/antibacteria.webp'
import black from '../assets/CurtainClean/black.webp'
import blinds from '../assets/CurtainClean/blinds.webp'
import foam from '../assets/CurtainClean/foam.webp'
import mesh from '../assets/CurtainClean/mesh.webp'
import multi from '../assets/CurtainClean/multi.webp'
import silk from '../assets/CurtainClean/silk.webp'
import steam from '../assets/CurtainClean/steam.webp'
import velvet from '../assets/CurtainClean/velvet.webp'

// Shoe service page Images
import ShoeHeroBackground from '../assets/ShoeClean/ShoeHeroBackground1.png'
import ShoeHeroVector from '../assets/ShoeClean/ShoeHeroVector.png'
import heels from '../assets/ShoeClean/heels.jpeg'
import jordan from '../assets/ShoeClean/jordan.webp'
import leatherShoe from '../assets/ShoeClean/leather.jpeg'
import repair from '../assets/ShoeClean/repair.webp'
import sport from '../assets/ShoeClean/sport.jpeg'
import steps from '../assets/ShoeClean/steps.webp'
import white from '../assets/ShoeClean/white.webp'

// Carpet service page Images

import CarpetHeroBackground from '../assets/CarpetClean/CarpetHeroBackground1.png'
import CarpetHeroVector from '../assets/CarpetClean/CarpetHeroVector.png'
import dry from '../assets/CarpetClean/dry.webp'
import nylon from '../assets/CarpetClean/nylon.webp'
import persian from '../assets/CarpetClean/persian.webp'
import shaggy from '../assets/CarpetClean/shaggy.webp'
import silkCarpet from '../assets/CarpetClean/silk.webp'
import steamCarpet from '../assets/CarpetClean/steam.webp'
import turkish from '../assets/CarpetClean/turkish.webp'
import wool from '../assets/CarpetClean/wool.webp'
import Odour from '../assets/CarpetClean/Odour.png'

import { Shirt, Sparkles, Baby,  WashingMachine,
 Footprints,
  Blinds,
  Sofa,
  Gem,
  Briefcase,
  Building2,
  Flower2,
  Star,
  Layers3,
  Shield,
  Wind,
  Crown,
  ShieldCheck,
Handbag} from 'lucide-react'

// Home Page 

// Feature items with image icons 
export const features = [
  { icon: supportIcon, title: 'Customer Support', alt: 'Customer Support' },
  { icon: deliveryIcon, title: 'Super Fast Delivery', alt: 'Super Fast Delivery' },
  { icon: ecoIcon, title: 'Fresh & Eco-Friendly', alt: 'Fresh & Eco-Friendly' }
];

// Stats data
export const statsData = [
  { value: '4.0', suffix: 'L', label: 'SATISFIED CUSTOMERS', prefix: '' },
  { value: '30', suffix: '+', label: 'CITIES', prefix: '' },
  { value: '72', suffix: '+', label: 'STORES', prefix: '' },
  { value: '7.0', suffix: 'L', label: 'GARMENTS WASHED', prefix: '' }
];

// Services data with background images
export const allServices = [
  {
    id: 1,
    title: 'Laundry',
    description: 'Enjoy fresh, clean, folded laundry – more time for what matters most.',
    bgImage: Laundry,
    path: "/services/Laundry-service"
  },
  {
    id: 2,
    title: 'Dry Cleaning',
    description: 'Refresh your garments with our expert dry cleaning – book now!',
    bgImage: dryclean,
     path: "/services/DryClean-service"
  },
  {
    id: 3,
    title: 'Ironing',
    description: 'Get wrinkle-free perfection – expert ironing that keeps you looking sharp!',
    bgImage: Iron,
   path: "/services/Ironing-service"
  },
  {
    id: 4,
    title: 'Curtain Cleaning',
    description: 'Convenient wash and fold service – save time and enjoy fresh clothes.',
    bgImage: HomeCurtain,
    path: "/services/CurtainCleaning-service" 
  },
  {
    id: 5,
    title: 'Shoe Cleaning',
    description: 'Gentle steam cleaning for delicate fabrics – safe and effective.',
    bgImage: HomeShoe,
    path:"/services/ShoeCleaning-service"
  },
  {
    id: 6,
    title: 'Carpet Cleaning',
    description: 'Professional alterations and repairs – perfect fit guaranteed.',
    bgImage: HomeCarpet,
    path: "/services/CarpetCleaning-service"
  }
];

// How It Works steps data
export const howItWorksSteps = [
  {
    step: 'STEP 1',
    title: 'Place your order through App, Website or Call',
    icon: '📱'
  },
  {
    step: 'STEP 2',
    title: 'We pick your clothes in bag',
    icon: '🛍️'
  },
  {
    step: 'STEP 3',
    title: 'We clean your clothes in Laundromat',
    icon: '🧼'
  },
  {
    step: 'STEP 4',
    title: 'Track your Order anytime, anywhere',
    icon: '📍'
  },
  {
    step: 'STEP 5',
    title: 'We deliver fresh, clean, folded clothes',
    icon: '🚚'
  }
];

// Section text configurations
export const sectionTexts = {
  hero: {
    title: 'Premium Laundry & Dry Cleaning Services',
    badge: '✦ Authenura',
    subtitle: 'Trusted care for every garment — pickup, clean & deliver.'
  },
  nearYou: {
    text: 'Near You'
  },
  services: {
    heading: 'Our Services',
    subtitle: 'Discover All That Laundrywala Has to Offer – Tailored Cleaning Services for Your Wardrobe.',
    trustBadge: 'Trusted by Nearly 4 Lakhs Happy Customers – Choose us for Exceptional Care.'
  },
  howItWorks: {
    title: 'We Collect, Clean, and Deliver – Laundrywala Makes',
    highlight: 'Life Easier!',
    description: 'At Laundrywala, we offer reliable laundry and dry cleaning services designed to make your life easier. From careful garment handling to on-time delivery at your doorstep, we ensure your clothes are treated with the utmost care and professionalism. Experience the convenience of premium cleaning services with Laundrywala, where every detail is crafted around you.'
  },
  stats: {
    title: 'Trusted by thousands of people across the nation.'
  }
};

// Button texts
export const buttonTexts = {
  primary: 'Schedule Your Pickup',
  secondary: 'See Our Pricing'
};

// Colors
export const colors = {
  primary: '#2563EB',
  primaryLight: '#3B82F6',
  primaryDark: '#1D4ED8',
  navy: '#1A1A4E'
};

// End Home Page




export const faqData = [
  {
    id: 1,
    category: "Booking",
    question: "Why is Laundrywala the best laundry and dry cleaner?",
    answer: "Laundrywala offers premium laundry and dry cleaning services with doorstep pickup and delivery, quality care, affordable pricing, and eco-friendly cleaning methods."


  },
  {
    id: 2,
    category: "Booking",
    question: "How do I place an order?",
    answer:

      "You can schedule a pickup through our website, mobile app, or by contacting customer support."
  },


  {

    id: 3,
    category: "Booking",
    question: "Can I schedule pickup for a specific time?",
    answer:
      "Yes, you can choose a convenient pickup slot based on availability in your area."
  },
  {
    id: 4,
    category: "Services",
    question: "Do you provide dry cleaning services?",
    answer:
      "Yes, we provide professional dry cleaning for suits, dresses, wedding wear, delicate fabrics, and premium garments."
  },
  {
    id: 5,
    category: "Services",
    question: "Do you provide shoe cleaning services?",
    answer:
      "Yes, we clean sneakers, leather shoes, suede shoes, sports shoes, and more."
  },
  {
    id: 6,
    category: "Services",
    question: "What types of clothes can be cleaned?",
    answer:
      "We clean everyday wear, office wear, ethnic wear, winter garments, delicate fabrics, and household items."
  },
  {
    id: 7,
    category: "Delivery",
    question: "How long does the cleaning process take?",
    answer:
      "Most orders are completed within 24–48 hours depending on garment type and service selected."
  },
  {
    id: 8,
    category: "Delivery",
    question: "Do you provide free pickup and delivery?",
    answer:
      "Yes, free pickup and delivery are available for eligible orders and locations."
  },
  {
    id: 9,
    category: "Delivery",
    question: "Can I track my order?",
    answer:
      "Yes, order tracking is available through the website and mobile app."
  },
  {
    id: 10,
    category: "Pricing",
    question: "How are laundry prices calculated?",
    answer:
      "Pricing depends on garment type, service selected, quantity, and special cleaning requirements."
  },
  {
    id: 11,
    category: "Pricing",
    question: "Are there any membership benefits?",
    answer:
      "Yes, members receive discounts, exclusive offers, and priority services."
  },
  {
    id: 12,
    category: "General",
    question: "Do you have a mobile application?",
    answer:
      "Yes, our mobile app is available for Android and iOS devices."
  },
  {
    id: 13,
    category: "General",
    question: "What if my garment gets damaged?",
    answer:
      "We follow strict quality standards. In rare cases, our support team reviews the issue according to company policies."
  }
];

export const serviceFaqs = [
  {
    keyword: "laundry",
    question: "What is included in Laundry Service?",
    answer:
      "Our laundry service includes washing, drying, folding, stain treatment, and quality inspection."
  },

  {
    keyword: "dry cleaning",
    question: "What garments are suitable for Dry Cleaning?",
    answer:
      "Suits, blazers, sarees, lehengas, coats, silk garments, and delicate fabrics are best suited for dry cleaning."
  },

  {
    keyword: "ironing",
    question: "Do you provide professional Ironing Services?",
    answer:
      "Yes, we provide steam ironing and professional pressing for all types of garments."
  },

  {
    keyword: "wash and fold",
    question: "What is Wash & Fold Service?",
    answer:
      "Clothes are washed, dried, neatly folded, and packed for delivery without ironing."
  },

  {
    keyword: "steam cleaning",
    question: "What is Steam Cleaning?",
    answer:
      "Steam cleaning removes bacteria, odors, and wrinkles using high-temperature steam without damaging fabrics."
  },

  {
    keyword: "alterations",
    question: "Do you provide Clothing Alteration Services?",
    answer:
      "Yes, we provide hemming, resizing, fitting adjustments, zipper replacement, and other tailoring services."
  }

];




export const ServicesData = {

  "Laundry-service": {
    Hero: {
      HeroBackground: LaundryHeroBackground,
      HeroVector: LaundryHeroVector,
      HeroBadge: " ✦ EXPERT CARE",
      HeroTitle: "Professional Laundry",
      HeroSub: "Perfect Every Time",

      HeroPara: "  Trusted care for every garment — pickup, clean & deliver.",

    },

    WhyUs: {
      title: "Your Clothes, Our Care",
      image: LaundrySteps,

    },
 ServiceOffered: [
  {
    id: 1,
    image: washfold,
    title: "Wash & Fold",
    desc: "Get freshly cleaned, neatly folded clothes ready to wear. Our premium wash & fold service ensures gentle care and long-lasting fabric quality.",
    icon: WashingMachine,
    features: [
      "Eco Friendly",
      "Neatly Folded",
      "24-48 Hrs",
    ],
  },
  {
    id: 2,
    image: washiron,
    title: "Wash & Iron",
    desc: "Enjoy crisp, wrinkle-free garments with professional steam ironing. Laundrywala ensures your clothes look brand new with expert finishing.",
    icon: Shirt,
    features: [
      "Steam Iron",
      "Wrinkle Free",
      "Premium Finish",
    ],
  },
  {
    id: 3,
    image: woolen,
    title: "Woolen Laundry",
    desc: "Keep your woolens soft, fresh, and lint-free with our specialized wool care technology and eco-friendly detergents.",
    icon: ShieldCheck,
    features: [
      "Gentle Care",
      "Lint Free",
      "Fabric Safe",
    ],
  },
],

    Servicetitle: "Laundry",

    ExpertTitle: "Our Expert Laundry Service",

    ExpertService: [
      { id: 1, image: Curtain, title: "Curtain & Carpet Cleaning ", desc: "Premium dry-cleaning for silk, cotton, velvet, and chenille fabrics. Keep your interiors spotless and allergen-free with Laundrywala’s expert care. " },
      { id: 2, image: baby, title: "Baby Clothes & Toy Cleaning ", desc: "Safe, hygienic wash for babywear and soft toys using dermatologically tested detergents perfect for delicate fabrics and sensitive skin. " },
      { id: 3, image: winter, title: " Winter Wear Laundry", desc: "rofessional cleaning for sweaters, coats, jeans, and pyjamas gentle on fibers, tough on dirt, and designed for freshness that lasts." }

    ],


    CTA: {
      type: "Laundry",
      headingtop: "Laundry Made Simple &",
      headingbottom: "Hassle Free",
      subHeading: "Professional washing, folding and doorstep delivery for your everyday clothes"
    }

  },

  "DryClean-service": {
    Hero: {
      HeroBackground: DryHeroBackground,
      HeroVector: DryHeroVector,
      HeroBadge: " ✦ EXPERT CARE",
      HeroTitle: "Professional Dry Cleaning,",
      HeroSub: "Delivered With Care",

      HeroPara: "  Trusted care for every garment — pickup, clean & deliver.",

    },

    WhyUs: {
      title: "Your Clothes, Our Care",
      image: LaundrySteps,

    },

    Servicetitle: "Dry Cleaning",

    ServiceOffered: [
  {
    id: 1,
    image: MenWear,
    title: "Men's Wear",
    desc: "Effortlessly elevate your style with our expert dry cleaning services for men's wear. From formal suits to casual outfits, we ensure you always look sharp, fresh, and polished.",
    icon: Shirt,
    features: [
      "Eco Friendly",
      "24h Delivery",
      "Safe & Hygienic",
    ],
  },
  {
    id: 2,
    image: WomenWear,
    title: "Women's Wear",
    desc: "Radiate confidence in every outfit with our professional dry cleaning services. From elegant dresses to stylish blouses, we'll refresh your wardrobe, leaving you feeling fabulous and flawless.",
    icon: Sparkles,
    features: [
      "Eco Friendly",
      "24h Delivery",
      "Safe & Hygienic",
    ],
  },
  {
    id: 3,
    image: kids,
    title: "Kid's Wear",
    desc: "Keep your little ones looking their best with our expert kids' wear cleaning services. From vibrant outfits to delicate fabrics, we ensure their clothes are fresh, clean, and ready for every adventure.",
    icon: Baby,
    features: [
      "Eco Friendly",
      "24h Delivery",
      "Safe & Hygienic",
    ],
  },
  {
    id: 4,
    image: leather,
    title: "Leather / Suede / Furs",
    desc: "Premium care for your leather, suede, and furs. Our expert dry cleaning ensures their beauty, softness, and longevity are perfectly preserved.",
    icon: Briefcase,
    features: [
      "Eco Friendly",
      "24h Delivery",
      "Safe & Hygienic",
    ],
  },
  {
    id: 5,
    image: gown,
    title: "Wedding Gowns",
    desc: "Preserve your cherished memories with our meticulous wedding gown cleaning services, ensuring your treasured dress remains flawless for years to come.",
    icon: Gem,
    features: [
      "Eco Friendly",
      "24h Delivery",
      "Safe & Hygienic",
    ],
  },
  {
    id: 6,
    image: bags,
    title: "Bag Cleaning",
    desc: "Refresh your bags with our professional cleaning service. From designer handbags to backpacks, we remove stains and dirt, restoring their beauty and functionality.",
    icon: Handbag,
    features: [
      "Eco Friendly",
      "24h Delivery",
      "Safe & Hygienic",
    ],
  },
],

    ExpertTitle: "OUR EXPERT DRY CLEANING SERVICES",

    ExpertService: [
      { id: 1, image: Weeding, title: "PREMIUM GARMENT DRY CLEANING", desc: "Hohenstein-certified process to restore the shine and beauty of your fabrics. Perfect dry cleaning for silk sarees and designer outfits. " },
      { id: 2, image: repair, title: "SHOES, BAG CLEANING AND REPAIR ", desc: "Professional cleaning,and repair services for your shoes and bags. Customized care for every material, ensuring a flawless finish that restores their brand-new appearance." },
      { id: 3, image: woolen, title: " WOOLENS DRY CLEANING", desc: "At Laundrywala, we use advanced Woolmark-approved Lagoon dry cleaning technology to care for your woolen clothes. This ensures they retain their original shape, size, and softness after every clean." }
    ],


    CTA: {
      type: "Dry Cleaning",
      headingtop: "Premium Dry Cleaning For ",
      headingbottom: "Delicate Garments",
      subHeading: 'Expert care for suits, dresses and special fabrics with premium cleaning techniques.'

    }

  },

  "ShoeCleaning-service": {
    Hero: {
      HeroBackground: ShoeHeroBackground,
      HeroVector: ShoeHeroVector,
      HeroBadge: " ✦ EXPERT CARE",
      HeroTitle: "Give Your Shoes Second Life. ",
      HeroSub: "Confident Steps.",

      HeroPara: " Professional shoe cleaning that restores freshness, shine, and comfort.",

    },

    WhyUs: {
      title: "Your Clothes, Our Care",
      image: LaundrySteps,

    },

    Servicetitle: "Shoe Cleaning",

   ServiceOffered: [
  {
    id: 1,
    image: sport,
    title: "Sports Shoes",
    desc: "Restore your sports shoes with professional care, removing dirt, stains, and odors to keep them fresh, comfortable, and ready for your next adventure.",
    icon: Footprints,
    features: [
      "Deep Clean",
      "Odor Removal",
      "Quick Dry",
    ],
  },
  {
    id: 2,
    image: leatherShoe,
    title: "Suede & Leather Shoes",
    desc: "Premium cleaning and conditioning for suede and leather shoes, preserving their texture, shine, and restoring their original elegance.",
    icon: Sparkles,
    features: [
      "Leather Care",
      "Stain Removal",
      "Color Protection",
    ],
  },
  {
    id: 3,
    image: heels,
    title: "High Heels & Sandals",
    desc: "Expert cleaning and polishing for high heels and sandals, helping maintain their style, finish, and overall appearance for every occasion.",
    icon: Crown,
    features: [
      "Premium Polish",
      "Gentle Care",
      "Shine Finish",
    ],
  },
],

    ExpertTitle: "OUR EXPERT SHOE CLEANING SERVICE ",

    ExpertService: [
      { id: 1, image: white, title: "Shoe Cleaning ", desc: "Professional shoe cleaning that removes dirt, stains, and odors from laces, soles, and uppers, restoring your footwear to a fresh and like-new condition." },
      { id: 2, image: repair, title: "Shoe Repair & Restoration", desc: "Expert repair and restoration services that revive worn-out shoes, repairing damaged parts and bringing back their comfort, durability, and appearance." },
      { id: 3, image: jordan, title: "Shoe Protection ", desc: "Premium protection and nourishment treatments that shield your shoes from dust, dirt, water, and stains while preserving their quality and extending their lifespan." },
    ],

    CTA: {
      type: "Shoe Cleaning",
      headingtop: "Bring Your Favorite Shoes Back To Life",
      headingbottom: "",
      subHeading: "From sneakers to formal footwear, our expert cleaning process restores shine, removes stains, and protects every pair."
    }

  },

  "CurtainCleaning-service": {
    Hero: {
      HeroBackground: CurtainHeroBackground,
      HeroVector: CurtainHeroVector,
      HeroBadge: " ✦ EXPERT CARE",
      HeroTitle: "Revive Your Curtains,",
      HeroSub: "Without the Hassle",

      HeroPara: "Gentle yet effective cleaning for every type of curtain fabric.",

    },

    WhyUs: {
      title: "Your Clothes, Our Care",
      image: LaundrySteps,

    },

    Servicetitle: "Curtain Cleaning",

   ServiceOffered: [
  {
    id: 1,
    image: silk,
    title: "Silk Curtains",
    desc: "Professional cleaning that preserves the softness, shine, and delicate fibers of silk curtains.",
    icon: Sparkles,
    features: [
      "Gentle Wash",
      "Fabric Safe",
      "Color Care",
    ],
  },
  {
    id: 2,
    image: velvet,
    title: "Velvet Curtains",
    desc: "Deep cleaning for velvet curtains to remove dust while maintaining their rich texture.",
    icon: Shield,
    features: [
      "Deep Clean",
      "Dust Removal",
      "Soft Finish",
    ],
  },
  {
    id: 3,
    image: multi,
    title: "Multi-Panel Curtains",
    desc: "Thorough cleaning for layered curtains, removing trapped dust and restoring freshness.",
    icon: Layers3,
    features: [
      "Layer Care",
      "Fresh Finish",
      "Dust Free",
    ],
  },
  {
    id: 4,
    image: black,
    title: "Blackout Curtains",
    desc: "Powerful cleaning that removes allergens, dirt, and moisture without damaging heavy fabrics.",
    icon: Blinds,
    features: [
      "Allergen Free",
      "Heavy Fabric",
      "Deep Wash",
    ],
  },
  {
    id: 5,
    image: mesh,
    title: "Mesh / Net Curtains",
    desc: "Gentle low-foam cleaning that keeps delicate net curtains fresh, crisp, and bright.",
    icon: Wind,
    features: [
      "Low Foam",
      "Bright Finish",
      "Gentle Care",
    ],
  },
  {
    id: 6,
    image: blinds,
    title: "Blinds & Vertical Curtains",
    desc: "Professional cleaning for blinds and vertical drapes to remove dust and stains.",
    icon: Blinds,
    features: [
      "Dust Removal",
      "Stain Free",
      "Expert Care",
    ],
  },
],
    ExpertTitle: "OUR EXPERT CURTAIN CLEANING SERVICE ",

    ExpertService: [
      { id: 1, image: steam, title: "Deep Steam Curtain Cleaning", desc: "Removes dust, allergens, and bacteria from curtains while restoring freshness and softness." },
      { id: 2, image: foam, title: "Dry Foam Curtain Cleaning", desc: "Low-moisture cleaning that safely removes dirt without damaging delicate fabrics." },
      { id: 3, image: antibacteria, title: "Antibacterial  Treatment", desc: "Eliminates germs and odors, leaving curtains clean, fresh, and hygienic." },
    ],

    CTA: {
      type: 'Curtain Cleaning',
      headingtop: 'Fresh Curtains, Brighter Spaces',
      headingbotton: '',
      subHeading: 'Remove dust, odors, and allergens with our professional curtain cleaning service, keeping your home fresh and your fabrics looking new.'
    }

  }
  ,


  "CarpetCleaning-service": {
    Hero: {
      HeroBackground: CarpetHeroBackground,
      HeroVector: CarpetHeroVector,
      HeroBadge: " ✦ EXPERT CARE",
      HeroTitle: "Deep Clean Carpets.",
      HeroSub: "Healthier Homes",

      HeroPara: " Eliminate dirt, stains, and odors to bring your carpets back to life.",

    },

    WhyUs: {
      title: "Your Clothes, Our Care",
      image: LaundrySteps,

    },

    Servicetitle: "Carpet Cleaning",

ServiceOffered: [
  {
    id: 1,
    image: wool,
    title: "Wool Carpet",
    desc: "Soft, warm, and timeless. We gently deep-clean wool carpets using safe solutions that protect texture, softness, and color brilliance.",
    icon: Flower2,
    features: [
      "Deep Clean",
      "Fabric Safe",
      "Color Care",
    ],
  },
  {
    id: 2,
    image: persian,
    title: "Persian Carpet",
    desc: "Elegant craftsmanship needs expert hands. Our delicate process revives the beauty, colors, and softness of your Persian rugs.",
    icon: Gem,
    features: [
      "Expert Care",
      "Color Restore",
      "Hand Wash",
    ],
  },
  {
    id: 3,
    image: silkCarpet,
    title: "Silk Carpet",
    desc: "Fine silk deserves careful attention. We use a low-moisture method that removes dust and stains while preserving natural sheen.",
    icon: Sparkles,
    features: [
      "Low Moisture",
      "Stain Free",
      "Shine Care",
    ],
  },
  {
    id: 4,
    image: nylon,
    title: "Nylon Carpet",
    desc: "Durable and modern. Ideal for offices and homes, cleaned with precision to eliminate dirt, allergens, and restore brightness.",
    icon: Building2,
    features: [
      "Allergen Free",
      "Deep Clean",
      "Quick Dry",
    ],
  },
  {
    id: 5,
    image: shaggy,
    title: "Shaggy Carpet",
    desc: "Fluffy and stylish. We deep vacuum and sanitize shaggy carpets to restore softness, volume, and a freshly groomed feel.",
    icon: Sofa,
    features: [
      "Deep Vacuum",
      "Soft Finish",
      "Sanitized",
    ],
  },
  {
    id: 6,
    image: turkish,
    title: "Turkish / Acrylic Carpet",
    desc: "Rich patterns, lasting beauty. Cleaned with gentle care that protects fiber strength, color depth, and intricate handwoven details.",
    icon: Star,
    features: [
      "Fiber Care",
      "Gentle Wash",
      "Premium Finish",
    ],
  },
],

    ExpertTitle: "OUR EXPERT CARPET CLEANING SERVICE ",

    ExpertService: [
      { id: 1, image: steamCarpet, title: " Deep Steam Carpet Cleaning", desc: "High-pressure hot water extraction removes deep-seated dust, stains, and bacteria from carpet fibers. Perfect for homes and offices that need  allergen-free cleaning." },
      { id: 2, image: dry, title: "Dry Carpet Cleaning ", desc: "A low-moisture cleaning method that uses specialized compounds to lift dirt. Quick drying time and extremely safe for delicate fabrics like silk and Persian rugs. " },
      { id: 3, image: Odour, title: " Carpet Stain & Odor Removal", desc: "Targeted treatment for stubborn stains (coffee, wine, pet stains) and specialized deodorizers to eliminate trapped odors, bringing your carpet back to life." },
    ],

    CTA: {
      type: "Laundry",
      headingtop: "aundry Made Simple &",
      headingbottom: "Hassle Free",
      subHeading: "Professional washing, folding and doorstep delivery for your everyday clothes"
    }

  },

  "Ironing-service": {
    Hero: {
      HeroBackground: IronHeroBackground,
      HeroVector: IronHeroVector1,
      HeroBadge: " ✦ EXPERT CARE",
      HeroTitle: "Perfectly Pressed.",
      HeroSub: "Professionally Finished.",

      HeroPara: "Save time while we remove every crease with precision and care.",

    },

    WhyUs: {
      title: "Your Clothes, Our Care",
      image: LaundrySteps,

    },

    Servicetitle: "",

    ServiceOffered: [],

    ExpertTitle: "OUR EXPERT IRONING SERVICE ",

    ExpertService: [
      { id: 1, image: saree, title: "Silk Saree", desc: "Every woman cherishes at least one silk saree, a timeless piece passed down from her mother or a beloved figure she holds dear." },
      { id: 2, image: suit, title: "Suit Ironing ", desc: "Suits are crafted from fabrics designed to withstand ironing, making the process hassle-free. Proper ironing ensures your suit looks sharp and perfectly tailored. " },
      { id: 3, image: woolen, title: " Heat Setting Fabric", desc: "Permanent fabric paint needs to be heat set to ensure it stays intact. Once heat set, you can use the fabric without worrying about the paint peeling or fading." },
    ],

    CTA: {
      type: 'Ironing',
      headingtop: 'Perfectly Pressed,',
      headingbottom: 'Ready To Wear',
      subHeading: 'Enjoy crisp, wrinkle-free clothes professionally ironed and neatly prepared for every occasion.'
    }

  }


};



export const subscriptionHistory = [
  {
    id: 1,
    plan: "Monthly Care",
    duration: "1 Month",
    amount: "₹299",
    startDate: "01 June 2026",
    expiryDate: "01 July 2026",
    status: "Active",
    invoiceId: "INV-2026-001",
  },
  {
    id: 2,
    plan: "Quarterly",
    duration: "3 Months",
    amount: "₹799",
    startDate: "01 January 2026",
    expiryDate: "01 April 2026",
    status: "Expired",
    invoiceId: "INV-2026-002",
  },
  {
    id: 3,
    plan: "Half Yearly",
    duration: "6 Months",
    amount: "₹1499",
    startDate: "01 July 2025",
    expiryDate: "01 January 2026",
    status: "Expired",
    invoiceId: "INV-2026-003",
  },
];


export const pricingFaqs = [
  {
    id: 1,
    question: "Is there a minimum order amount?",
    answer:
      "Yes, for our Wash & Fold service, we have a 15 lb minimum per order. Orders under 15 lbs will be charged the minimum flat rate of $29.25.",
  },
  {
    id: 2,
    question: "How do you charge for Dry Cleaning?",
    answer:
      "Dry Cleaning is charged per item. A full price list for specific items (suits, dresses, coats) is available in our mobile app or at the checkout screen.",
  },
  {
    id: 3,
    question: "Do you charge for pickup and delivery?",
    answer:
      "Standard pickup and delivery are free for all orders over $35. For orders under $35, a small $5 logistics fee is applied.",
  },
];

export const MOCK_SERVICES = [
  {
    id: "SRV001",
    name: "Laundry",
    category: "Clothes",
    price: 120,
    duration: "24 Hours",
    status: "Active",
    description:
      "Professional wash, dry and fold service for everyday clothes.",
    createdDate: "2026-06-20",

    totalOrders: 420,
    completedOrders: 398,
    cancelledOrders: 22,
    totalEarnings: 47760,
  },

  {
    id: "SRV002",
    name: "Dry Cleaning",
    category: "Premium",
    price: 250,
    duration: "48 Hours",
    status: "Active",
    description:
      "Premium dry cleaning for delicate garments.",
    createdDate: "2026-06-19",

    totalOrders: 185,
    completedOrders: 175,
    cancelledOrders: 10,
    totalEarnings: 43750,
  },

  {
    id: "SRV003",
    name: "Ironing",
    category: "Clothes",
    price: 80,
    duration: "12 Hours",
    status: "Active",
    description:
      "Steam ironing for wrinkle free clothes.",
    createdDate: "2026-06-18",

    totalOrders: 310,
    completedOrders: 296,
    cancelledOrders: 14,
    totalEarnings: 23680,
  },

  {
    id: "SRV004",
    name: "Carpet Cleaning",
    category: "Home Care",
    price: 650,
    duration: "72 Hours",
    status: "Active",
    description:
      "Deep carpet cleaning with stain removal.",
    createdDate: "2026-06-17",

    totalOrders: 92,
    completedOrders: 86,
    cancelledOrders: 6,
    totalEarnings: 55900,
  },

  {
    id: "SRV005",
    name: "Curtain Cleaning",
    category: "Home Care",
    price: 550,
    duration: "48 Hours",
    status: "Inactive",
    description:
      "Dust removal and deep cleaning for curtains.",
    createdDate: "2026-06-16",

    totalOrders: 78,
    completedOrders: 70,
    cancelledOrders: 8,
    totalEarnings: 38500,
  },

  {
    id: "SRV006",
    name: "Shoe Cleaning",
    category: "Accessories",
    price: 300,
    duration: "24 Hours",
    status: "Active",
    description:
      "Premium shoe cleaning and polishing.",
    createdDate: "2026-06-15",

    totalOrders: 145,
    completedOrders: 136,
    cancelledOrders: 9,
    totalEarnings: 40800,
  },
];

export const DEFAULT_CATEGORY_ITEMS = {
  "Laundry": [
    { name: "Tshirt", price: 80 },
    { name: "Jeans", price: 120 },
    { name: "Shirt", price: 100 },
    { name: "Bed Sheet", price: 150 },
    { name: "Shorts", price: 60 }
  ],
  "Dry Cleaning": [
    { name: "Suit (2-piece)", price: 450 },
    { name: "Silk Saree", price: 500 },
    { name: "Woolen Blazer", price: 300 },
    { name: "Leather Jacket", price: 600 },
    { name: "Coat", price: 350 }
  ],
  "Ironing": [
    { name: "Shirt", price: 30 },
    { name: "Jeans", price: 30 },
    { name: "Saree", price: 80 },
    { name: "Kurta", price: 40 },
    { name: "Suit", price: 50 }
  ],
  "Carpet Cleaning": [
    { name: "Small Rug", price: 250 },
    { name: "Medium Carpet", price: 450 },
    { name: "Large Carpet", price: 650 },
    { name: "Persian Rug", price: 900 },
    { name: "Doormat", price: 100 }
  ],
  "Curtain Cleaning": [
    { name: "Single Panel Curtain", price: 150 },
    { name: "Double Panel Curtain", price: 280 },
    { name: "Velvet Curtain", price: 350 },
    { name: "Blackout Curtain", price: 200 },
    { name: "Sheer Curtain", price: 120 }
  ],
  "Shoe Cleaning": [
    { name: "Sneakers", price: 150 },
    { name: "Leather Shoes", price: 200 },
    { name: "Sports Shoes", price: 180 },
    { name: "Suede Boots", price: 350 },
    { name: "Sandals/Heels", price: 150 }
  ]
};