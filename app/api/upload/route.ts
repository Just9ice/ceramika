import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const file = body.file;

    const response = await cloudinary.uploader.upload(file, {
      folder: "cerameKa",
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}