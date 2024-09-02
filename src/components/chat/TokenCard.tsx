import React, { FC } from "react";
import { Box, Button, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { useAppSelector } from "../../libs/redux/hooks";
import { TokenInfo } from "../../common/types";
import { formatNumber, formatPrice, formatPercent, formatTimestamp, formatAddress } from "../../utils/format";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFingerprint, faSync } from '@fortawesome/free-solid-svg-icons';

const BuyButton = styled(Button)({
  backgroundColor: "#ffffff",
  color: "#000000",
  borderRadius: "0",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "10px",
  width: "100%",
  marginTop: "5px",
  "&:hover": {
    backgroundColor: "#f2f2f2",
  },
});

const StatBox = styled(Box)({
  padding: "5px 0",
  textTransform: "capitalize",
  ".title": {
    fontSize: "14px",
  },
});

interface TokenCardProps {
  tokenInfo: TokenInfo
}

const TokenCard: FC<TokenCardProps> = ({ tokenInfo }) => {
  const theme = useAppSelector((state) => state.theme.current.styles);

  return (
    <Box
      style={{
        backgroundColor: theme.alpha_token_card?.bgColor,
        color: theme.alpha_token_card?.text_color,
        padding: "30px 20px",
        borderRadius: "10px",
        width: "100%",
      }}
    >
      <div className="flex justify-between pb-2">
        <div className="flex items-center">
          <Avatar
            src={tokenInfo.image} // Replace with the actual image URL
            alt={tokenInfo.symbol}
            sx={{ width: 56, height: 56 }}
          />
          <div className="ml-5">
            <p>{tokenInfo.name}</p>
            <p className="lowercase">{tokenInfo.description}</p>
          </div>
        </div>
        <div>
          <Button
            sx={{
              color: theme.alpha_token_card?.text_color,
              border: `2px solid ${theme.alpha_token_card?.text_color}`,
              borderRadius: "50%",
              minWidth: "0px",
              padding: "6px 5.8px",
            }}
          >
            {/* <FontAwesomeIcon icon={faSync} size="1x"/> */}
          </Button>
        </div>
      </div>

      <Box
        sx={{
          width: "50%", // Keeps the full width
          borderBottom: "2px solid", // Border width
          borderImage: `linear-gradient(to right, ${theme.alpha_token_card?.text_color}, transparent) 1`, // Fading effect from white to transparent
          margin: "10px 0", // Optional: Add some margin for spacing
        }}
      ></Box>

      <div className="flex justify-between py-2">
        <StatBox>
          <p className="title">MCAP</p>
          <p className="value">${formatNumber(tokenInfo.mcap)}</p>
        </StatBox>
        <StatBox>
          <p className="title">HOLDERS</p>
          <p className="value">{"10"}</p>
        </StatBox>
        <StatBox>
          <p className="title">VOLUME</p>
          <p className="value">${formatNumber(tokenInfo.volume)}</p>
        </StatBox>
        <StatBox>
          <p className="title">LIQUIDITY</p>
          <p className="value">${formatNumber(tokenInfo.mcap)}</p>
        </StatBox>
        {/* <StatBox>
          <p className="title">ATH</p>
          <p className="value">$45M</p>
        </StatBox> */}
        <StatBox>
          <p className="title">TOP 10</p>
          <p className="value">{formatPercent(tokenInfo.top10)}</p>
        </StatBox>

        <StatBox>
          <p className="title">MINT</p>
          <p className="value">{"Enabled"}</p>
        </StatBox>

        {/* <StatBox>
          <p className="title">LP</p>
          <p className="value">100% burnt</p>
        </StatBox> */}
      </div>

      <Box
        sx={{
          width: "50%", // Keeps the full width
          borderBottom: "2px solid", // Border width
          borderImage: `linear-gradient(to right, ${theme.alpha_token_card?.text_color}, transparent) 1`, // Fading effect from white to transparent
          margin: "10px 0", // Optional: Add some margin for spacing
        }}
      ></Box>

      <BuyButton
        sx={{
          backgroundColor: theme.alpha_token_card?.text_color,
          color: theme.alpha_token_card?.bgColor,
        }}
      >
        <Box
          sx={{
            color: theme.alpha_token_card?.bgColor,
            border: `2px solid ${theme.alpha_token_card?.bgColor}`,
            borderRadius: "50%",
            minWidth: "0px",
            padding: "0px 5px",
            margin: "0px 8px",
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
