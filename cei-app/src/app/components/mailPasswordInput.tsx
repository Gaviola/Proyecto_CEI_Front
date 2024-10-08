import React from "react";

interface MailPasswordInputProps {
  onSubmit: (mail: string, password: string) => void;
}

const MailPasswordInput: React.FC<MailPasswordInputProps> = ({ onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mail = (
      e.currentTarget.elements.namedItem("mail") as HTMLInputElement
    ).value;
    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;
    onSubmit(mail, password);
  };

  return (
    <form 
        className="flex flex-col gap-4 my-5"
        onSubmit={handleSubmit}
        onKeyDown={(e) => { e.key === "Enter" && handleSubmit; }}
    >
      <input
        className="border-1 border-gray-300 rounded-lg px-4 py-1"
        type="email"
        name="mail"
        placeholder="Email"
        required
      />
      <input
        className="border-1 border-gray-300 rounded-lg px-4 py-1"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <button
        className="border-1 border-gray-300 rounded-lg px-4 py-1 bg-black text-white"
        type="submit"
      >
        Ingresar
      </button>
    </form>
  );
};

export default MailPasswordInput;
