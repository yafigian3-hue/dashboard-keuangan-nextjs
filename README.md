# 💰 Dashboard Keuangan

Dashboard Keuangan adalah aplikasi pencatatan pemasukan dan pengeluaran yang dibangun menggunakan **Next.js 14**, **React**, **Prisma ORM**, dan **SQLite**. Aplikasi ini membantu pengguna mencatat transaksi, melihat ringkasan keuangan, serta memonitor kondisi keuangan melalui tampilan dashboard yang modern dan responsif.

> Project ini merupakan pengembangan dari versi Vanilla JavaScript yang kemudian dimigrasikan ke Next.js dengan arsitektur yang lebih modern.

---

## ✨ Fitur

- 📊 Dashboard keuangan
- ➕ Menambah transaksi
- ✏️ Mengedit transaksi
- 🗑️ Menghapus transaksi
- 🔍 Mencari transaksi
- 📂 Filter pemasukan & pengeluaran
- 🌙 Dark Mode
- 📈 Statistik pemasukan dan pengeluaran menggunakan Chart.js
- 💾 Penyimpanan data menggunakan SQLite + Prisma ORM
- 📱 Responsive Design

---

## 🛠 Tech Stack

- Next.js 14
- React 18
- Prisma ORM
- SQLite
- Chart.js
- Tailwind CSS

---

## 📁 Struktur Project

```
app/
├── api/
│   └── transactions/
├── dashboard/
├── transaksi/
└── page.js

components/
├── AppShell.js
├── TransactionForm.js
├── TransactionList.js
├── SummaryCards.js
├── FinanceChart.js
└── ExpenseChart.js

lib/
├── prisma.js
├── storage.js
├── useTransactions.js
├── useAuth.js
├── useTheme.js
└── format.js

prisma/
├── schema.prisma
└── migrations/
```

---

## 🚀 Cara Menjalankan Project

### Clone Repository

```bash
git clone https://github.com/yafigian3-hue/dashboard-keuangan-nextjs.git
```

Masuk ke folder project

```bash
cd dashboard-keuangan-nextjs
```

Install dependency

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Jalankan migration

```bash
npx prisma migrate dev
```

Jalankan aplikasi

```bash
npm run dev
```

Buka browser

```
http://localhost:3000
```

---

## 📦 Database

Project ini menggunakan **SQLite** sebagai database dan **Prisma ORM** sebagai Object Relational Mapper.

Model database:

```prisma
model Transaction {
  id        Int      @id @default(autoincrement())
  name      String
  amount    Float
  type      String
  createdAt DateTime @default(now())
}
```

---

## 🔌 REST API

### GET

```
GET /api/transactions
```

Mengambil seluruh transaksi.

### POST

```
POST /api/transactions
```

Menambahkan transaksi baru.

### PUT

```
PUT /api/transactions
```

Mengubah transaksi.

### DELETE

```
DELETE /api/transactions
```

Menghapus transaksi.

---

## 📸 Tampilan

- Dashboard modern
- Ringkasan saldo
- Grafik pemasukan dan pengeluaran
- Riwayat transaksi
- Form tambah/edit transaksi
- Dark Mode
- Responsive Sidebar

---

## 📚 Pembelajaran

Project ini dibuat untuk mempelajari:

- Next.js App Router
- React Hooks
- Component Architecture
- REST API
- Prisma ORM
- SQLite Database
- CRUD Application
- State Management
- Responsive UI
- Tailwind CSS

---

## 🔄 Riwayat Pengembangan

Project ini merupakan versi lanjutan dari:

**Dashboard Keuangan (Vanilla JavaScript)**

https://github.com/yafigian3-hue/dashboard-keuangan-vanilla

Versi Next.js membawa beberapa peningkatan:

- Migrasi dari Local Storage ke SQLite
- Integrasi Prisma ORM
- REST API
- Component-based Architecture
- Modern UI
- Edit transaksi
- Dark Mode
- Responsive Layout

---

## 📄 License

Project ini dibuat untuk keperluan belajar dan pengembangan portfolio.