// Ini persis logic dari js/storage.js aslinya, cuma ditambah `export`.
// localStorage cuma ada di browser, jadi fungsi ini hanya boleh dipanggil
// dari dalam useEffect / event handler di client component ("use client").

const KEY = "transactions";

export function loadTransactions() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveTransactions(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}
