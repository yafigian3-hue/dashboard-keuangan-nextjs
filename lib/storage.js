const API_URL = "/api/transactions";

export async function loadTransactions() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Gagal mengambil data transaksi");
  }

  return response.json();
}

export async function saveTransaction(transaction) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error("Gagal menyimpan transaksi");
  }

  return response.json();
}

export async function deleteTransaction(id) {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Gagal menghapus transaksi");
  }

  return response.json();
}

export async function updateTransaction(transaction) {
  const response = await fetch("/api/transactions", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error("Gagal mengupdate transaksi");
  }

  return response.json();
}