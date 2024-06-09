import * as React from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AppAppBar from "../modules/views/ResponsiveAppBar";
import AppFooter from "../modules/views/AppFooter";

function Terms() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom align="center">
            Terms
          </Typography>
          terms
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default Terms;
