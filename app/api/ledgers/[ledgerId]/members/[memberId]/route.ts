import { prismaClient } from "@/packages/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, {params}: {
  params: {
    ledgerId: string,
    memberId: string
}}) {
  try {
    const data = await req.json();
    
    const updatedMember = await prismaClient.ledgerMember.update({
      where: {
        id: params.memberId
      },
      data: {
        role: data.role
      },
    });

    return NextResponse.json(updatedMember);
  } catch(e) {
    return NextResponse.json({
      message: "Error updating member"
    });
  };
};


export async function DELETE(req: NextRequest, {params}: {
  params: {
    ledgerId: string,
    memberId: string
}}) {
  try{
    await prismaClient.ledgerMember.delete({
      where: {
        id: params.memberId
      },
    });

    return NextResponse.json({
      success: true
    });
  } catch(e) {
    return NextResponse.json({
      success: false,
      error: String(e)
    }, {
      status: 500
    });
  };
};