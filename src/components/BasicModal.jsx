import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ isModalOpen, setIsModalOpen, modalData }) {
  const handleClose = () => setIsModalOpen(false);

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalData.name} - {modalData.level} Level
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Link href={modalData.armoryLink} target="_blank"color="inherit">
            Armory
          </Link>
        </Typography>
      </Box>
    </Modal>
  );
}