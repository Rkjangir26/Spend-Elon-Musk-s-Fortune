// src/components/SpendingSummary.js
import React from 'react';
import { Typography } from '@mui/material';

const SpendingSummary = ({ totalSpent, selectedOptions, onChangeQuantity, onRemove }) => {
  return (
    <div>
      <Typography variant="h5">Receipt</Typography>
      {selectedOptions.length > 0 ? (
        selectedOptions.map((option, index) => (
          <div key={index}>
            <Typography>
              {option.name} x {option.quantity}..............${(option.cost * option.quantity).toLocaleString()}
            </Typography>
          </div>
        ))
      ) : (
        <Typography>No items selected.</Typography>
      )}
      <Typography variant="h6">Total: ${totalSpent.toLocaleString()}</Typography>
    </div>
  );
};

export default SpendingSummary;
