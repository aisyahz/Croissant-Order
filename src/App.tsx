/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  Star, 
  Clock, 
  Truck, 
  Heart, 
  Flame, 
  IceCream, 
  Zap,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook
} from 'lucide-react';

// --- Data ---

const SIGNATURE_PRODUCTS = [
  {
    id: 2,
    name: "Mini Croissant + Chocolate Drizzle (DIY)",
    description: "10 pcs mini croissant + 1 premium chocolate drizzle (separate cup). \"Drizzle sendiri, tak soggy\"",
    price: 28,
    items: "10 pcs + chocolate cup",
    image: "https://raw.githubusercontent.com/aisyahz/Croissant-Order/main/public/box2.png",
    isStar: true,
  },
  {
    id: 1,
    name: "Classic Mini Croissant",
    description: "10 pcs mini croissant (plain, buttery)",
    price: 22,
    items: "10 pcs",
    image: "https://raw.githubusercontent.com/aisyahz/Croissant-Order/main/public/box1.png",
    isStar: false,
  },
  {
    id: 3,
    name: "Double Chocolate Croissant",
    description: "10 pcs mini croissant + extra chocolate dip",
    price: 32,
    items: "10 pcs",
    image: "https://raw.githubusercontent.com/aisyahz/Croissant-Order/main/public/box3.png",
    isStar: false,
  }
];

const PACKAGES = [
  {
    name: "Frozen Croissant",
    quantity: "10 pcs",
    price: 18,
    description: "Unbaked, ready for airfryer/oven. No flavour selection. Best for home baking.",
    icon: <IceCream className="w-5 h-5" />,
  },
  {
    name: "Office Set",
    quantity: "60 pcs (6 boxes)",
    price: 130,
    note: "Perfect for meetings & tea breaks",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    name: "Big Event Set",
    quantity: "100 pcs (10 boxes)",
    price: 200,
    note: "Includes delivery & premium handling",
    icon: <Truck className="w-5 h-5" />,
    bestDeal: true
  }
];

const FEATURES = [
  { title: "Buttery & Flaky", icon: <Flame className="w-6 h-6" />, desc: "Pure butter perfection" },
  { title: "Muslim-Owned", icon: <Heart className="w-6 h-6" />, desc: "Made with love & care" },
  { title: "Easy to Enjoy", icon: <Zap className="w-6 h-6" />, desc: "Bite-sized happiness" },
  { title: "Halal Ingredients", icon: <Star className="w-6 h-6" />, desc: "Quality guaranteed" },
];

const OCCASIONS = [
  "Jamuan Office", "Majlis Kecil", "Potluck", "Birthday", "Meeting Treats"
];

