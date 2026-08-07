import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/auth";
import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return Response.json(
        {
          message: "Email dan password wajib diisi",
        },
        {
          status: 400,
        },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Response.json(
        {
          message: "Email atau password salah",
        },
        {
          status: 401,
        },
      );
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return Response.json(
        {
          message: "Email atau password salah",
        },
        {
          status: 401,
        },
      );
    }

    const token = signToken({
      id: user.id,
      email: user.email,
    });

    const cookieStore = await cookies();

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json({
      message: "Login berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

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
