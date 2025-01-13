"use client";

export interface Props {
  text: string;
  textColor: string;
  borderColor: string;
  bgColor?: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({
  text,
  textColor,
  borderColor,
  bgColor,
  onClick
}) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 w-full ${textColor} ${borderColor} ${bgColor} whitespace-nowrap font-bold border-2 rounded hover:scale-[1.03] duration-100`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
