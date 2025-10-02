import { prismaClient } from "@/packages/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params}: {
  params: {
    ledgerId: string
  }
}) {
  try {
    const members = await prismaClient.ledgerMember.findMany({
      where: {
        id: params.ledgerId
      }, 
      include: {user: true}
    });

    return NextResponse.json(members);
  } catch(e) {
    return NextResponse.json({
      message: "Error loading members"
    });
  }
};

export async function POST(req: NextRequest, {params}: {
  params: {
    ledgerId: string
  }
}) {
  try{
    const data = await req.json();
    const member = await prismaClient.ledgerMember.create({
      data: {
        ledgerId: params.ledgerId,
        userId: data.userId,
        role: data.role ?? "EDITOR"
      }
    });

    return NextResponse.json(member, { status: 201 });
  } catch(e) {
    return NextResponse.json({
      message: "Failed to add member"
    });
  };
}