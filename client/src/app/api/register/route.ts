import { NextRequest, NextResponse } from "next/server";

interface SignupRequest {
    username: string;
    telegram: string;
    city: string;
    password: string;
}

export const POST = async (request: NextRequest) => {
    const data: SignupRequest = await request.json();

    if (data.username.includes("bad")) {
        return NextResponse.json({ message: "bad username" }, { status: 422 });
    }

    return NextResponse.redirect(new URL("/", request.url));
};
