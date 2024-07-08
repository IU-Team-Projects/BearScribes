interface InputProps {
	svg: React.ReactNode;
	type: React.HTMLInputTypeAttribute;
	placeholder: string;
}

const Input: React.FC<InputProps> = ({ svg: IconSVG, type, placeholder }) => {
	return (
		<div className="shadow-[0_0_0_1px_rgba(0,0,0,0.3)] border border-black rounded-md p-2 pb-1 flex flex-row space-x-4 w-auto">
			{IconSVG}
			<input
				className="outline-none focus:outline-none"
				type={type}
				placeholder={placeholder}
			></input>
		</div>
	);
};

export default Input;
