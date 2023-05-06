import { Button, ButtonProps } from '@material-tailwind/react';

const CaptureButton: React.FC<Partial<ButtonProps>> = ({
  onClick,
  disabled
}) => {
  return (
    <button
      className="bg-[url('../../public/images/pokeball.png')] bg-cover  w-16 h-16 rounded-full flex items-center justify-center shadow-md focus:outline-none"
      disabled={disabled}
      onClick={onClick}
      style={{ boxShadow: '0px 10px 10px rgba(0, 0, 0, 0.8)' }}
    >
    </button>
  );
};

export default CaptureButton;
