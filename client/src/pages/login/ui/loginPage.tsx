import Input from "@/shared/ui/input";
import PasswordSVG from "@/shared/ui/passwordSVG";
import UserSVG from "@/shared/ui/userSVG";
import Link from "next/link";

export function LoginPage() {
	return (
		<form className="flex flex-col space-y-3 justify-center items-center h-full">
			<div className="font-semibold text-2xl mb-12">Welcome</div>

			<Input svg={<UserSVG />} placeholder="USERNAME" type="text" />
			<Input svg={<PasswordSVG />} placeholder="PASSWORD" type="password" />

			<div className="p-6">
				<button className="bg-[#F8D57E] rounded-lg w-64 h-10">Sign Up</button>
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
