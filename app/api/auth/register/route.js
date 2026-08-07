import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!name || !email || !password) {
      return Response.json(
        {
          message: "Semua field wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    if (password.length < 8) {
      return Response.json(
        {
          message: "Password minimal 8 karakter",
        },
        {
          status: 400,
        },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Response.json(
        {
          message: "Email sudah digunakan",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return Response.json(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Error saat registrasi:", error);

    return Response.json(
      {
        message: "Terjadi kesalahan pada server",
      },
      {
        status: 500,
      },
    );
  }
}
