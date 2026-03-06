# YP Gurukul 🎓

A premium, high-performance coaching institute web application designed for lead generation, student management, and academic excellence. 

This repository contains the complete source code for the YP Gurukul platform, featuring a modern public marketing site and a secure, feature-rich student portal.

## 🌟 Key Features

### Public Marketing Site
*   **Modern UI/UX:** Built with a premium "Trust Blue" and "Gold" color palette, leveraging Tailwind CSS for responsive design.
*   **Smooth Animations:** Integrated Framer Motion for elegant scroll reveals, layout transitions, and micro-interactions.
*   **Course Catalog:** Dynamic routing to explore detailed course syllabi, fee structures, and batch timings.
*   **Career & Contact Portals:** Forms for general inquiries and career applications (with resume upload support).
*   **Performance Optimized:** Next.js Server Components and Image caching ensure rapid page loads and excellent SEO.

### Secure Student Portal
*   **Role-Based Access Control:** Distinct experiences for Students, Teachers, and Administrators.
*   **Personalized Dashboard:** Overview of attendance, upcoming milestones, and announcements.
*   **Study Materials:** Organized, downloadable PDFs and resources linked to enrolled courses.
*   **Performance Analytics:** Visual tracking of test scores, batch rankings, and subject-wise proficiency.

## 🛠️ Tech Stack

This project uses a decoupled Monorepo-style structure, separating the frontend and backend for optimal scalability.

### Frontend
*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/) / React Icons
*   **State Management:** Zustand (Planned)

### Backend
*   **Runtime:** Node.js
*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** PostgreSQL
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development.

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn
*   PostgreSQL database (local or cloud-hosted like Neon/Supabase)

### 1. Clone the repository
```bash
git clone <repository-url>
cd gurukul
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `backend/` root:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/ypgurukul?schema=public"
JWT_SECRET="your_super_secret_jwt_key"
```

**Database Initialization:**
Push the Prisma schema to your database and generate the client:
```bash
npx prisma db push
npx prisma generate
```

**Run the Backend Server:**
```bash
npm run dev
```
*The server will start on `http://localhost:5000`.*

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

**Run the Frontend Development Server:**
```bash
npm run dev
```
*The application will be accessible at `http://localhost:3000`.*

---

## 📁 Project Structure

```text
gurukul/
├── backend/                  # Node.js + Express API
│   ├── prisma/               # Database schema and migrations
│   └── src/
│       ├── controllers/      # Route logic (auth, public, portal, admin)
│       ├── middleware/       # JWT verification & role checks
│       ├── routes/           # Express route definitions
│       └── index.ts          # Server entry point
│
└── frontend/                 # Next.js Application
    ├── public/               # Static assets
    └── src/
        ├── app/              # Next.js App Router (pages & layouts)
        │   ├── (public)/     # Marketing pages (Home, About, Courses)
        │   └── portal/       # Secure student dashboard pages
        └── components/       # Reusable UI components
            ├── animations/   # Framer Motion utilities
            ├── global/       # UI Library (Buttons, Cards, Inputs)
            ├── home/         # Homepage-specific sections
            └── portal/       # Portal-specific UI
```

---

## 🗺️ API Endpoints Summary

**Authentication:**
*   `POST /api/v1/auth/register`
*   `POST /api/v1/auth/login`

**Public:**
*   `GET /api/v1/public/courses`
*   `POST /api/v1/public/inquiries`

**Student Portal (Requires JWT):**
*   `GET /api/v1/portal/me`
*   `GET /api/v1/portal/materials`
*   `GET /api/v1/portal/tests`

**Admin (Requires JWT + Admin Role):**
*   `POST /api/v1/admin/courses`
*   `POST /api/v1/admin/materials`
*   `POST /api/v1/admin/tests`

---

## 🔮 Roadmap / Next Steps

- [ ] **State Management:** Integrate Zustand in the frontend to handle user sessions and portal data.
- [ ] **API Integration:** Connect the newly built React frontend forms to the live Express API backend.
- [ ] **Admin Panel UI:** Construct the administrative interfaces for course and material management.
- [ ] **File Uploads:** Implement Multer mapping and AWS S3/Cloudflare R2 integration for resumes and study materials.
- [ ] **Deployment:** Configure Vercel (Frontend) and Render (Backend) CI/CD pipelines.

---
*Developed for YP Gurukul with ❤️*
