import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const payload = await getCurrentUser();

    if (!payload) {
      return Response.json({ message: "Belum login" }, { status: 401 });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: payload.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(transactions);
  } catch (error) {
    console.error("GET transactions error:", error);

    return Response.json(
      { message: "Gagal mengambil transaksi" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const payload = await getCurrentUser();

    if (!payload) {
      return Response.json({ message: "Belum login" }, { status: 401 });
    }

    const body = await request.json();

    const name = body.name?.trim();
    const amount = Number(body.amount);
    const type = body.type;

    if (
      !name ||
      !amount ||
      amount <= 0 ||
      !["income", "expense"].includes(type)
    ) {
      return Response.json(
        { message: "Data transaksi tidak valid" },
        { status: 400 },
      );
    }

    const transaction = await prisma.transaction.create({
      data: {
        name,
        amount,
        type,
        userId: payload.id,
      },
    });

    return Response.json(transaction, {
      status: 201,
    });
  } catch (error) {
    console.error("POST transaction error:", error);

    return Response.json(
      { message: "Gagal membuat transaksi" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const payload = await getCurrentUser();

    if (!payload) {
      return Response.json({ message: "Belum login" }, { status: 401 });
    }

    const { id } = await request.json();

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: Number(id),
        userId: payload.id,
      },
    });

    if (!transaction) {
      return Response.json(
        { message: "Transaksi tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    });

    return Response.json({
      message: "Berhasil dihapus",
    });
  } catch (error) {
    console.error("DELETE transaction error:", error);

    return Response.json(
      { message: "Gagal menghapus transaksi" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  try {
    const payload = await getCurrentUser();

    if (!payload) {
      return Response.json({ message: "Belum login" }, { status: 401 });
    }

    const body = await request.json();

    const transaction = await prisma.transaction.findFirst({
      where: {
        id: Number(body.id),
        userId: payload.id,
      },
    });

    if (!transaction) {
      return Response.json(
        { message: "Transaksi tidak ditemukan" },
        { status: 404 },
      );
    }

    const name = body.name?.trim();
    const amount = Number(body.amount);
    const type = body.type;

    if (
      !name ||
      !amount ||
      amount <= 0 ||
      !["income", "expense"].includes(type)
    ) {
      return Response.json(
        { message: "Data transaksi tidak valid" },
        { status: 400 },
      );
    }

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        name,
        amount,
        type,
      },
    });

    return Response.json(updatedTransaction);
  } catch (error) {
    console.error("PUT transaction error:", error);

    return Response.json(
      { message: "Gagal mengubah transaksi" },
      { status: 500 },
    );
  }
}
