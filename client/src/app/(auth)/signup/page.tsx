"use client";

import { FormEvent, useState } from "react";
import UserSVG from "../share/svgs/UserSVG";
import TelegramSVG from "../share/svgs/TelegramSVG";
import CitySVG from "../share/svgs/CitySVG";
import PasswordSVG from "../share/svgs/PasswordSVG";
import Link from "next/link";
import Input from "../share/input/Input";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [telegram, setTelegram] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const validateUsername = (name: string): string => {
    const userNameRegex = new RegExp(/^[0-9A-Za-z]{3,16}$/);
    if (userNameRegex.test(name)) {
      return "";
    }

    return "only numbers and letters, 3 to 16 symbols";
  };

  const validatePassword = (password: string): string => {
    const passwordRegex = new RegExp(/^(?=.*?[0-9])(?=.*?[A-Za-z]).{8,32}$/);
    if (passwordRegex.test(password)) {
      return "";
    }

    return "at least one letter and number, 8 to 32 symbols";
  };

  const validateTelegram = (telegram: string): string => {
    const telegramRegex = new RegExp(
      /.*\B@(?=\w{5,32}\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*.*$/,
    );
    if (telegramRegex.test(telegram)) {
      return "";
    }

    return "starts with @, 5 to 32 symbols";
  };

  const validateCity = (city: string): string => {
    const telegramRegex = new RegExp(/^[A-Za-z]{2,32}$/);
    if (telegramRegex.test(city)) {
      return "";
    }

    return "only letters, 2 to 32 symbols";
  };

  const submitHandler = async (e: FormEvent) => {
    alert("Account created!");
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
          className="bg-[#F8D57E] hover:bg-[#E5C47E] hover:bg- rounded-lg w-64 h-10"
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
