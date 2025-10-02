import { prismaClient } from "@/packages/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {
  params: {
    sparkId: string
  }
}) {
  try {
    const spark = await prismaClient.spark.findUnique({
      where: {
        id: params.sparkId
      }
    });

    if(!spark) {
      return NextResponse.json({
        message: "not found",
      }, {
        status: 404
      });
    };

    return NextResponse.json(spark);
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
    sparkId: string
  }
}) {
  try {
    const data = await req.json();
    const spark = await prismaClient.spark.update({
      where: {
        id: params.sparkId
      },
      data
    });

    return NextResponse.json(spark);
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
    sparkId: string
  }
}) {
  try {
    await prismaClient.spark.delete({
      where: {
        id: params.sparkId
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
