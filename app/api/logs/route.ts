import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ILogResponse } from "@/types/responseTypes";

export async function GET(): Promise<NextResponse<ILogResponse>> {
  const prisma = new PrismaClient();

  const lastLog = await prisma.requestLog.findFirst({
    orderBy: { createdAt: "desc" },
  });

  if (!lastLog) {
    return NextResponse.json(
      { success: false, message: "No data found" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    logData: {
      name: lastLog.name,
      band: lastLog.band,
      year: lastLog.year,
      content: lastLog.content,
    },
  });
}
