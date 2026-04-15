import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserById } from "@/lib/user";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    
    console.log("Session check - token exists:", !!token);

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Session check - decoded:", decoded);
    
    const user = await getUserById(decoded.id);
    console.log("Session check - user:", user);

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
  } catch (error) {
    console.error("Session check error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}