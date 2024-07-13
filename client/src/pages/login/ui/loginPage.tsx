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

    setErrMsg("")

    if (username == "") {
      setErrMsg("username have to be non-empty")

      return
    }

    if (password == "") {
      setErrMsg("password have to be non-empty")

      return
    }

    const { token, resCode, errorMsg } = await login({ username, password });

    if (resCode == 401) {
      setErrMsg("Wrong login or password")

      return
    }

    if (errorMsg) {
      setErrMsg(errorMsg)

      return;
    }


    if (token) {
      console.log('got token: ', token);

      Cookies.set('access_token', token.access_token)

      router.push('/');
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitHandler(e);
      }}
      className="flex flex-col justify-center items-center h-full"
    >
      <div className="font-semibold text-2xl mb-12">Welcome</div>

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

      <div className='font-red font-semibold h-5 text-sm'>{errMsg}</div>

      <div className="p-6">
        <button className="bg-[#F8D57E] rounded-lg w-64 h-10">Sign In</button>
      </div>

      <div className="text-xs p-4">
        <span className="text-gray-600">Don’t have an account? </span>
        <Link href="/signup" className="font-bold">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
