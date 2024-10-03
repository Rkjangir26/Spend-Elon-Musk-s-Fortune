// src/components/SpendingConfirmation.js
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const SpendingConfirmation = ({ open, option, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Your Purchase</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to spend ${option?.cost.toLocaleString()} on {option?.name}?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SpendingConfirmation;
