"use client";

import { useEffect, useState } from "react";
import { loadTransactions, saveTransactions } from "./storage";

// Ini adalah inti perubahan mental dari vanilla JS ke React:
//
// Vanilla: data di localStorage -> fungsi render*() dipanggil manual
//          setiap kali data berubah -> fungsi itu bongkar-pasang innerHTML.
//
// React:   data di localStorage -> disalin ke React state (`transactions`)
//          -> setiap kali state berubah, React OTOMATIS render ulang
//          komponen yang memakainya. Kamu tidak pernah menyentuh innerHTML.
export function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(loadTransactions());
  }, []);

  function persist(next) {
    setTransactions(next);
    saveTransactions(next);
  }

  function addTransaction({ name, amount, type }) {
    if (!name || amount <= 0) return;

    const next = [
      ...transactions,
      { id: Date.now(), name, amount, type, createdAt: Date.now() },
    ];
    persist(next);
  }

  function deleteTransaction(id) {
    persist(transactions.filter((t) => t.id !== id));
  }

  return { transactions, addTransaction, deleteTransaction };
}

// Sama persis alurnya dengan calculateSummary() di js/dashboard.js
export function calculateSummary(transactions, selectedMonth) {
  const filtered = filterByMonth(transactions, selectedMonth);

  let income = 0;
  let expense = 0;
  filtered.forEach((t) => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  return { income, expense, balance: income - expense };
}

// Sama persis alurnya dengan prepareChartData() di js/dashboard.js
export function prepareChartData(transactions, selectedMonth) {
  const filtered = filterByMonth(transactions, selectedMonth);

  const incomeData = new Array(12).fill(0);
  const expenseData = new Array(12).fill(0);

  filtered.forEach((t) => {
    const month = new Date(t.createdAt).getMonth();
    if (t.type === "income") incomeData[month] += t.amount;
    else expenseData[month] += t.amount;
  });

  return { incomeData, expenseData };
}

// Sama persis alurnya dengan prepareExpenseCategoryData() di js/dashboard.js
export function prepareExpenseCategoryData(transactions, selectedMonth) {
  let filtered = transactions.filter((t) => t.type === "expense");
  filtered = filterByMonth(filtered, selectedMonth);

  const categories = {};
  filtered.forEach((t) => {
    categories[t.name] = (categories[t.name] || 0) + t.amount;
  });

  return categories;
}

function filterByMonth(transactions, selectedMonth) {
  if (selectedMonth === "all") return transactions;
  return transactions.filter(
    (t) => new Date(t.createdAt).getMonth() === Number(selectedMonth),
  );
}
