import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TokenForm from "./TokenForm";
import SignUpForm from "./SignUpForm";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [isTokenFormDisplaying, setTokenFormDisplaying] = React.useState(false);

  const switchToTokenForm = () => {
    setTokenFormDisplaying(true);
  };
  const switchToEmailForm = () => {
    setTokenFormDisplaying(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {isTokenFormDisplaying ? (
          <TokenForm switchToEmailForm={switchToEmailForm} />
        ) : (
          <SignUpForm switchToTokenForm={switchToTokenForm} />
        )}
      </div>
    </Container>
  );
};

export default React.memo(SignUp);
