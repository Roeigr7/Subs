import * as React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function PricingPlan() {
  const paypalOptions = {
    'clientId': 'AZ4S4oMrteLjp4tO_TEuSY1AxfWDWh4JKh59heFg1cLyBdIh_iQcFg99eahaxTqtTG0A99DschWBrk_o',
    currency: 'USD',
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then(details => {
      console.log("Payment approved:", details);
      // Handle successful payment here
    });
  };

  const handleError = (err) => {
    console.error("Payment error:", err);
    // Handle payment error here
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <PayPalScriptProvider options={paypalOptions}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: 'CAPTURE', // Corrected placement of the intent property
                purchase_units: [{
                  amount: {
                    currency_code: 'USD',
                    value: '1.00'
                  }
                }],
              });
            }}
            onApprove={handleApprove}
            onError={handleError}
          />
        </PayPalScriptProvider>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
