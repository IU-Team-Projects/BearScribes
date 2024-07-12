'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
  areAllValidatorsPass,
  validateCity,
  validatePassword,
  validateTelegram,
  validateUsername,
} from '@/shared/lib/validators';
import { useRouter } from 'next/navigation';
import Input from '@/shared/ui/input';
import UserSVG from '@/shared/ui/userSVG';
import TelegramSVG from '@/shared/ui/telegramSVG';
import CitySVG from '@/shared/ui/citySVG';
import PasswordSVG from '@/shared/ui/passwordSVG';

export function SignUpPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [telegram, setTelegram] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isFormValid = areAllValidatorsPass(
      [username, password, telegram, city],
      [validateUsername, validatePassword, validateTelegram, validateCity],
    );

    if (isFormValid) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [username, password, telegram, city]);

  const submitHandler = async (e: FormEvent) => {
    if (!isFormValid) return;

    axios
      .post('/api/register', {
        username: username,
        telegram: telegram,
        city: city,
        password: password,
      })
      .then((res) => {
        if (res.status == 200) {
          router.push('/');
        }
      })
      .catch((err) => {
        alert('Erorr: ' + err.response?.data?.message);
        console.log(err);
      });
  };

  return (
    <form
      className="flex flex-col space-y-0 justify-center items-center h-full"
      onSubmit={async (e) => {
        e.preventDefault();
        await submitHandler(e);
      }}
    >
      <div className="font-semibold text-2xl mb-12">Welcome</div>

      <Input
        svg={<UserSVG />}
        placeholder="USERNAME"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        validator={validateUsername}
      />

      <Input
        svg={<TelegramSVG />}
        placeholder="TELEGRAM"
        type="text"
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
        validator={validateTelegram}
      />

      <Input
        svg={<CitySVG />}
        placeholder="CITY"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        validator={validateCity}
      />

      <Input
        svg={<PasswordSVG />}
        placeholder="PASSWORD"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        validator={validatePassword}
      />

      <div className="p-6">
        <button
          className={`bg-[#F8D57E] hover:bg-[#E5C47E] rounded-lg w-64 h-10 ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          onSubmit={submitHandler}
        >
          Sign Up
        </button>
      </div>

      <div className="text-xs p-4">
        <span className="text-gray-600">Already have an account? </span>
        <Link href="/login" className="font-bold hover:bg-gray-200 p-1 rounded">
          Sign In
        </Link>
      </div>
    </form>
  );
}
