# CyberShield

A region-aware web platform that aggregates cybercrime helplines, reporting portals, advisories, and guidance for users globally, featuring an integrated AI Chatbot for 24/7 assistance.

## 🛠️ Tech Stack & Libraries

### Frontend
- **Framework:** React 18, Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS, `class-variance-authority`, `tailwind-merge`
- **UI & Animations:** `framer-motion`, `@radix-ui/react-*`, `tailwindcss-animate`, Lucide Icons
- **State & Data Management:** React Router (`react-router-dom`), TanStack Query (`@tanstack/react-query`)
- **Data Visualization & 3D:** Recharts, Leaflet (`react-leaflet`), `react-globe.gl`, Spline (`@splinetool/react-spline`)
- **Other:** Axios (API requests), Sonner (Toast notifications), `next-themes` (Dark/Light mode support)

### Backend
- **Framework:** Flask (Python)
- **Database:** SQLite with SQLAlchemy ORM
- **Authentication & Security:** Flask-CORS
- **Web Scraping:** BeautifulSoup4, Requests
- **Task Scheduling:** APScheduler (for periodic advisory/article ingestion)

---

## 🔄 Project Workflow

This project is structured as a full-stack application where the React frontend communicates with the Flask backend.

1. **User Entry (Landing Page):** Users arrive at a beautifully animated, gradient-rich landing page highlighting enterprise-grade insights, verified helplines, and a region-aware intelligence platform.
2. **Region Selection:** Using the global `CountrySelector` in the Navbar, users can set their physical context (e.g., India, Ireland) which subsequently filters the resources shown to them globally.
3. **Exploration & Education:** Users can browse through specific verified cyber safety Guides, read recent cybersecurity Articles fetched from actual news sources, or consult the Dashboard for live threat visualizations.
4. **Action & Reporting:** The Resources page provides direct routing to official government portals and emergency phone numbers for immediate action.
5. **AI Assistance:** A floating CyberShield AI bot (`ChatbotWidget.tsx`) is available on all pages to answer real-time cyber queries securely by fetching data from the Flask backend.

---

## 🧩 Key Components & Pages

### Pages
- **`Home.tsx`**: The main landing page. Highlights key platform features, displays the 'Enterprise-Grade Insights' benefits, partner directories, and immediate call-to-action buttons.
- **`Articles.tsx`**: A news-feed style page that displays scraped, real-world cybersecurity news articles from the backend API. Supports filtering by region.
- **`Dashboard.tsx`**: An interactive, data-heavy dashboard showing regional threat matrices, active exploits via a globe or map view, and statistical charts (Recharts).
- **`Guides.tsx`**: A library of specific, actionable Cyber Safety Guides (e.g., "Avoid Fake Job Scams", "Identify Phishing Emails").
- **`GuideDetail.tsx`**: A dedicated, document-style page detailing the steps, troubleshooting, and official resources for a single guide.
- **`Resources.tsx`**: A directory showcasing official reporting portals and emergency contact numbers based on the selected region.
- **Legal Pages (`PrivacyPolicy.tsx`, `TermsAndConditions.tsx`, `GuidelinesPage.tsx`)**: Static informational pages formatted with custom copper-gradient typography.

### Core Components
- **`Navbar.tsx` & `Footer.tsx`**: Global layout components. The Navbar houses routing links and the `CountrySelector`. The Footer houses legal links and copyright information.
- **`ChatbotWidget.tsx`**: A globally floating, animated AI chat interface allowing users to query the backend LLM endpoints contextually.
- **`CountrySelector.tsx`**: A dropdown allowing users to change global context (driving fetching behavior across components).
- **`ResourceCard.tsx` & `StatsCard.tsx`**: Reusable UI cards styled with the custom `.cyber-card` CSS logic for consistency.
- **`DashboardComponents.tsx`**: Contains the complex Recharts components (`ThreatLevelGauge`, `CybercrimeTrendsChart`) used on the Dashboard view.
