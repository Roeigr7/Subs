import * as React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { Button, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { auth } from "../firebase";
import AppAppBar from "../modules/views/AppAppBar";
import AppFooter from "../modules/views/AppFooter";
import AppForm from "../modules/views/AppForm";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("eplplpl", auth, email, password);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom align="center">
            Sign UP
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href="/sign-up" align="center" underline="always">
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>

        <form className="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="outlined-controlled"
            label="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-controlled"
            label="pass"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <Button type="submit" color="primary" className="form__custom-button">
            sign up
          </Button>
        </form>

        <Typography align="center">
          <Link underline="always" href="/forgot-password">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default SignUp;