const STEPS = [
  { number: "01", title: "Heat Croissant", desc: "Optional: Airfryer/Oven for 3-5 mins", icon: <Flame /> },
  { number: "02", title: "Warm Chocolate", desc: "Microwave for 10–15 seconds only", icon: <Clock /> },
  { number: "03", title: "Drizzle Sendiri", desc: "Tak soggy, pure satisfaction", icon: <Zap /> },
  { number: "04", title: "Enjoy!", desc: "Crunchy & melted goodness", icon: <Heart /> },
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2">
          <img src="https://github.com/aisyahz/Croissant-Order/blob/main/public/logo.png" alt="TEPI.CO" className="h-10 w-auto" />
          <span className="text-2xl font-display font-bold tracking-widest text-bakery-chocolate">TEPI.CO</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {['Menu', 'Features', 'How it Works', 'Order'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
              className="text-sm font-medium hover:text-bakery-accent transition-colors"
            >
              {item}
            </a>
          ))}
          <a href="#order" className="btn-primary py-2 px-6 text-sm">Order Now</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-bakery-chocolate" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl py-6 flex flex-col items-center space-y-4 md:hidden border-t border-bakery-beige"
          >
            {['Menu', 'Features', 'How it Works', 'Order'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
                className="text-lg font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a 
              href="#order" 
              className="btn-primary w-2/3 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Order Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    date: '',
    location: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hi TEPI.CO! I would like to place an order:%0A%0AName: ${formData.name}%0AQuantity/Set: ${formData.quantity}%0ADate: ${formData.date}%0ALocation: ${formData.location}%0A%0AThank you!`.replace(/ /g, '%20');
    window.open(`https://wa.me/60136648159?text=${message}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen selection:bg-bakery-tan selection:text-bakery-chocolate overflow-x-hidden">
      <Navbar />

      {/* --- Hero Section --- */}
      <section className="relative min-h-[90vh] flex items-center pt-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-bakery-beige rounded-l-[100px] -z-10 hidden lg:block" />
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="tagline-ribbon">
              DRIZZLE SENDIRI, LAGI FRESH & TAK SOGGY
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="trust-badge">Muslim-Owned</span>
              <span className="trust-badge">Halal-Friendly Ingredients</span>
              <span className="trust-badge">Pre-Order 3 Days</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-semibold leading-[1.1] text-bakery-chocolate">
              Mini Croissant, <br />
              <span className="italic text-bakery-accent underline decoration-bakery-tan/40 underline-offset-12">Freshly Baked</span> <br />
              Happiness 🥐
            </h1>
            <p className="text-lg md:text-xl text-bakery-chocolate/70 max-w-lg leading-relaxed">
              Premium mini croissant experience with signature DIY chocolate drizzle. The perfect treat for your office or special events.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <a href="#order" className="btn-primary w-full sm:w-auto text-center px-10">Order Now</a>
              <a href="#menu" className="btn-secondary w-full sm:w-auto text-center px-10">View Menu</a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-bakery-accent/5 rounded-[40px] blur-2xl -z-10" />
            <img 
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000&auto=format&fit=crop" 
              alt="Premium Croissants"
              className="w-full h-auto rounded-[40px] shadow-2xl object-cover"
            />
            {/* Floating Tag */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-bakery-tan/20 flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-bakery-ribbon rounded-xl flex items-center justify-center text-bakery-accent">
                <Star fill="currentColor" />
              </div>
              <div>
                <p className="text-xs uppercase font-bold tracking-widest text-bakery-accent">Signature</p>
                <p className="font-semibold">DIY Drizzle Set</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- Features --- */}
      <section id="features" className="py-24 bg-bakery-ribbon/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center p-8 bg-white/50 rounded-[32px] border border-white"
              >
                <div className="w-14 h-14 bg-bakery-accent text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-bakery-chocolate/60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Signature Products --- */}
      <section id="menu" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold">Signature Series</h2>
            <p className="text-bakery-chocolate/70 max-w-2xl mx-auto font-medium leading-relaxed">
              Premium mini croissant sets. Homemade by order, taking pride in every flaky layer.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {OCCASIONS.map((tag) => (
                <span key={tag} className="px-4 py-1.5 bg-bakery-ribbon text-bakery-accent text-[11px] font-black uppercase tracking-widest rounded-full border border-bakery-accent/10">
                  # {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {SIGNATURE_PRODUCTS.map((product) => (
              <motion.div 
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="product-card group flex flex-col h-full ring-1 ring-bakery-tan/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {product.isStar && (
                    <div className="absolute top-4 right-4 bg-bakery-accent text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl ring-2 ring-white/20">
                      <Star className="w-3 h-3 fill-white" /> BEST SELLER
                    </div>
                  )}
                  <div className="absolute inset-0 bg-bakery-chocolate/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-10 flex flex-col flex-grow bg-white">
                  <div className="flex-grow">
                    <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-bakery-accent transition-colors">{product.name}</h3>
                    <p className="text-bakery-chocolate/70 text-sm font-medium leading-relaxed mb-6">{product.description}</p>
                    <div className="inline-block px-3 py-1 bg-bakery-ribbon rounded-lg text-xs font-bold text-bakery-accent uppercase tracking-wider mb-8">
                       {product.items}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-8 border-t border-bakery-tan/10">
                    <div className="text-3xl font-black text-bakery-chocolate">RM{product.price}</div>
                    <a href="#order" className="group/btn relative btn-primary !px-5 !py-3 bg-bakery-cream hover:!bg-bakery-accent text-bakery-chocolate hover:text-white transition-all shadow-none flex items-center gap-2">
                      <span className="font-bold text-xs uppercase tracking-widest">Order</span>
                      <ShoppingBag className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why Us Section --- */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 text-bakery-accent font-black uppercase tracking-[0.2em] text-xs">
                  <div className="w-8 h-[2px] bg-bakery-accent" />
                  Kenapa TEPI.CO?
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-bold text-bakery-chocolate leading-[1.1]">
                  Crafted for <br />
                  <span className="italic text-bakery-accent">Your Moments</span>
                </h2>
                <p className="text-lg text-bakery-chocolate/70 leading-relaxed font-medium max-w-xl">
                  Setiap croissant dibuat khas untuk moment kecil yang bermakna — dari jamuan office hingga majlis bersama orang tersayang.
                </p>
              </div>

              <div className="space-y-10">
                {[
                  { title: "Muslim-Owned", desc: "Disediakan oleh owner Muslim, dengan penjagaan kebersihan & kepercayaan.", icon: "🕌" },
                  { title: "Halal-Friendly Ingredients", desc: "Menggunakan bahan premium yang sesuai untuk dinikmati semua.", icon: "🍫" },
                  { title: "Fresh by Pre-Order", desc: "Dibakar khas untuk anda — tiada stock lama.", icon: "🔥" },
                  { title: "Perfect for Malaysian Occasions", desc: "Jamuan office, majlis kecil, potluck & event.", icon: "🎉" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="text-3xl filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-bakery-chocolate flex items-center gap-2">
                        {item.title}
                        <div className="w-0 group-hover:w-8 h-[1px] bg-bakery-tan transition-all duration-500" />
                      </h3>
                      <p className="text-bakery-chocolate/60 font-medium leading-relaxed max-w-md italic">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-bakery-chocolate/30">
                <span>Muslim-owned</span>
                <span className="text-bakery-tan">•</span>
                <span>Halal-friendly</span>
                <span className="text-bakery-tan">•</span>
                <span>Freshly baked</span>
                <span className="text-bakery-tan">•</span>
                <span>Bangsar-based</span>
              </div>
            </motion.div>

            <div className="relative">
              <div className="relative z-10 grid grid-cols-2 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop" className="rounded-[40px] shadow-heavy" alt="Bakery Process" />
                  <div className="bg-bakery-accent p-10 rounded-[40px] text-center shadow-xl transform hover:scale-105 transition-transform">
                    <p className="text-4xl font-display font-black text-white mb-1">100%</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">Homemade</p>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6 pt-16"
                >
                  <div className="bg-bakery-tan p-10 rounded-[40px] text-center shadow-xl transform hover:scale-105 transition-transform">
                    <p className="text-3xl font-display font-black text-bakery-chocolate mb-1 leading-none">Bangsar</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bakery-chocolate/50 pt-2">Based locally</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop" className="rounded-[40px] shadow-heavy" alt="Freshly Baked" />
                </motion.div>
              </div>
              
              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-bakery-ribbon/50 blur-[120px] -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* --- How It Works --- */}
      <section id="how-it-works" className="py-32 bg-bakery-soft">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Cara Nikmati</h2>
            <p className="text-bakery-chocolate/60">Follow these simple steps for the best experience.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {STEPS.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="bg-white p-10 rounded-[40px] shadow-sm border border-bakery-tan h-full flex flex-col items-center text-center group-hover:shadow-xl transition-all">
                  <span className="absolute top-6 left-6 text-5xl font-display font-black text-bakery-tan/30">{step.number}</span>
                  <div className="w-20 h-20 bg-bakery-beige rounded-full flex items-center justify-center text-bakery-brown mb-8 text-3xl group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-sm text-bakery-chocolate/60 leading-relaxed">{step.desc}</p>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10 text-bakery-tan">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Menu / Packages --- */}
      <section className="py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Packages & Bulk Orders</h2>
            <p className="text-bakery-chocolate/60">Special sets for every occasion.</p>
          </div>

          <div className="space-y-6">
            {PACKAGES.map((pkg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center justify-between p-8 rounded-[40px] border transition-all ${pkg.bestDeal ? 'bg-bakery-accent text-white border-bakery-chocolate shadow-xl' : 'bg-white border-bakery-tan hover:border-bakery-accent shadow-sm'}`}
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pkg.bestDeal ? 'bg-white text-bakery-accent' : 'bg-bakery-ribbon text-bakery-accent shadow-sm'}`}>
                    {pkg.icon}
                  </div>
                  <div className="text-left">
                    <h3 className={`text-xl font-bold flex items-center gap-2 ${pkg.bestDeal ? 'text-white' : 'text-bakery-chocolate'}`}>
                       {pkg.name} {pkg.bestDeal && <span className="text-[10px] bg-white text-bakery-accent px-2 py-0.5 rounded-full uppercase tracking-widest font-black ring-1 ring-bakery-accent/10">Best Deal</span>}
                    </h3>
                    <p className={`text-sm font-semibold ${pkg.bestDeal ? 'text-white/90' : 'text-bakery-chocolate/70'}`}>{pkg.quantity}</p>
                    {pkg.description && <p className={`text-xs mt-1 font-medium max-w-xs ${pkg.bestDeal ? 'text-white/80' : 'text-bakery-chocolate/50'}`}>{pkg.description}</p>}
                    {pkg.note && <p className={`text-xs mt-1 font-bold italic ${pkg.bestDeal ? 'text-white' : 'text-bakery-accent'}`}>{pkg.note}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className={`text-2xl font-black ${pkg.bestDeal ? 'text-white' : 'text-bakery-chocolate'}`}>RM{pkg.price}</div>
                  <a 
                    href="#order" 
                    className={`px-8 py-2.5 rounded-full font-bold transition-all ${pkg.bestDeal ? 'bg-white text-bakery-accent hover:bg-bakery-ribbon' : 'bg-bakery-accent text-white hover:bg-bakery-chocolate shadow-lg shadow-bakery-accent/20'}`}
                  >
                    Select
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm font-bold text-bakery-accent bg-bakery-ribbon inline-block px-6 py-2 rounded-full border border-bakery-accent/10 shadow-sm">
              ✨ Mix flavour available for baked croissant boxes only.
            </p>
          </div>
        </div>
      </section>

      {/* --- Delivery & Order --- */}
      <section id="order" className="py-32 bg-bakery-beige/50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          
          {/* Info Card */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Delivery info</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-bakery-tan shadow-sm">
                  <div className="w-12 h-12 bg-bakery-tan/30 rounded-2xl flex items-center justify-center text-bakery-brown flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-bakery-chocolate/70 font-semibold text-bakery-accent border border-bakery-accent/20 rounded-lg p-2 bg-bakery-accent/5">Pre-order 3 days before</p>
                    <p className="text-sm text-bakery-chocolate/70">Order earlier to ensure freshly baked batches.</p>
                  </div>
                </div>
                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-bakery-tan shadow-sm">
                  <div className="w-12 h-12 bg-bakery-tan/30 rounded-2xl flex items-center justify-center text-bakery-accent flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Based in Bangsar</p>
                    <p className="text-sm text-bakery-chocolate/70">Delivery around Klang Valley area.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-bakery-chocolate text-white rounded-[40px] shadow-2xl relative overflow-hidden border-2 border-white/5">
               <div className="relative z-10 space-y-6">
                  <div>
                    <h3 className="text-2xl font-display font-bold mb-4 text-white">Storage & Reheating</h3>
                    <div className="space-y-4">
                      <p className="font-black text-white text-xl flex items-center gap-2">
                        <Star className="w-5 h-5 fill-white" /> Best enjoyed same day.
                      </p>
                      <div className="text-white font-bold bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm leading-relaxed">
                        Reheat <span className="text-bakery-tan underline">3–5 min</span> in oven/airfryer for the perfect crispier texture.
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-display font-bold mb-4 text-white">Event & Custom Orders</h3>
                    <p className="mb-6 text-white/90 font-semibold leading-relaxed">
                      Plan your <span className="text-bakery-tan">Majlis Kecil</span>, office potluck, or meeting treats with us. Custom packaging available for bulk orders!
                    </p>
                    <div className="flex gap-4">
                      <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors shadow-lg shadow-black/20"><Instagram /></a>
                      <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors shadow-lg shadow-black/20"><Facebook /></a>
                    </div>
                  </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-bakery-accent/20 rounded-full blur-[100px]" />
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white p-10 md:p-12 rounded-[50px] shadow-2xl shadow-bakery-brown/10 border-2 border-bakery-accent/10">
            <div className="mb-10">
              <div className="inline-block px-4 py-1 bg-bakery-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                ⚠️ Pre-order 3 days before
              </div>
              <h3 className="text-3xl font-display font-bold mb-2">Order via WhatsApp</h3>
              <p className="text-bakery-chocolate/60">Fill in the details below to start your order. Based in Bangsar.</p>
            </div>

            <form onSubmit={handleWhatsAppOrder} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-bakery-chocolate/40 px-1">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Saisyah Zainal"
                  className="w-full px-6 py-4 rounded-2xl bg-bakery-cream border border-bakery-tan focus:outline-none focus:ring-2 focus:ring-bakery-accent/20 focus:border-bakery-accent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-bakery-chocolate/40 px-1">Quantity / Package</label>
                <input 
                  type="text" 
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. 1 DIY Set + 1 Classic"
                  className="w-full px-6 py-4 rounded-2xl bg-bakery-cream border border-bakery-tan focus:outline-none focus:ring-2 focus:ring-bakery-accent/20 focus:border-bakery-accent transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-bakery-chocolate/40 px-1">Target Date</label>
                  <input 
                    type="text" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    placeholder="DD/MM/YYYY"
                    className="w-full px-6 py-4 rounded-2xl bg-bakery-cream border border-bakery-tan focus:outline-none focus:ring-2 focus:ring-bakery-accent/20 focus:border-bakery-accent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-bakery-chocolate/40 px-1">Location</label>
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Bangsar South"
                    className="w-full px-6 py-4 rounded-2xl bg-bakery-cream border border-bakery-tan focus:outline-none focus:ring-2 focus:ring-bakery-accent/20 focus:border-bakery-accent transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="whatsapp-btn mt-4"
              >
                <MessageCircle className="w-6 h-6" />
                Order via WhatsApp
              </button>
              
              <p className="text-center text-xs text-bakery-chocolate/40 pt-4">
                Clicking above will open WhatsApp with your order details pre-filled.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-bakery-cream pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center pb-20 border-b border-bakery-tan">
             <div className="mb-12 md:mb-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <img src="https://raw.githubusercontent.com/aisyahz/Croissant-Order/main/public/logo-tepico.png" alt="TEPI.CO" className="h-12 w-auto bg-white/50 rounded-lg p-1" />
                  <span className="text-3xl font-display font-black tracking-widest text-bakery-chocolate">TEPI.CO</span>
                </div>
                <p className="max-w-xs text-bakery-chocolate/60">
                   Premium mini croissants for your everyday happiness. 
                   Homemade in Bangsar with love.
                </p>
             </div>
             
             <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-center md:text-left">
                <div>
                   <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Shop</h4>
                   <ul className="space-y-3 font-medium">
                      <li><a href="#menu" className="hover:text-bakery-accent">Menu</a></li>
                      <li><a href="#order" className="hover:text-bakery-accent">Order</a></li>
                      <li><a href="#" className="hover:text-bakery-accent">Gifting</a></li>
                   </ul>
                </div>
                <div>
                   <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Support</h4>
                   <ul className="space-y-3 font-medium">
                      <li><a href="#" className="hover:text-bakery-accent">Delivery Info</a></li>
                      <li><a href="#" className="hover:text-bakery-accent">Terms</a></li>
                      <li><a href="#" className="hover:text-bakery-accent">Privacy</a></li>
                   </ul>
                </div>
                <div className="col-span-2 sm:col-span-1">
                   <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Social</h4>
                   <div className="flex justify-center md:justify-start gap-4">
                     <a href="#" className="p-2 border border-bakery-tan rounded-lg hover:bg-bakery-beige transition-colors"><Instagram className="w-5 h-5"/></a>
                     <a href="#" className="p-2 border border-bakery-tan rounded-lg hover:bg-bakery-beige transition-colors"><Facebook className="w-5 h-5"/></a>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-bakery-chocolate/40 font-medium tracking-wide text-center">
             <p>© 2026 TEPI.CO BAKERY • MALAYSIA</p>
             <div className="flex gap-8">
                <p>Made with Love in Bangsar</p>
                <p>Drizzle sendiri, tak soggy! 🥐</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
