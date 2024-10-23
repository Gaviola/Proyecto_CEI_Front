import React from "react";

interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    required: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ type, placeholder, name, required, onChange }) => {
    return (
        <input
            className="border-1 border-gray-300 rounded-lg px-4 py-1"
            type={type}
            placeholder={placeholder}
            name={name}
            required={required}
            onChange={onChange}
        />
    );
};

export default Input;
