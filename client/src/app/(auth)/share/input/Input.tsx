import { useState } from "react";

type Validator = (name: string) => string;

interface InputProps {
	svg: React.ReactNode;
	type: React.HTMLInputTypeAttribute;
	placeholder: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	validator: Validator;
}

const Input: React.FC<InputProps> = ({
	svg: IconSVG,
	type,
	placeholder,
	value,
	onChange,
	validator,
}) => {
	const [isFocused, setIsFocused] = useState(true);

	const errorMessage = !isFocused ? validator(value) : "";

	return (
		<div className="flex flex-col space-y-0">
			<div className="shadow-[0_0_0_1px_rgba(0,0,0,0.3)] border border-black rounded-md p-2 pb-1 flex flex-row space-x-4 w-auto">
				{IconSVG}
				<input
					className="outline-none focus:outline-none"
					type={type}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				></input>
			</div>

			<div className="text-xs font-semibold h-5">{errorMessage}</div>
		</div>
	);
};

export default Input;
