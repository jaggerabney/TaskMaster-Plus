import { PropsWithChildren } from "react";

const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-cosmicLatte rounded p-8 shadow-md flex flex-col gap-4 max-w-md self-start">
      {children}
    </div>
  );
};

export default Card;
