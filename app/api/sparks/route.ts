import { prismaClient } from "@/packages/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession();
    const user = await prismaClient.user.findFirst({
      where: {
        email: session?.user?.email ?? ""
      }
    });

    if(!user) {
      return NextResponse.json({
        message: "Unauthenticated",
      }, {
        status: 401
      });
    };

    const sparks = await prismaClient.spark.findMany({
      where: {
        createdById: session?.user?.id,
      },
    });

    return NextResponse.json(sparks, {status: 201})
  } catch(e) {
    return NextResponse.json({
      message: "Internal Server Error",
      error: String(e)
    }, {
      status: 500
    });
  };
};

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    const user = await prismaClient.user.findFirst({
      where: {
        email: session?.user?.email ?? ""
      }
    });

    if(!user) {
      return NextResponse.json({
        message: "Unauthenticated",
      }, {
        status: 401
      });
    };

    const data = await req.json();
    const spark = await prismaClient.spark.create({
      data: {
        ledgerId: data.ledgerId,
        title: data.title,
        content: data.content,
        category: data.category,
        tags: data.tags ?? [],
        createdById: session?.user?.id
      }
    });
    return NextResponse.json(spark, { status: 201 });
  } catch(e) {
    return NextResponse.json({
      message: "Internal Server Error",
      error: String(e)
    }, {
      status: 500
    });
  }
}