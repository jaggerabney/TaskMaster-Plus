const Modal: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div
        id="background"
        className="bg-black size-full shadow-2xl fixed z-20 opacity-50"
      />
      <div
        id="modal"
        className="bg-white rounded-xl inset-0 w-1/4 h-[30%] p-8 fixed m-auto z-30"
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
