import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        whileHover={{
                            scale: 1.1,
                            y: -2,
                            boxShadow: "0 10px 30px rgba(248, 112, 12, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToTop}
                        className="w-12 h-12 bg-gradient-to-r from-accent to-accent-light text-white rounded-full shadow-strong hover:shadow-lifted transition-all duration-300 flex items-center justify-center group"
                        aria-label="Scroll to top"
                    >
                        {/* Pulse Animation */}
                        <motion.div
                            className="absolute inset-0 bg-accent rounded-full"
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

                        {/* Icon */}
                        <motion.div
                            className="relative z-10"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ArrowUp className="w-5 h-5" />
                        </motion.div>

                        {/* Tooltip */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="absolute right-full mr-4 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 pointer-events-none"
                        >
                            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                            Scroll to Top
                        </motion.div>

                        {/* Shine Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 rounded-full"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ScrollToTop;
