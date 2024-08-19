import React from 'react';
import { Box, Button, Grid, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/system';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFingerprint, faSync } from '@fortawesome/free-solid-svg-icons';

const BuyButton = styled(Button)({
  backgroundColor: '#ffffff',
  color: '#000000',
  borderRadius: '0',
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '10px',
  width: '100%',
  marginTop: '5px',
  '&:hover': {
    backgroundColor: '#f2f2f2',
  },
});

const StatBox = styled(Box)({
  padding: '5px 0',
  textTransform: 'capitalize',
  '.title': {
    fontSize: '14px'
  },
});

const TokenCard = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333333',
        color: '#ffffff',
        padding: '30px 20px',
        borderRadius: '10px',
        width: '100%',
      }}
    >
      <div className='flex justify-between pb-2'>
        <div className='flex items-center'>
          <Avatar
            src="https://example.com/avatar.jpg" // Replace with the actual image URL
            alt="Frog"
            sx={{ width: 56, height: 56 }}
          />
          <div className='ml-5'>
            <p>FWOG</p>
            <p className='lowercase'>just a lil fwog in a big pond</p>
          </div>

        </div>
        <div>
          <Button 
            sx={{ 
              color: '#ffffff',
              border: '2px solid white',
              borderRadius: '50%',
              minWidth: '0px',
              padding: '6px 5.8px',
            }}
          >
            {/* <FontAwesomeIcon icon={faSync} size="1x"/> */}
          </Button>
        </div>
      </div>

      <Box
        sx={{
          width: '50%',               // Keeps the full width
          borderBottom: '2px solid',    // Border width
          borderImage: 'linear-gradient(to right, white, transparent) 1', // Fading effect from white to transparent
          margin: '10px 0',            // Optional: Add some margin for spacing
        }}
      ></Box>


      <div className='flex justify-between py-2'>
        <StatBox>
          <p className="title">MCAP</p>
          <p className="value">$18.9M</p>
        </StatBox>
        <StatBox>
          <p className="title">HOLDERS</p>
          <p className="value">2,263</p>
        </StatBox>
        <StatBox>
          <p className="title">VOLUME</p>
          <p className="value">$4.5M</p>
        </StatBox>
        <StatBox>
          <p className="title">LIQUIDITY</p>
          <p className="value">$1.1M</p>
        </StatBox>
        <StatBox>
          <p className="title">ATH</p>
          <p className="value">$45M</p>
        </StatBox>
        <StatBox>
          <p className="title">TOP 10</p>
          <p className="value">7%</p>
        </StatBox>

        <StatBox>
          <p className="title">MINT</p>
          <p className="value">Disabled</p>
        </StatBox>

        <StatBox>
          <p className="title">LP</p>
          <p className="value">100% burnt</p>
        </StatBox>
      </div>

      <Box
        sx={{
          width: '50%',               // Keeps the full width
          borderBottom: '2px solid',    // Border width
          borderImage: 'linear-gradient(to right, white, transparent) 1', // Fading effect from white to transparent
          margin: '10px 0',            // Optional: Add some margin for spacing
        }}
      ></Box>

      <BuyButton>
        <Box
          sx={{
            color: 'black',
            border: '2px solid black',
            borderRadius: '50%',
            minWidth: '0px',
            padding: '0px 5px',
            margin: '0px 8px',
          }}
        >
          {/* <FontAwesomeIcon icon={faFingerprint} size="1x"/> */}
        </Box>  
        BUY
      </BuyButton>
    </Box>
  );
};

export default TokenCard;