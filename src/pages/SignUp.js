import * as React from "react";
import { useAuth } from "contexts/authContext";

import LoadingButton from "@mui/lab/LoadingButton";
import { TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import AppFooter from "../modules/views/AppFooter";
import AppForm from "../modules/views/AppForm";
import AppAppBar from "../modules/views/ResponsiveAppBar";

function SignUp() {
  const { signup } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await signup(email, password);
    } catch (err) {
      console.error("err", err);
      setError("Failed to create an account");
    }
    setLoading(false);
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

          <LoadingButton
            loading={loading}
            type="submit"
            color="primary"
            className="form__custom-button"
          >
            sign up
          </LoadingButton>
        </form>
        <Typography align="center">{error}</Typography>
        <Typography align="center">
          <Link underline="always" href="/faorgot-password">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default SignUp;
