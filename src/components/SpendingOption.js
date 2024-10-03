// src/components/SpendingOption.js
import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';

const SpendingOption = ({ option, onSpend, onRemove, quantity, onChangeQuantity }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={require(`../assets/${option.image}`)}
        alt={option.name}
      />
      <CardContent>
        <Typography variant="h5">{option.name}</Typography>
        <Typography variant="body2">${option.cost.toLocaleString()}</Typography>
        
        {/* Quantity Controls */}
        <div>
          <Button onClick={() => onChangeQuantity(option, quantity - 1)} disabled={quantity <= 0}>
            -
          </Button>
          <Typography variant="body2" style={{ display: 'inline', margin: '0 10px' }}>
            {quantity}
          </Typography>
          <Button onClick={() => onChangeQuantity(option, quantity + 1)}>
            +
          </Button>
        </div>
        
<div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
  <Button
    variant="contained"
    color="primary"
    onClick={() => onSpend(option)}
  >
    Spend
  </Button>
  <Button
    variant="contained"
    color="secondary"
    onClick={() => onRemove(option)}
    style={{ marginLeft: '10px' }} // Add margin here
  >
    Remove
  </Button>
</div>

      </CardContent>
    </Card>
  );
};

export default SpendingOption;
