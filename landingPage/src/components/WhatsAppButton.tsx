import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';

const WhatsAppButton = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const phoneNumber = '+4915560600555';
    const whatsappMessage = 'Hallo! Ich interessiere mich für Woundwann und möchte mehr Informationen erhalten.';
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const handleWhatsAppClick = () => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        setIsExpanded(false);
    };

    const handlePhoneClick = () => {
        window.open(`tel:${phoneNumber}`, '_self');
        setIsExpanded(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Expanded Options */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute bottom-20 right-0 space-y-3"
                    >
                        {/* WhatsApp Option */}
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWhatsAppClick}
                            className="bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-2xl shadow-strong hover:shadow-lifted transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-sm">WhatsApp</p>
                                    <p className="text-xs opacity-90">Schnelle Antwort</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Phone Option */}
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePhoneClick}
                            className="bg-primary hover:bg-primary-light text-white px-4 py-3 rounded-2xl shadow-strong hover:shadow-lifted transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="font-semibold text-sm">Anrufen</p>
                                    <p className="text-xs opacity-90">{phoneNumber}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main WhatsApp Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleExpanded}
                className="relative w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-strong hover:shadow-lifted transition-all duration-300 flex items-center justify-center group"
            >
                {/* Pulse Animation */}
                <motion.div
                    className="absolute inset-0 bg-[#25D366] rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Button Content */}
                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        {isExpanded ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-8 h-8 text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="whatsapp"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <MessageCircle className="w-8 h-8 text-white" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Tooltip */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 pointer-events-none"
                >
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    {isExpanded ? 'Schließen' : 'Kontakt'}
                </motion.div>
            </motion.button>

            {/* Floating Notification Badge */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, duration: 0.3 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
            >
                <span className="text-white text-xs font-bold">!</span>
            </motion.div>
        </div>
    );
};

export default WhatsAppButton;
