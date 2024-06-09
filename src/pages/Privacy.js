import * as React from "react";
import AppAppBar from "modules/views/AppAppBar";

import { Box, Container, Typography } from "@mui/material";
import AppFooter from "../modules/views/AppFooter";

function Privacy() {
  return (
    <React.Fragment>
      <AppAppBar />
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
