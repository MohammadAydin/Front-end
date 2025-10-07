# Woundwann - Healthcare Staffing Platform

## About Woundwann

Woundwann is a comprehensive healthcare staffing platform that connects nursing homes with qualified caregivers. Our mission is to bridge the gap between healthcare facilities and skilled professionals, ensuring quality care when and where it's needed most.

## Features

- **For Nursing Homes**: Find qualified caregivers quickly and efficiently
- **For Caregivers**: Discover flexible work opportunities in healthcare
- **Real-time Matching**: Connect facilities with available staff instantly
- **Mobile App**: Available on iOS and Android for on-the-go management
- **Multi-language Support**: German and English interfaces
- **24/7 Availability**: Round-the-clock support for urgent staffing needs

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Woundwann-landing
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technology Stack

This project is built with modern web technologies:

- **Vite** - Fast build tool and development server
- **React** - UI library with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **shadcn/ui** - Re-usable component library
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Hero.tsx        # Landing page hero section
│   ├── Navigation.tsx  # Main navigation
│   ├── Benefits.tsx    # Benefits section
│   ├── Testimonials.tsx # Customer testimonials
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer section
├── contexts/           # React contexts
│   └── LanguageContext.tsx # Internationalization
├── pages/              # Page components
├── assets/             # Static assets
└── lib/                # Utility functions
```

## Deployment

The project can be deployed to any static hosting service:

- **Vercel**: Connect your GitHub repository
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for deployment

## Contact

- **Email**: info@woundwann.de
- **Phone**: +49 15560 600555
- **Address**: Haagstr.25, 61169 Friedberg, Deutschland

## License

© 2025 Woundwann. All rights reserved.

---

**Wo & Wann Sie Personal brauchen** - Where & When You Need Staff