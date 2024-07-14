import { NextRequest, NextResponse } from 'next/server';

interface LoginRequest {
    username: string;
    password: string;
}

export const POST = async (request: NextRequest) => {
    const data: LoginRequest = await request.json();

    if (data.username.includes('bad')) {
        return NextResponse.json({ message: 'bad username' }, { status: 401 });
    }

    const response = {
        access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzIwNjc4MjU2fQ.Wpve0raP2pCiiHUniWr05m6jGBAyDrBombIh2QDlkX4',
        token_type: 'bearer',
    };

    return Response.json(response, {
        status: 200,
    });
};
