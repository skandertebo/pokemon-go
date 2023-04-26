import { Button, ButtonProps } from '@material-tailwind/react';

const CaptureButton: React.FC<Partial<ButtonProps>> = ({
  onClick,
  disabled
}) => {
  return (
    <Button
      className='bg-third px-12 py-4'
      disabled={disabled}
      onClick={onClick}
    >
      Capture
    </Button>
  );
};

export default CaptureButton;
