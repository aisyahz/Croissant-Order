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
    image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=600&auto=format&fit=crop",
    isStar: true,
  },
  {
    id: 1,
    name: "Classic Mini Croissant",
    description: "10 pcs mini croissant (plain, buttery)",
    price: 22,
    items: "10 pcs",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
    isStar: false,
  },
  {
    id: 3,
    name: "Double Chocolate Croissant",
    description: "10 pcs mini croissant + extra chocolate dip",
    price: 32,
    items: "10 pcs",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=600&auto=format&fit=crop",
    isStar: false,
  }
];

const PACKAGES = [
  {
    name: "Frozen Croissant",
    quantity: "10 pcs",
    price: 18,
    icon: <IceCream className="w-5 h-5" />,
  },
  {
    name: "Office Set",
    quantity: "60 pcs (5 boxes)",
    price: 130,
    icon: <Clock className="w-5 h-5" />,
  },
  {
    name: "Big Event Set",
    quantity: "96 pcs (8 boxes)",
    price: 200,
    note: "Include delivery & mix flavour allowed",
    icon: <Truck className="w-5 h-5" />,
    bestDeal: true
  }
];

const FEATURES = [
  { title: "Buttery & Flaky", icon: <Flame className="w-6 h-6" />, desc: "Pure butter perfection" },
  { title: "Premium Chocolate", icon: <Star className="w-6 h-6" />, desc: "High quality drizzle" },
  { title: "Easy to Enjoy", icon: <Zap className="w-6 h-6" />, desc: "Bite-sized happiness" },
  { title: "Made with Love", icon: <Heart className="w-6 h-6" />, desc: "Freshly baked daily" },
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
          <img src="/logo-tepico.png" alt="TEPI.CO" className="h-10 w-auto" />
          <span className="text-2xl font-display font-bold tracking-widest text-bakery-chocolate">TEPI.CO</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {['Menu', 'Features', 'How it Works', 'Order'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(/ /g, '-')}`} 
              className="text-sm font-medium hover:text-bakery-brown transition-colors"
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
            <h1 className="text-6xl md:text-8xl font-display font-semibold leading-[1.1] text-[#2C1E14]">
              Mini Croissant, <br />
              <span className="italic text-bakery-accent underline decoration-bakery-tan underline-offset-12">Freshly Baked</span> <br />
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
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold">Signature Series</h2>
            <p className="text-bakery-chocolate/60 max-w-2xl mx-auto italic">
              Carefully crafted packages for the ultimate croissant experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {SIGNATURE_PRODUCTS.map((product) => (
              <motion.div 
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                className="product-card group flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {product.isStar && (
                    <div className="absolute top-4 right-4 bg-bakery-accent text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                      <Star className="w-3 h-3 fill-white" /> POPULAR
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-bakery-accent transition-colors">{product.name}</h3>
                    <p className="text-bakery-chocolate/60 text-sm leading-relaxed mb-4">{product.description}</p>
                    <p className="text-xs font-bold text-bakery-accent uppercase tracking-wider mb-6">{product.items}</p>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-bakery-tan/10">
                    <div className="text-2xl font-black">RM{product.price}</div>
                    <a href="#order" className="p-3 bg-bakery-cream rounded-full hover:bg-bakery-accent hover:text-white transition-colors">
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
      <section className="py-24 bg-bakery-chocolate text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold">Why Choose Us?</h2>
            <div className="space-y-6">
              {[
                "Freshly baked with premium ingredients every day",
                "Unique DIY drizzle experience for that perfect crunch",
                "Perfectly sized for treats, office, & special events",
                "Premium artisan taste at an affordable price point"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 bg-bakery-accent rounded-full flex items-center justify-center">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                  <p className="text-lg text-white font-bold leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=400&auto=format&fit=crop" className="rounded-2xl transform translate-y-8" alt="Bakery" />
             <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400&auto=format&fit=crop" className="rounded-2xl" alt="Bakery" />
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
                className={`flex flex-col md:flex-row items-center justify-between p-8 rounded-[30px] border transition-all ${pkg.bestDeal ? 'bg-bakery-brown text-white border-bakery-chocolate shadow-xl' : 'bg-white border-bakery-tan hover:border-bakery-brown shadow-sm'}`}
              >
                <div className="flex items-center gap-6 mb-4 md:mb-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${pkg.bestDeal ? 'bg-white text-bakery-brown' : 'bg-bakery-beige text-bakery-brown'}`}>
                    {pkg.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                       {pkg.name} {pkg.bestDeal && <span className="text-[10px] bg-white text-bakery-accent px-2 py-0.5 rounded-full uppercase tracking-widest font-black">Best Deal</span>}
                    </h3>
                    <p className={`text-sm ${pkg.bestDeal ? 'text-white' : 'text-bakery-chocolate/60'}`}>{pkg.quantity}</p>
                    {pkg.note && <p className="text-xs mt-1 italic opacity-100">{pkg.note}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-2xl font-black">RM{pkg.price}</div>
                  <a 
                    href="#order" 
                    className={`px-6 py-2 rounded-full font-bold transition-all ${pkg.bestDeal ? 'bg-white text-bakery-brown hover:bg-bakery-beige' : 'bg-bakery-brown text-white hover:bg-bakery-chocolate'}`}
                  >
                    Select
                  </a>
                </div>
              </motion.div>
            ))}
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

            <div className="p-8 bg-bakery-chocolate text-white rounded-[40px] shadow-lg relative overflow-hidden border border-white/10">
               <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold mb-4 text-white">Storage & Reheating</h3>
                  <div className="space-y-3 mb-8">
                    <p className="font-bold text-white text-lg">✨ Best enjoyed same day.</p>
                    <p className="text-white font-semibold bg-white/10 p-3 rounded-xl border border-white/10">Reheat 3–5 min in oven/airfryer for crispier texture.</p>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-4 text-white">Want something custom?</h3>
                  <p className="mb-6 text-white font-bold leading-relaxed">Reach out to us for events, weddings or bulk office orders. We provide custom packaging and tag designs!</p>
                  <div className="flex gap-4">
                    <a href="https://wa.me/60136648159" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Instagram /></a>
                    <a href="https://wa.me/60136648159" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><Facebook /></a>
                  </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-bakery-brown/20 rounded-full blur-3xl" />
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
                  className="w-full px-6 py-4 rounded-2xl bg-bakery-cream border border-bakery-tan focus:outline-none focus:ring-2 focus:ring-bakery-brown/20 focus:border-bakery-brown transition-all"
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
                  className="w-full px-6 py-4 rounded-2xl bg-bakery-cream border border-bakery-tan focus:outline-none focus:ring-2 focus:ring-bakery-brown/20 focus:border-bakery-brown transition-all"
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
                    className="w-full px-6 py-4 rounded-2xl bg-bakery-cream border border-bakery-tan focus:outline-none focus:ring-2 focus:ring-bakery-brown/20 focus:border-bakery-brown transition-all"
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
                    className="w-full px-6 py-4 rounded-2xl bg-bakery-cream border border-bakery-tan focus:outline-none focus:ring-2 focus:ring-bakery-brown/20 focus:border-bakery-brown transition-all"
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
                  <img src="/logo-tepico.png" alt="TEPI.CO" className="h-12 w-auto bg-white/50 rounded-lg p-1" />
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
                      <li><a href="#menu" className="hover:text-bakery-brown">Menu</a></li>
                      <li><a href="#order" className="hover:text-bakery-brown">Order</a></li>
                      <li><a href="#" className="hover:text-bakery-brown">Gifting</a></li>
                   </ul>
                </div>
                <div>
                   <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Support</h4>
                   <ul className="space-y-3 font-medium">
                      <li><a href="#" className="hover:text-bakery-brown">Delivery Info</a></li>
                      <li><a href="#" className="hover:text-bakery-brown">Terms</a></li>
                      <li><a href="#" className="hover:text-bakery-brown">Privacy</a></li>
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
