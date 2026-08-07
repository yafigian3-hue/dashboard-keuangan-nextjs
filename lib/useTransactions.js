"use client";

import { useEffect, useState } from "react";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  async function request(url, options = {}) {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Request gagal");
    }

    return response;
  }

  async function refreshTransactions() {
    const response = await request("/api/transactions");
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    async function fetchTransactions() {
      try {
        await refreshTransactions();
      } catch (error) {
        console.error(error);
      }
    }

    fetchTransactions();
  }, []);

  async function addTransaction({ name, amount, type }) {
  
    if (!name || amount <= 0) return;

    const transaction = {
      name,
      amount,
      type,
    };

    await request("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    await refreshTransactions();
  }

  async function deleteTransaction(id) {

    await request("/api/transactions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    await refreshTransactions();
  }

  async function updateTransaction(transaction) {
   await request("/api/transactions", {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(transaction),
   });

   await refreshTransactions();
  }

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
}

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
