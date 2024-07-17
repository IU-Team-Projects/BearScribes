'use client';

import Input from '@/shared/ui/input';
import PasswordSVG from '@/shared/ui/passwordSVG';
import UserSVG from '@/shared/ui/userSVG';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import login from '../api/login';
import Cookies from 'js-cookie';

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const router = useRouter();

    const submitHandler = async (_: FormEvent) => {
        setErrMsg('');

        if (username == '') {
            setErrMsg('username have to be non-empty');

            return;
        }

        if (password == '') {
            setErrMsg('password have to be non-empty');

            return;
        }

        const { token, resCode, errorMsg } = await login({
            username,
            password,
        });

        if (resCode == 401) {
            setErrMsg('Wrong login or password');

            return;
        }

        if (errorMsg) {
            setErrMsg(errorMsg);

            return;
        }

        if (token) {
            console.log('got token: ', token);

            Cookies.set('access_token', `${token.access_token}`);

            router.push('/');
        }
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                submitHandler(e);
            }}
            className="flex h-full flex-col items-center justify-center"
        >
            <div className="mb-12 text-2xl font-semibold">Welcome</div>

            <Input
                svg={<UserSVG />}
                placeholder="USERNAME"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                svg={<PasswordSVG />}
                placeholder="PASSWORD"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <div className="font-red h-5 text-sm font-semibold">{errMsg}</div>

            <div className="p-6">
                <button className="h-10 w-64 rounded-lg bg-[#F8D57E]">
                    Sign In
                </button>
            </div>

            <div className="p-4 text-xs">
                <span className="text-gray-600">Don’t have an account? </span>
                <Link href="/signup" className="font-bold">
                    Sign Up
                </Link>
            </div>
        </form>
    );
}
