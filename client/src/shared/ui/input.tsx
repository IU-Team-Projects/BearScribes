import { useState } from 'react';

type Validator = (name: string) => string;

interface InputProps {
    svg: React.ReactNode;
    type: React.HTMLInputTypeAttribute;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validator?: Validator;
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

    const errorMessage = !isFocused && validator ? validator(value) : '';

    return (
        <div className="flex flex-col space-y-0">
            <div className="flex w-auto flex-row space-x-4 rounded-md border border-black p-2 pb-1 shadow-[0_0_0_1px_rgba(0,0,0,0.3)]">
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

            <div className="h-5 text-xs font-semibold">{errorMessage}</div>
        </div>
    );
};

export default Input;
