import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileText, Shield, Clock, Users, Mail, MapPin, Search, X, ChevronDown, HelpCircle, BookOpen, Lock, CheckCircle } from 'lucide-react';

const FAQ = () => {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [openItems, setOpenItems] = useState<string[]>([]);

    const faqItems = [
        {
            id: 'documents-required',
            question: t('faq.documentsRequired.question'),
            answer: t('faq.documentsRequired.answer'),
            icon: FileText,
            category: 'documents',
            color: 'primary'
        },
        {
            id: 'why-documents',
            question: t('faq.whyDocuments.question'),
            answer: t('faq.whyDocuments.answer'),
            icon: Shield,
            category: 'legal',
            color: 'success'
        },
        {
            id: 'data-protection',
            question: t('faq.dataProtection.question'),
            answer: t('faq.dataProtection.answer'),
            icon: Lock,
            category: 'privacy',
            color: 'accent'
        },
        {
            id: 'storage-duration',
            question: t('faq.storageDuration.question'),
            answer: t('faq.storageDuration.answer'),
            icon: Clock,
            category: 'privacy',
            color: 'accent'
        },
        {
            id: 'your-rights',
            question: t('faq.yourRights.question'),
            answer: t('faq.yourRights.answer'),
            icon: Users,
            category: 'rights',
            color: 'success'
        },
        {
            id: 'contact-person',
            question: t('faq.contactPerson.question'),
            answer: t('faq.contactPerson.answer'),
            icon: Mail,
            category: 'contact',
            color: 'primary'
        }
    ];

    const categories = [
        { id: 'all', label: t('faq.categories.all'), icon: HelpCircle, count: faqItems.length, color: 'primary' },
        { id: 'documents', label: t('faq.categories.documents'), icon: FileText, count: faqItems.filter(item => item.category === 'documents').length, color: 'primary' },
        { id: 'legal', label: t('faq.categories.legal'), icon: Shield, count: faqItems.filter(item => item.category === 'legal').length, color: 'success' },
        { id: 'privacy', label: t('faq.categories.privacy'), icon: Lock, count: faqItems.filter(item => item.category === 'privacy').length, color: 'accent' },
        { id: 'rights', label: t('faq.categories.rights'), icon: Users, count: faqItems.filter(item => item.category === 'rights').length, color: 'success' },
        { id: 'contact', label: t('faq.categories.contact'), icon: Mail, count: faqItems.filter(item => item.category === 'contact').length, color: 'primary' }
    ];

    const filteredItems = faqItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = searchQuery === '' ||
            item.question.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleItem = (itemId: string) => {
        setOpenItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const isOpen = (itemId: string) => openItems.includes(itemId);

    const getColorClasses = (color: string) => {
        switch (color) {
            case 'primary':
                return {
                    bg: 'bg-gradient-primary',
                    text: 'text-primary',
                    border: 'border-primary/20',
                    light: 'bg-primary/10',
                    hover: 'hover:border-primary/30'
                };
            case 'success':
                return {
                    bg: 'bg-gradient-success',
                    text: 'text-success',
                    border: 'border-success/20',
                    light: 'bg-success/10',
                    hover: 'hover:border-success/30'
                };
            case 'accent':
                return {
                    bg: 'bg-gradient-accent',
                    text: 'text-accent',
                    border: 'border-accent/20',
                    light: 'bg-accent/10',
                    hover: 'hover:border-accent/30'
                };
            default:
                return {
                    bg: 'bg-gradient-primary',
                    text: 'text-primary',
                    border: 'border-primary/20',
                    light: 'bg-primary/10',
                    hover: 'hover:border-primary/30'
                };
        }
    };

    return (
        <section id="faq" className="section-padding bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
            {/* Colorful Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-primary rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-accent rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-success rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container-wide relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                    ref={ref}
                >

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-gradient-hero">FAQ</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                        {t('faq.subtitle')}
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder={t('faq.searchPlaceholder')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-12 py-4 text-lg border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300"
                            />
                            {searchQuery && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => {
                        const colors = getColorClasses(category.color);
                        return (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${selectedCategory === category.id
                                    ? `${colors.bg} text-white shadow-lg`
                                    : `bg-card text-muted-foreground hover:bg-muted border-2 border-border ${colors.hover}`
                                    }`}
                            >
                                <div className={`p-1 rounded-md ${selectedCategory === category.id ? 'bg-white/20' : colors.light}`}>
                                    <category.icon className="h-4 w-4" />
                                </div>
                                <span className="font-medium">{category.label}</span>
                                <Badge
                                    variant="secondary"
                                    className={`ml-1 ${selectedCategory === category.id
                                        ? 'bg-white/20 text-white'
                                        : `${colors.light} ${colors.text}`
                                        }`}
                                >
                                    {category.count}
                                </Badge>
                            </Button>
                        );
                    })}
                </motion.div>

                {/* FAQ Accordion */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="space-y-4">
                        {filteredItems.map((item, index) => {
                            const isItemOpen = isOpen(item.id);
                            const colors = getColorClasses(item.color);

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <Card className={`border-2 border-border ${colors.hover} transition-all duration-300 hover:shadow-lg ${isItemOpen ? `${colors.border} shadow-md` : ''
                                        }`}>
                                        <CardContent className="p-0">
                                            <button
                                                onClick={() => toggleItem(item.id)}
                                                className={`w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200 ${isItemOpen ? colors.light : ''
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-3 rounded-lg ${colors.light} ${colors.text} transition-all duration-300 ${isItemOpen ? 'scale-110 shadow-md' : ''
                                                        }`}>
                                                        <item.icon className="h-6 w-6" />
                                                    </div>
                                                    <h3 className={`text-lg font-semibold text-foreground transition-colors duration-300 ${isItemOpen ? colors.text : ''
                                                        }`}>
                                                        {item.question}
                                                    </h3>
                                                </div>
                                                <motion.div
                                                    animate={{ rotate: isItemOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className={`${colors.text}`}
                                                >
                                                    <ChevronDown className="h-5 w-5" />
                                                </motion.div>
                                            </button>

                                            <AnimatePresence>
                                                {isItemOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-6 pb-6 pt-0">
                                                            <div className={`border-t pt-4 ${colors.border}`}>
                                                                <div
                                                                    className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                                                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default FAQ;