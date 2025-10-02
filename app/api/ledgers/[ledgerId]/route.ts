import { prismaClient } from "@/packages/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {
  params: {
    ledgerId: string
  }
}) {
  try {
    const ledger = await prismaClient.ledger.findUnique({
      where: {
        id: params.ledgerId
      },
      include: {
        members: true,
        sparks: true,
        activities: true
      }
    });

    if(!ledger) {
      return NextResponse.json({
        message: "not found",
      }, {
        status: 404
      });
    };

    return NextResponse.json(ledger);
  } catch(e) {
    return NextResponse.json({
      message: "Internal Server Error",
      error: String(e)
    }, {
      status: 500
    });
  }
};

export async function PATCH(req: NextRequest, {params} : {
  params: {
    ledgerId: string
  }
}) {
  try {
    const data = await req.json();
    const ledger = await prismaClient.ledger.update({
      where: {
        id: params.ledgerId
      },
      data
    });

    return NextResponse.json(ledger);
  } catch(e) {
    return NextResponse.json({
      message: "Internal Server Error",
      error: String(e)
    }, {
      status: 500
    });
  }
};

export async function DELETE(req: NextRequest, {params} : {
  params: {
    ledgerId: string
  }
}) {
  try {
    await prismaClient.ledger.delete({
      where: {
        id: params.ledgerId
      }
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
