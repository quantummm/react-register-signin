import React, { useState } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "../../components/Typography/Typography";
import AppForm from "../../components/AppForm/AppForm";
import { email, required, passwordConfirmCheck } from "../../form/validation";
import RFTextField from "../../form/RFTextField";
import FormButton from "../../form/FormButton";
import FormFeedback from "../../form/FormFeedback";
import { withAuth } from "../../components/Authentication/Authentication";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

const deaultValues = {
  email: "",
  name: "",
  password: "",
  passwordConfirmed: "",
};

const deaultErrors = {
  email: undefined,
  name: undefined,
  password: undefined,
  passwordConfirmed: undefined,
};

function SignUp({ authenticateRegister }) {
  const location = useLocation();

  const classes = useStyles();

  const [values, setValues] = useState(deaultValues);

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState(deaultErrors);

  const [submitError, setSubmitError] = useState(false);

  const { from } = location.state || { from: { pathname: "/" } };

  const [authData, setAuthData] = useState({
    isLoggingIn: true,
    redirectToReferrer: false,
    hasAuthenticationFailed: false,
  });

  const [submitErrorMessage, setSubmitErrorMessage] = useState();

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = () => {
    const validateErrors = required(
      ["email", "name", "password", "passwordConfirmed"],
      values
    );

    if (!validateErrors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        validateErrors.email = email(values.email, values);
      }
    }

    if (!(validateErrors.password || validateErrors.passwordConfirmed)) {
      const passwordConfirmedError = passwordConfirmCheck(
        values.password,
        values.passwordConfirmed
      );
      if (passwordConfirmedError) {
        validateErrors.passwordConfirmed = passwordConfirmedError;
      }
    }

    return validateErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setSubmitErrorMessage("");
    setSubmitError(false);
    setErrors(deaultErrors);

    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    try {
      setSubmitting(true);
      const resp = await authenticateRegister(
        values.email,
        values.name,
        values.password
      );
      setSubmitting(false);

      if (resp.status === 200) {
        setAuthData({
          isLoggingIn: false,
          redirectToReferrer: true,
          hasAuthenticationFailed: false,
        });
      } else {
        const error = await resp.json();
        setSubmitError(error.message);
      }
    } catch (error) {
      setAuthData({
        isLoggingIn: true,
        redirectToReferrer: false,
        //hasAuthenticationFailed: true,
      });
      setSubmitError(true);
      //console.log(submitError);
      setSubmitErrorMessage(error.name + ": " + error.message);
      setSubmitting(false);
      return;
    }
  };

  if (authData.redirectToReferrer) return <Redirect to={from} />;
  if (authData.isLoggingIn) {
    return (
      <>
        <AppForm>
          <>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              {/* {"Already have an account "} */}
              <Link href="/signin" align="center" underline="always">
                Already have an account.
              </Link>
            </Typography>
          </>
          <form className={classes.root} autoComplete="off" noValidate>
            <RFTextField
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              disabled={submitting}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              error={errors.email}
              size="large"
              value={values.email}
            />
            <RFTextField
              autoComplete="name"
              autoFocus
              onChange={handleChange}
              disabled={submitting}
              fullWidth
              label="Name"
              margin="normal"
              name="name"
              error={errors.name}
              size="large"
              value={values.name}
            />

            <RFTextField
              fullWidth
              size="large"
              onChange={handleChange}
              disabled={submitting}
              error={errors.password}
              name="password"
              autoComplete="current-password"
              label="Password"
              type="password"
              margin="normal"
              value={values.password}
            />

            <RFTextField
              fullWidth
              size="large"
              onChange={handleChange}
              disabled={submitting}
              error={errors.passwordConfirmed}
              name="passwordConfirmed"
              label="Password Confirmed"
              type="password"
              margin="normal"
              value={values.passwordConfirmed}
            />

            {submitError ? (
              <FormFeedback className={classes.feedback} error>
                <>{submitErrorMessage}</>
              </FormFeedback>
            ) : null}

            <FormButton
              className={classes.button}
              disabled={submitting}
              size="large"
              color="secondary"
              fullWidth
              onClick={handleSubmit}
            >
              {"Sign Up"}
            </FormButton>
          </form>
        </AppForm>
      </>
    );
  }

  if (authData.hasAuthenticationFailed) return <Redirect to={"/notfound"} />;

  return <div>Loading...</div>;
}

export default withAuth(SignUp);
