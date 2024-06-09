import * as React from "react";
import { Field, Form } from "react-final-form";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormButton from "../modules/form/FormButton";
import RFTextField from "../modules/form/RFTextField";
import { email, required } from "../modules/form/validation";
import AppAppBar from "../modules/views/ResponsiveAppBar";
import AppFooter from "../modules/views/AppFooter";
import AppForm from "../modules/views/AppForm";

function ForgotPassword() {
  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(["email"], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = () => {
    setSent(true);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom align="center">
            Forgot your password?
          </Typography>
          <Typography variant="body2" align="center">
            {"Enter your email address below and we'll " +
              "send you a link to reset your password."}
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2 }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Field
                autoFocus
                autoComplete="email"
                component={RFTextField}
                disabled={sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {sent ? "In progress…" : "Send reset link"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default ForgotPassword;
