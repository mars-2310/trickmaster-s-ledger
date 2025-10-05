import { prismaClient } from "@/packages/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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
    }

    const ledgers = await prismaClient.ledger.findMany({
      where: {
        OR: [
          { ownerId: user.id },
          { members: { some: { userId: user.id } } }
        ]
      },
      include: { members: true }
    });

    return NextResponse.json(ledgers);
  } catch(e) {
    return NextResponse.json({
      message: "Internal Server Error",
      error: String(e)
    }, {
      status: 500
    });
  }
}

export async function POST(req: NextRequest) {
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
    }

    const data = await req.json();
    const ledger = await prismaClient.ledger.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: user.id,
      }
    });

    return NextResponse.json(ledger, { status: 201 });
  } catch(e) {
    return NextResponse.json({
      message: "Internal Server Error",
      error: String(e)
    }, {
      status: 500
    });
  }
}