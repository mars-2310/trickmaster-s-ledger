import { prismaClient } from "@/packages/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: {
   params: {
     id: string 
    } 
  }) {
    try{
      const activities = await prismaClient.activity.findMany({
        where: { ledgerId: params.id },
        orderBy: { createdAt: "desc" },
        include: { user: true }
      });
      return NextResponse.json(activities);
    } catch(e) {
      return NextResponse.json({
        message: "Failed to load activities"
      });
    };
};
