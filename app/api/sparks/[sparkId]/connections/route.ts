import { prismaClient } from "@/packages/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { 
  params: {
     sparkId: string 
  } 
}) {
  try {
    const data = await req.json();
    const connection = await prismaClient.sparkConnection.create({
      data: {
        fromSparkId: params.sparkId,
        toSparkId: data.toSparkId,
        connectionType: data.connectionType,
        strength: data.strength
      }
    });
    return NextResponse.json(connection, { status: 201 });
  } catch (e) {
    return NextResponse.json({
      message: "Failed to fetch connection",
    }, {
      status: 500
    });
  }
}

export async function GET(req: Request, { params }: { params: {
   sparkId: string 
  } 
}) {
  try {
    const connections = await prismaClient.sparkConnection.findMany({
      where: {
         fromSparkId: params.sparkId 
        },
      include: {
         toSpark: true 
      }
    });
    return NextResponse.json(connections);
  } catch (e) {
    return NextResponse.json({
      message: "Failed to fetch connection",
    }, {
      status: 500
    });
  }
}
