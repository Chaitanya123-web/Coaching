# 🎓 The Indofrench IAS — E-Learning Infrastructure & Merchant Hub

> A full-stack, production-ready e-learning platform built for **The Indofrench IAS Academy** — offering premium IAS/UPSC preparation courses with video lectures, doubt resolution, and integrated payments.

🌐 **Live Site:** [theindofrenchias.com](https://theindofrenchias.com)

---

## 📌 About The Project

The Indofrench IAS is a **premium online learning platform** tailored for civil services aspirants. It provides structured courses, expert-led video lectures, a merchant/shop hub, and a doubt resolution system — all under one roof.

This repository contains the complete **frontend + backend monorepo** powering the platform.

---

## ✨ Features

### 👨‍🎓 Student / User Side
- 🔐 Secure **JWT-based authentication** (register, login, logout)
- 📚 Browse and enroll in **IAS/UPSC courses**
- 🎥 Access **video lectures** after enrollment
- ❓ **Doubt submission and resolution** system
- 🛒 **Shop / Merchant Hub** for study materials and resources
- 💳 **Razorpay payment integration** for course purchases
- 📧 Email notifications via **Nodemailer / Resend**
- 📱 Fully **responsive UI** (mobile + desktop)

### 🛠️ Admin / Instructor Side
- 📤 Upload and manage course content with **Cloudinary** (images & videos)
- 🧑‍💼 Manage enrolled students
- 📦 Manage shop products
- 💬 Respond to student doubts

---

## 🧱 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| MUI (Material UI) | Component library |
| Axios | HTTP client |
| Vite | Build tool & dev server |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| JWT (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| Multer + Cloudinary | File/media uploads |
| Razorpay | Payment gateway |
| Nodemailer / Resend | Email services |
| dotenv | Environment config |
| CORS | Cross-origin handling |

---

## 📁 Project Structure

```
E-Learning-Infrastructure-and-Merchant-Hub/
├── public/                  # Static assets
├── server/                  # Express backend
│   └── index.js             # Server entry point
├── src/                     # React frontend
│   ├── components/          # Reusable UI components
│   ├── pages/               # Route-level pages
│   ├── context/             # React context (auth, etc.)
│   └── ...
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── package.json
└── .env                     # Environment variables (not committed)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v20.x` (see `.nvmrc`)
- **MongoDB** (local or Atlas)
- **Cloudinary** account
- **Razorpay** account
- **Resend** or SMTP credentials for email

### Installation

```bash
# Clone the repository
git clone https://github.com/Chaitanya123-web/E-Learning-Infrastructure-and-Merchant-Hub.git

# Navigate into the project
cd E-Learning-Infrastructure-and-Merchant-Hub

# Install dependencies (also builds frontend via postinstall)
npm install
```

### Running the App

```bash
# Run frontend (dev mode)
npm run dev

# Run backend server
npm run server

# Build frontend for production
npm run build

# Start production server
npm start
```

---

## 🔗 API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |
| GET | `/api/courses` | Fetch all courses |
| POST | `/api/courses` | Create a course (admin) |
| GET | `/api/courses/:id` | Get course details |
| POST | `/api/payment/order` | Create Razorpay order |
| POST | `/api/payment/verify` | Verify payment |
| GET | `/api/shop` | Get shop products |
| POST | `/api/doubts` | Submit a doubt |
| GET | `/api/doubts` | Get all doubts (admin) |

---

## 💳 Payment Flow

1. User selects a course and clicks **Enroll**
2. Backend creates a **Razorpay order**
3. Frontend opens the **Razorpay payment modal**
4. On success, payment is **verified server-side**
5. User is granted **course access** automatically
6. Confirmation **email is sent** via Resend/Nodemailer

---

## ☁️ Deployment

The platform is deployed and live at **[theindofrenchias.com](https://theindofrenchias.com)**.

- Frontend is built via `vite build` and served by the Express server
- Media assets are hosted on **Cloudinary**
- Database is hosted on **MongoDB Atlas**

---

## 🤝 Contributing

This is a private commercial project. For bug reports or suggestions, please contact the maintainer directly.

---

## 📄 License

This project is proprietary and not open for redistribution. All rights reserved © The Indofrench IAS Academy.

---

## 📬 Contact

**The Indofrench IAS Academy**
- 🌐 Website: [theindofrenchias.com](https://theindofrenchias.com)
- 📺 YouTube: [@Theindofrenchias](https://youtube.com/@Theindofrenchias)
