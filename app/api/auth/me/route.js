import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Belum login" }, { status: 401 });
    }

    const payload = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return Response.json(
        { message: "User tidak ditemukan" },
        { status: 401 },
      );
    }

    return Response.json({ user });
  } catch (error) {
    return Response.json({ message: "Sesi tidak valid" }, { status: 401 });
  }
}
