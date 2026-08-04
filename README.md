# Dashboard Keuangan — versi Next.js

Konversi dari https://github.com/yafigian3-hue/dashboard-keuangan-vanilla,
logic-nya sama, cuma cara "menampilkannya" yang berubah dari manipulasi DOM
manual menjadi React/Next.js.

## Cara jalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Peta konversi (baca ini untuk belajar Next.js dari project kamu sendiri)

| Vanilla (asli)                          | Next.js (project ini)              | Konsep Next.js yang dipelajari |
|------------------------------------------|-------------------------------------|----------------------------------|
| `index.html`                             | `app/page.js`                       | routing: nama folder/file = URL |
| `dashboard.html`                         | `app/dashboard/page.js`             | nested route `/dashboard` |
| `transaksi.html`                         | `app/transaksi/page.js`             | nested route `/transaksi` |
| `<script src="js/...">` di tiap HTML     | `app/layout.js`                     | layout dipakai bareng semua halaman |
| `js/storage.js`, `js/format.js`          | `lib/storage.js`, `lib/format.js`   | logic murni, HAMPIR TIDAK BERUBAH |
| `js/auth.js` (cek localStorage + redirect) | `lib/useAuth.js` (`useRequireAuth`) | custom hook + `useRouter` |
| toggle dark mode manual                  | `lib/useTheme.js`                   | state + `useEffect` sinkron ke DOM |
| `loadTransactions()` + render manual     | `lib/useTransactions.js`            | state sebagai "sumber kebenaran", render otomatis |
| `document.createElement("li")...`        | `components/TransactionList.js`     | `.map()` jadi JSX, bukan innerHTML |
| sidebar di-copy paste di 3 file HTML     | `components/AppShell.js`            | komponen dipakai ulang |
| `elements.categoryInput.value`           | `components/TransactionForm.js`     | controlled input (`useState`) |
| `financeChart.destroy()` manual          | `components/FinanceChart.js`        | cleanup function di `useEffect` |

## Yang sengaja disederhanakan

- `export.html` di project asli tidak dikonversi karena isinya cuma
  template sidebar kosong, belum ada logic export sungguhan.
- Beberapa ikon SVG detail diganti simbol/emoji sederhana supaya kode
  lebih mudah dibaca saat belajar — silakan ganti dengan `lucide-react`
  kalau mau tampilan persis seperti aslinya.

## Langkah belajar yang disarankan

1. Jalankan project ini dulu, bandingkan dengan versi vanilla-nya.
2. Baca `lib/useTransactions.js` — ini jantung dari "kenapa React lebih
   gampang" dibanding manipulasi DOM manual.
3. Coba ubah satu komponen kecil dulu, misalnya `SummaryCards.js`.
4. Baru masuk ke `app/dashboard/page.js` untuk lihat bagaimana semuanya
   disatukan.
