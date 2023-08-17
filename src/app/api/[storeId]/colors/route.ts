import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {

    try {

        if (!params.storeId) {
            return new NextResponse("Missing Store Id", { status: 400 })
        }

        const color = await prismadb.color.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log('[COLOR_GET', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}


export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {

    try {

        const { userId } = auth()
        const body = await req.json()

        const { name, value } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Missing name", { status: 401 })
        }

        if (!value) {
            return new NextResponse("Missing Value", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Missing Store Id", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }


        const color = await prismadb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log('[Color_POST', error);
        return new NextResponse("Internal Error", { status: 500 })
    }
}