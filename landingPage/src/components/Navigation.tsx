import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Clock, Shield, Users, Globe, ChevronDown, Heart, Building2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoHorizontal from '@/assets/logo-horizontal.png';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [getStartedDropdownOpen, setGetStartedDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: '#about', label: t('nav.about') },
    { href: '#how-it-works', label: t('nav.howItWorks') },
    { href: '#benefits', label: t('nav.benefits') },
    { href: '#testimonials', label: t('nav.testimonials') },
    { href: '#faq', label: t('nav.faq') },
    { href: '#contact', label: t('nav.contact') }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleLanguage = () => {
    if (language === 'de') {
      setLanguage('en');
    } else if (language === 'en') {
      setLanguage('tr');
    } else {
      setLanguage('de');
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setGetStartedDropdownOpen(false);
    };

    if (getStartedDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [getStartedDropdownOpen]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full bg-background/80 bg-blur-glass border-b border-border z-50"
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              src={logoHorizontal}
              alt={t('alt.logo')}
              className="h-10 lg:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-foreground hover:text-primary font-medium transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </motion.a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors duration-300"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </motion.button>

            {/* Get Started Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setGetStartedDropdownOpen(!getStartedDropdownOpen);
                }}
                className="btn-hero text-sm flex items-center space-x-1"
              >
                <span>{t('nav.getStarted')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${getStartedDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {getStartedDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lifted z-50"
                  >
                    <div className="py-2">
                      <a
                        href="https://user.woundwann.de/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-muted transition-colors duration-200"
                        onClick={() => setGetStartedDropdownOpen(false)}
                      >
                        <Heart className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium">{t('nav.getStartedDropdown.caregiver')}</span>
                      </a>
                      <a
                        href="https://employer.woundwann.de/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-muted transition-colors duration-200"
                        onClick={() => setGetStartedDropdownOpen(false)}
                      >
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{t('nav.getStartedDropdown.facility')}</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg border border-border hover:bg-muted transition-colors duration-300"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container-wide py-6">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-primary font-medium py-2 transition-colors duration-300"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="pt-4 space-y-3">
                  {/* Mobile Language Toggle */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    onClick={toggleLanguage}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors duration-300"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">{language.toUpperCase()}</span>
                  </motion.button>

                  {/* Mobile Get Started Options */}
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    href="https://user.woundwann.de/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="btn-ghost w-full text-sm flex items-center justify-center space-x-2"
                  >
                    <Heart className="w-4 h-4 text-accent" />
                    <span>{t('nav.getStartedDropdown.caregiver')}</span>
                  </motion.a>
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    href="https://employer.woundwann.de/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="btn-hero w-full text-sm flex items-center justify-center space-x-2"
                  >
                    <Building2 className="w-4 h-4 text-white" />
                    <span>{t('nav.getStartedDropdown.facility')}</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navigation;