import { Modal } from '@mui/material';
import React from 'react';

const DebugModal: React.FC<{ data: object }> = ({ data }) => {
  return (
    <Modal open={data !== undefined}>
      <div className='flex justify-center items-center p-8 bg-white'>
        {JSON.stringify(data)}
      </div>
    </Modal>
  );
};

export default DebugModal;
