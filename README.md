# 🚀 LinkZip

> **Fast. Simple. Powerful.**

LinkZip is a modern URL Shortener built using **React, Vite, Supabase, and Tailwind CSS**. It allows users to securely shorten long URLs, generate QR codes, track clicks, and manage all their links from a personalized dashboard.

---

## ✨ Features

- 🔐 Secure Authentication (Email & Password)
- 👤 User Dashboard
- 🔗 Create Short URLs
- ✏️ Custom Short Links
- 📱 Automatic QR Code Generation
- 📊 Click Analytics
- 🌍 Track Country & City
- 💻 Device Detection (Desktop / Mobile / Tablet)
- 📈 Statistics Dashboard
- 📋 Copy Link with One Click
- ⬇️ Download QR Code
- 🗑️ Delete Links
- 🔍 Search Links
- 🎨 Modern Responsive UI

---

## 🛠 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Shadcn UI
- React Router DOM
- React QR Code Logo
- Lucide React Icons

### Backend
- Supabase Database
- Supabase Authentication
- Supabase Storage

### Validation
- Yup

### Analytics
- UA Parser JS
- IPAPI

---

## 📂 Folder Structure

```
src
├── assets
├── components
├── db
├── hooks
├── layouts
├── lib
├── pages
├── App.jsx
├── context.jsx
└── main.jsx
```

---

## 📸 Screenshots

### Landing Page

_Add Screenshot Here_

### Dashboard

_Add Screenshot Here_

### Analytics

_Add Screenshot Here_

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/linkzip.git
```

Move into the project

```bash
cd linkzip
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL

VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Start the development server

```bash
npm run dev
```

---

## 📦 Build

```bash
npm run build
```

Preview Production Build

```bash
npm run preview
```

---

## 🌐 Deployment

This project can be deployed on:

- Vercel
- Netlify
- Firebase Hosting

---

## 📊 Database

### urls

- id
- title
- original_url
- short_url
- custom_url
- QR
- user_id
- created_at

### clicks

- id
- url_id
- city
- country
- device
- created_at

---

## 🔒 Environment Variables

```env
VITE_SUPABASE_URL=

VITE_SUPABASE_ANON_KEY=
```

---

## 🚀 Future Improvements

- Password Protected Links
- Link Expiration
- Custom Domains
- Edit Existing Links
- Dark / Light Theme
- Bulk URL Shortening
- QR Customization
- Export Analytics
- Admin Dashboard

---

## 👨‍💻 Author

**Aditya Jadhav**

GitHub:
https://github.com/Adityajadhav80100

LinkedIn:
(Add Your LinkedIn Profile)

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the MIT License.