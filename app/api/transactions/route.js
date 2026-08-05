import { prisma } from "@/lib/prisma";

export async function GET() {
  const transactions = await prisma.transaction.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(transactions);
}

export async function POST(request) {
  const body = await request.json();

  const transaction = await prisma.transaction.create({
    data: {
      name: body.name,
      amount: Number(body.amount),
      type: body.type,
    },
  });

  return Response.json(transaction, {
    status: 201,
  });
}

export async function DELETE(request) {
  const { id } = await request.json();

  await prisma.transaction.delete({
    where: {
      id,
    },
  });

  return Response.json({
    message: "Berhasil dihapus",
  });
}

export async function PUT(request) {
  const body = await request.json();

  const transaction = await prisma.transaction.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      amount: Number(body.amount),
      type: body.type,
    },
  });

  return Response.json(transaction);
}
