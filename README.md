# 🛒 ECOMART — Full Stack AI-Powered E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

> A production-grade, full-stack e-commerce ecosystem featuring AI-driven insights, scalable MERN architecture, and a seamless modern UX.

---

## 🔗 Live Links
- 🌐 **Frontend:** [ecomart-frontend-three.vercel.app](https://ecomart-frontend-three.vercel.app/)
- 🔧 **Backend API:** [ecomart-backend-mu.vercel.app](https://ecomart-backend-mu.vercel.app/)

---

## 📌 Project Overview
**Ecomart** is a robust e-commerce solution designed with real-world production patterns. It bridges the gap between traditional retail and modern AI, utilizing the **Google Gemini API** to enhance user engagement and automate store management.

### 🤖 AI-Powered Capabilities
- **Auto-Content Generation:** Instantly creates professional product descriptions for admins.

---

## 🏗️ System Architecture
The application follows a **decoupled Client-Server** architecture to ensure performance and maintainability:
1. **Frontend:** SSR/SSG optimized SPA built with **Next.js 16**.
2. **Backend:** RESTful API with middleware-based **JWT validation** and RBAC.
3. **Database:** Scalable NoSQL storage using **MongoDB Atlas**.
4. **AI Layer:** Seamless integration with **Google Generative AI** services.

---

## ⚙️ Tech Stack

### Frontend
- **Framework:** Next.js (App Router) & TypeScript
- **State Management:** TanStack Query (React Query)
- **Styling:** Tailwind CSS & DaisyUI
- **Animations:** Framer Motion
- **Icons:** Lucide-React/React-Icons
- **Form validation:** React Hook Form

### Backend
- **Runtime:** Node.js & Express.js
- **Database:** MongoDB & Mongoose
- **Security:** JWT (JSON Web Tokens), bcrypt.js, Cookie-parser

---

## ✨ Key Features

### 🛍️ E-Commerce Core
- **Smart Discovery:** Advanced multi-criteria filtering, instant search, and sorting.
- **Optimized Performance:** Efficient pagination and data caching with React Query.
- **Dynamic UX:** Fully responsive design with smooth layout transitions.

### 🛡️ Security & Roles
- **Auth:** Secure JWT-based authentication using **HTTP-only cookies**.
- **RBAC:** Strictly enforced **User** and **Admin** dashboard permissions.
- **Data Protection:** Password hashing and request payload validation.

### 📊 Admin Intelligence
- **Real-time Analytics:** Visual tracking of total users, revenue, and order trends.
- **Chart Insights:** Interactive data visualization (Bar, Line, and Pie charts).
- **Store Management:** Comprehensive CRUD operations for products and orders.

---

## 🚀 Local Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:jinnahakondo/ecomart-frontend.git
   cd ecomart-frontend
