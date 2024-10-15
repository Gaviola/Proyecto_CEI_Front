import React from "react";
import Input from "./input";

interface MailPasswordInputProps {
  onSubmit: (mail: string, password: string) => void;
}

const MailPasswordInput: React.FC<MailPasswordInputProps> = ({ onSubmit }) => {
  const [formData, setFormData] = React.useState({
    mail: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const mail = formData.mail;
    const password = formData.password;
    onSubmit(mail, password);
  };

  return (
    <form
      className="flex flex-col gap-4 my-3"
      onSubmit={handleSubmit}
      onKeyDown={(e) => { e.key === "Enter" && handleSubmit; }}
    >
      <Input
        type="email"
        name="mail"
        placeholder="Email"
        required={true}
        onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        required={true}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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