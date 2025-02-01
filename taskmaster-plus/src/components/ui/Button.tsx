"use client";

export interface ButtonProps {
  text: string;
  textColor: string;
  borderColor: string;
  bgColor?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  text,
  textColor,
  borderColor,
  bgColor,
  onClick,
  type
}) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 w-full ${textColor} ${borderColor} ${bgColor} whitespace-nowrap select-none font-bold border-2 rounded hover:scale-[1.03] duration-100`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
