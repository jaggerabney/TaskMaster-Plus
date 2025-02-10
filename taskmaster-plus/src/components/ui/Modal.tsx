export interface ModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }: ModalProps) => {
  return (
    <>
      <div
        id="background"
        className="bg-black size-full shadow-2xl fixed z-20 opacity-50"
        onClick={onClose}
      />
      <div
        id="modal"
        className="bg-white rounded-xl inset-0 h-fit w-fit p-8 fixed m-auto z-30"
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
