# Quick Start Guide

## Installation (3 Steps)

### 1. Clone Repository
```bash
git clone <your-github-url>
cd <your-project-folder>
```

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run Development Server
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## What You'll See

Your landing page now features a modern two-column layout:

### Left Side - Marketing Content
- Bold headline introducing the Sui Ecosystem
- Descriptive tagline about connecting to decentralized apps
- Three feature highlights with icons:
  - Lightning Fast (transaction speeds)
  - Secure & Reliable (security features)
  - Global Access (worldwide community)

### Right Side - Wallet Connection
- Clean card interface with two tabs:
  - **Connect**: For existing Sui wallet users
  - **Create**: Links to Slush wallet creation
- Animated Sui logo
- Responsive design (stacks on mobile)

---

## Requirements

- Node.js 18+ ([download](https://nodejs.org/))
- A modern web browser
- Git ([download](https://git-scm.com/))

---

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Run production build |
| `npm run lint` | Check code quality |

---

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Modern styling
- **Radix UI** - Accessible components
- **Simplex Noise** - Animated background

---

## Troubleshooting

**Port already in use?**
```bash
npm run dev -- -p 3001
```

**Installation issues?**
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**Still having issues?**
Check SETUP_INSTRUCTIONS.txt for detailed help.
