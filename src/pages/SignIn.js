import * as React from "react";
import { useAuth } from "contexts/authContext";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { Button, Link, TextField, Typography } from "@mui/material";
import { auth, googleProvider } from "../firebase";
import AppFooter from "../modules/views/AppFooter";
import AppForm from "../modules/views/AppForm";
import AppAppBar from "../modules/views/ResponsiveAppBar";

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error("err", err);
      setError("Failed to log in");
    }
    setLoading(false);
  };

  const signinWithGoogle = async () => {
    try {
      console.log("login google", auth.currentUser);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("err", err);
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom align="center">
            Sign In
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

          <LoadingButton
            loading={loading}
            type="submit"
            color="primary"
            className="form__custom-button"
          >
            Log in
          </LoadingButton>
          <Button
            onClick={signinWithGoogle}
            type="button"
            color="primary"
            className="form__custom-button"
          >
            Google login
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

export default SignIn;
