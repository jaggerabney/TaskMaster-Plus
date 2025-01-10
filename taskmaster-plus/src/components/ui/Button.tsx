"use client";

export interface Props {
  text: string;
  textColor: string;
  borderColor: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ text, textColor, borderColor, onClick }) => {
  return (
    <button
      type="button"
      className={`px-4 py-2 w-full ${textColor} ${borderColor} font-bold border-2 rounded hover:scale-110 duration-100`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
