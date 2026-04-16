import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    try {
      const { getUserById } = await import("@/lib/user");
      const user = await getUserById(decoded.id);

      if (!user) {
        return NextResponse.json({ user: null }, { status: 200 });
      }

      return NextResponse.json({
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ user: null }, { status: 200 });
    }
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}