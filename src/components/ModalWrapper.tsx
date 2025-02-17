export interface ModalWrapperProps {
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return (
    <>
      <div className='fixed z-50 top-0 bottom-0 left-0 right-0 bg-blur opacity-60'></div>
      <div className='fixed z-50 top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-transparent backdrop-blur-sm'>
        {children}
      </div>
    </>
  );
};

export default ModalWrapper;
