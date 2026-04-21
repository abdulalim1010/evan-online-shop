import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const collection = await getCollection("contactMessages");
    const result = await collection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
      read: false,
    });

    // Optional: Send SMS notification to admin using an SMS service
    // Example with Twilio (uncomment and configure if needed):
    // const adminPhone = process.env.ADMIN_PHONE;
    // if (adminPhone && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    //   const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    //   await client.messages.create({
    //     body: `New contact message from ${name} (${email}): ${message.substring(0, 100)}...`,
    //     from: process.env.TWILIO_PHONE_NUMBER,
    //     to: adminPhone,
    //   });
    // }

    return NextResponse.json(
      { message: "Message sent successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const collection = await getCollection("contactMessages");
    const messages = await collection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(
      { messages: messages.map((msg) => ({
        id: msg._id.toString(),
        name: msg.name,
        email: msg.email,
        message: msg.message,
        createdAt: msg.createdAt,
        read: msg.read,
      })) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch messages error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
