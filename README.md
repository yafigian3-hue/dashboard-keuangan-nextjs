# 💰 Dashboard Keuangan

Dashboard Keuangan adalah aplikasi pencatatan pemasukan dan pengeluaran yang dibangun menggunakan **Next.js, React, Prisma ORM, PostgreSQL, dan Tailwind CSS**.

Aplikasi ini memungkinkan pengguna untuk membuat akun, mencatat transaksi keuangan, mengelola transaksi, melihat ringkasan kondisi keuangan, serta memantau pemasukan dan pengeluaran melalui dashboard interaktif.

Project ini awalnya dibuat menggunakan **Vanilla JavaScript** dan kemudian dikembangkan serta dimigrasikan ke **Next.js** dengan arsitektur yang lebih modern.

---

## 🌐 Live Demo

🔗 **[Dashboard Keuangan - Live Demo](https://dashboard-keuangan-nextjs-4olejfv8v-yafigian3-1101s-projects.vercel.app/)**

Project ini di-deploy menggunakan **Vercel**.

---

## ✨ Fitur

### 🔐 Authentication

- Register pengguna
- Login pengguna
- Logout
- Authentication menggunakan JWT
- Protected routes
- Session checking
- Setiap pengguna memiliki data transaksi masing-masing

### 📊 Dashboard

- Menampilkan total saldo
- Menampilkan total pemasukan
- Menampilkan total pengeluaran
- Statistik keuangan
- Grafik pemasukan dan pengeluaran menggunakan Chart.js
- Ringkasan transaksi
- Responsive dashboard

### 💳 Manajemen Transaksi

- Menambahkan transaksi
- Mengedit transaksi
- Menghapus transaksi
- Menampilkan daftar transaksi
- Mencari transaksi
- Filter berdasarkan jenis transaksi
- Pemasukan
- Pengeluaran

### 🎨 UI / UX

- Responsive design
- Dark mode
- Loading skeleton
- Protected layout
- Sidebar navigation
- Loading state menggunakan Next.js App Router
- Interactive UI
- Responsive cards dan dashboard

---

## 🛠 Tech Stack

### Frontend

- [Next.js](https://nextjs.org/)
- React
- Tailwind CSS
- Chart.js
- React Chart.js 2

### Backend

- Next.js API Routes
- REST API
- Prisma ORM
- PostgreSQL
- JWT Authentication

### Deployment

- Vercel
- Prisma Postgres

---

## 🏗️ Arsitektur Project

Project menggunakan **Next.js App Router** dengan pemisahan antara halaman, API, components, hooks, dan database layer.

```text
app/
├── api/
│   ├── auth/
│   │   ├── login/
│   │   ├── logout/
│   │   ├── me/
│   │   └── register/
│   │
│   └── transactions/
│
├── (protected)/
│   ├── dashboard/
│   │   ├── loading.js
│   │   └── page.js
│   │
│   ├── transaksi/
│   │   ├── loading.js
│   │   └── page.js
│   │
│   └── layout.js
│
├── register/
├── layout.js
├── page.js
└── manifest.webmanifest

components/
├── AppShell.js
├── SummaryCards.js
├── FinanceChart.js
├── ExpenseChart.js
├── TransactionForm.js
├── TransactionList.js
└── skeletons.js

lib/
├── prisma.js
├── storage.js
├── useAuth.js
├── useTransactions.js
├── useTheme.js
└── format.js

prisma/
├── schema.prisma
└── migrations/

public/
└── ...
```

---

## 🔐 Authentication

Aplikasi menggunakan authentication berbasis **JWT**.

Alur authentication:

```text
Register
   ↓
User dibuat di database
   ↓
Login
   ↓
JWT dibuat
   ↓
JWT disimpan sebagai cookie
   ↓
Protected Route
   ↓
User dapat mengakses Dashboard
```

Protected pages menggunakan layout khusus:

```text
app/(protected)/layout.js
```

Layout tersebut memastikan pengguna telah terautentikasi sebelum dapat mengakses halaman dashboard dan transaksi.

---

## 🗄️ Database

Project menggunakan **PostgreSQL** sebagai database production dan **Prisma ORM** sebagai ORM.

Database digunakan untuk menyimpan:

- User
- Transaction

### User

```prisma
model User {
  id           Int           @id @default(autoincrement())
  name         String
  email        String        @unique
  password     String

  transactions Transaction[]
}
```

### Transaction

```prisma
model Transaction {
  id        Int      @id @default(autoincrement())
  name      String
  amount    Float
  type      String
  createdAt DateTime @default(now())

  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

Relasi database:

```text
User
 │
 └───< Transaction
```

Satu user dapat memiliki banyak transaksi.

---

## 🔌 REST API

Aplikasi menggunakan API Routes dari Next.js untuk menangani komunikasi antara frontend dan database.

### Authentication

#### Register

```http
POST /api/auth/register
```

Membuat akun pengguna baru.

#### Login

```http
POST /api/auth/login
```

Melakukan login dan membuat authentication session.

#### Logout

```http
POST /api/auth/logout
```

Menghapus authentication session.

#### Current User

```http
GET /api/auth/me
```

Mengambil informasi user yang sedang login.

---

### Transactions

#### Get Transactions

```http
GET /api/transactions
```

Mengambil transaksi milik user yang sedang login.

#### Create Transaction

```http
POST /api/transactions
```

Menambahkan transaksi baru.

#### Update Transaction

```http
PUT /api/transactions
```

Mengubah transaksi.

#### Delete Transaction

```http
DELETE /api/transactions
```

Menghapus transaksi.

---

## 🔄 Data Flow

Project menggunakan pemisahan antara UI, API, dan database.

```text
React Component
      ↓
fetch()
      ↓
Next.js API Route
      ↓
Prisma ORM
      ↓
PostgreSQL
      ↓
Prisma
      ↓
API Response
      ↓
React State
      ↓
UI Update
```

Frontend tidak berkomunikasi langsung dengan database. Semua operasi database dilakukan melalui backend/API.

---

## 📈 Dashboard Analytics

Dashboard menggunakan **Chart.js** untuk menampilkan data keuangan secara visual.

Data yang ditampilkan meliputi:

- Pemasukan
- Pengeluaran
- Ringkasan transaksi
- Kondisi saldo

Visualisasi membantu pengguna memahami kondisi keuangan dengan lebih mudah.

---

## ⏳ Loading State

Project menggunakan loading UI dari **Next.js App Router**.

Struktur loading:

```text
app/
└── (protected)/
    ├── dashboard/
    │   ├── loading.js
    │   └── page.js
    │
    └── transaksi/
        ├── loading.js
        └── page.js
```

Loading state menggunakan reusable skeleton component:

```text
components/
└── skeletons.js
```

Komponen tersebut menyediakan beberapa skeleton:

- `SkeletonBlock`
- `SummaryCardsSkeleton`
- `PageHeaderSkeleton`
- `DashboardSkeleton`
- `TransaksiSkeleton`

Skeleton digunakan untuk memberikan feedback visual ketika halaman atau data sedang dimuat.

---

## 🎨 Dark Mode

Aplikasi mendukung:

- Light mode
- Dark mode

Theme dikelola menggunakan custom hook:

```text
lib/useTheme.js
```

---

## 📱 Responsive Design

Dashboard dirancang agar dapat digunakan pada berbagai ukuran layar:

- 📱 Mobile
- 📱 Tablet
- 💻 Desktop

Layout menggunakan Tailwind CSS dengan responsive breakpoint untuk menyesuaikan:

- Sidebar
- Cards
- Form
- Transaction list
- Chart
- Dashboard layout

---

## 🚀 Cara Menjalankan Project

### 1. Clone Repository

```bash
git clone https://github.com/yafigian3-hue/dashboard-keuangan-nextjs.git
```

### 2. Masuk ke folder project

```bash
cd dashboard-keuangan-nextjs
```

### 3. Install dependency

```bash
npm install
```

### 4. Konfigurasi Environment Variable

Buat file:

```text
.env
```

Kemudian masukkan:

```env
DATABASE_URL="your-postgresql-database-url"
JWT_SECRET="your-secret-key"
```

> Jangan commit file `.env` ke repository.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Jalankan migration

```bash
npx prisma migrate dev
```

### 7. Jalankan development server

```bash
npm run dev
```

Kemudian buka:

```text
http://localhost:3000
```

---

## 🏭 Production Build

Sebelum melakukan deployment, project dapat diuji menggunakan:

```bash
npm run build
```

Jika build berhasil, Next.js akan menghasilkan production build.

Untuk menjalankan production build:

```bash
npm start
```

---

## ☁️ Deployment

Project di-deploy menggunakan:

**Vercel**

Database production menggunakan:

**PostgreSQL**

Environment variable yang digunakan pada deployment:

```text
DATABASE_URL
JWT_SECRET
```

Deployment flow:

```text
GitHub
   ↓
Vercel
   ↓
npm install
   ↓
Prisma Generate
   ↓
Next.js Build
   ↓
Production Deployment
```

---

## 🔒 Environment & Security

Environment variable tidak disimpan di repository.

File berikut masuk ke `.gitignore`:

```text
.env
.env.local
```

Database development dan file lokal juga tidak di-upload ke GitHub.

Contoh `.gitignore`:

```gitignore
# dependencies
node_modules/

# next
.next/
out/

# environment
.env
.env.local

# prisma
prisma/dev.db
prisma/dev.db-journal

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# editor
.vscode/
.DS_Store

# local database
dev.db
```

---

## 📚 Pembelajaran

Project ini dibuat sebagai project pembelajaran untuk memahami pengembangan aplikasi web full-stack menggunakan Next.js.

### Frontend

- React Components
- React Hooks
- State Management
- Props
- Client Components
- Server Components
- Conditional Rendering
- Loading State
- Responsive UI
- Tailwind CSS

### Next.js

- App Router
- Layout
- Nested Layout
- Protected Layout
- Loading UI
- API Routes
- Middleware
- Server-side functionality
- Client-side functionality

### Backend

- REST API
- Authentication
- JWT
- Cookie-based authentication
- CRUD
- API validation
- Database relationship

### Database

- PostgreSQL
- Prisma ORM
- Prisma Client
- Prisma Migration
- Database relationships

### Deployment

- Git
- GitHub
- Vercel
- Environment Variables
- Production Build

---

## 🔄 Riwayat Pengembangan

Project ini merupakan pengembangan dari:

**Dashboard Keuangan - Vanilla JavaScript**

Repository:

```text
https://github.com/yafigian3-hue/dashboard-keuangan-vanilla
```

Versi awal menggunakan:

```text
HTML
CSS
JavaScript
LocalStorage
Chart.js
```

Kemudian dikembangkan menjadi aplikasi full-stack menggunakan:

```text
Next.js
React
Prisma
PostgreSQL
REST API
JWT Authentication
Tailwind CSS
```

### Perubahan utama

| Versi Lama | Versi Next.js |
|---|---|
| Vanilla JavaScript | React + Next.js |
| LocalStorage | PostgreSQL |
| DOM Manipulation | React Components |
| Local Data | Database |
| Tidak ada backend | Next.js API |
| Tidak ada authentication server | JWT Authentication |
| Struktur sederhana | App Router Architecture |
| Local development | Production deployment |

---

## 🎯 Tujuan Project

Project ini dibuat sebagai bagian dari proses belajar pengembangan aplikasi web full-stack.

Fokus pengembangan:

```text
JavaScript
    ↓
React
    ↓
Next.js
    ↓
REST API
    ↓
Prisma
    ↓
PostgreSQL
    ↓
Authentication
    ↓
Deployment
```

Project ini juga digunakan sebagai salah satu portfolio untuk menunjukkan kemampuan dalam membangun aplikasi web dari frontend hingga backend dan deployment.

---

## 📸 Tampilan

### Login

Halaman login untuk pengguna yang sudah memiliki akun.

### Register

Halaman untuk membuat akun baru.

### Dashboard

Menampilkan:

- Total saldo
- Pemasukan
- Pengeluaran
- Grafik keuangan
- Ringkasan transaksi

### Transaksi

Menampilkan:

- Daftar transaksi
- Pencarian
- Filter
- Tambah transaksi
- Edit transaksi
- Hapus transaksi

---

## 📄 License

Project ini dibuat untuk keperluan belajar, pengembangan portfolio, dan eksplorasi teknologi web modern.