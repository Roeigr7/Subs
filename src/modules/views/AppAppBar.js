import * as React from "react";
import { signOut } from "firebase/auth";

import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { auth } from "../../firebase";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  const handleLogout = () => {
    console.log("logout", auth.currentUser);
    try {
      signOut(auth);
    } catch (e) {
      console.error("err", e);
    }
  };
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {"onepirate"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/sign-in"
              sx={rightLink}
            >
              {"Sign In"}
            </Link>
            <Link
              variant="h6"
              underline="none"
              href="/sign-up"
              sx={{ ...rightLink, color: "secondary.main" }}
            >
              {"Sign Up"}
            </Link>
            <Button variant="contained" color="error" onClick={handleLogout}>
              logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
