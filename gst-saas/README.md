# GST Pro - GST Compliance SaaS

A modern, production-ready GST compliance management system built for Indian small businesses (textile traders, embroidery units, etc.).

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- 📊 **GST Dashboard** - Monthly summary with Output/Input GST breakdown
- 📄 **Invoice Management** - Upload Excel/PDF invoices with drag-drop
- 📋 **GSTR-1 Reports** - B2B/B2C exports for GST portal
- 📝 **GSTR-3B Reports** - Tax liability computation
- 💰 **ITC Tracking** - Vendor-wise Input Tax Credit breakdown
- 🏢 **Multi-GSTIN** - Support for multiple business registrations
- 🌙 **Dark Mode** - Full theme support
- ✨ **Animations** - Smooth Framer Motion transitions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/gst-saas.git

# Navigate to project
cd gst-saas

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── dashboard/     # Main dashboard
│   │   ├── invoices/      # Invoice management
│   │   ├── gst/           # GST summary
│   │   ├── reports/       # GSTR-1, GSTR-3B, ITC
│   │   ├── organization/  # Business settings
│   │   ├── settings/      # User preferences
│   │   └── help/          # Help center
│   ├── login/             # Authentication
│   ├── signup/            # Registration
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components
│   └── layout/            # Sidebar, Header
└── context/               # Theme, Sidebar contexts
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features & pricing |
| `/login` | User login |
| `/signup` | Multi-step registration |
| `/dashboard` | GST overview dashboard |
| `/invoices` | Invoice listing & management |
| `/invoices/upload` | Upload invoices wizard |
| `/gst` | Monthly GST summary |
| `/reports/gstr1` | GSTR-1 report generation |
| `/reports/gstr3b` | GSTR-3B report generation |
| `/reports/itc` | ITC summary & reconciliation |
| `/organization` | Business details & GSTINs |
| `/settings` | User preferences |
| `/help` | FAQ & support |

## Roadmap

- [ ] Backend API integration (Node.js/Express)
- [ ] n8n workflow integration
- [ ] PostgreSQL database setup
- [ ] JWT authentication
- [ ] Real invoice parsing (Excel/PDF)
- [ ] GST portal JSON export
- [ ] Email notifications

## License

MIT License - feel free to use this for your own projects!

## Author

Built with ❤️ for Indian businesses
