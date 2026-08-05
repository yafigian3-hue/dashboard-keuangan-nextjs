"use client";

import { useEffect, useState } from "react";
import {
  loadTransactions,
  saveTransaction,
  deleteTransaction as deleteTransactionApi,
  updateTransaction as updateTransactionApi,
} from "./storage";

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const data = await loadTransactions();
        setTransactions(data);
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

    await saveTransaction(transaction);

    const data = await loadTransactions();
    setTransactions(data);
  }

  async function deleteTransaction(id) {
    await deleteTransactionApi(id);

    const data = await loadTransactions();
    setTransactions(data);
  }

  async function updateTransaction(transaction) {
    await updateTransactionApi(transaction);

    const data = await loadTransactions();
    setTransactions(data);
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

