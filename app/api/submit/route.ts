import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()

export async function GET() {
    const people = await prisma.person.findMany()
    return NextResponse.json(people.map(p => p.name))
}

export async function POST(req: Request) {
    const { name } = await req.json()
    await prisma.person.create({ data: { name } })
    return NextResponse.json({ success: true })
}
