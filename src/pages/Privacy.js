import * as React from "react";
import { Box, Container, Typography } from "@mui/material";
import AppFooter from "../modules/views/AppFooter";
import ResponsiveAppBar from "modules/views/ResponsiveAppBar";

function Privacy() {
  return (
    <React.Fragment>
      <ResponsiveAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom align="center">
            Privacyg
          </Typography>
          privacy
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default Privacy;
