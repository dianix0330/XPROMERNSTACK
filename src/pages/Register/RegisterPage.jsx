import {
  Box,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useForm, FormProvider } from "react-hook-form";
import { literal, object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import Checkbox from "@mui/material/Checkbox";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/useAuth";

function MadeBySteven() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built by branchdev110 "}
      <Link color="inherit" href="https://github.com/branchdev110">
        MERN Stack
      </Link>
      {" team."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const registerSchema = object({
  firstname: string()
    .nonempty("Name is required")
    .max(32, "First name must be less than 50 characters"),
  lastname: string()
    .nonempty("Name is required")
    .max(32, "Last name must be less than 50 characters"),
  email: string().nonempty("Email is required").email("Email is invalid"),
  phone: string().nonempty("Phone is required").email("Phone is invalid"),
  address: string().nonempty("Address is required").email("Address is invalid"),
  password: string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().nonempty("Please confirm your password"),
  terms: literal(true, {
    invalid_type_error: "Accept Terms is required",
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

const RegisterPage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const handleChange = (ev) => {
    setRole(ev.target.value);
  };

  const methods = useForm({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const registerNewUser = async (newUser) => {
    setLoading(true);
    const res = await registerUser(newUser);
    if (res) {
      setLoading(false);
      navigate("/user-info");
    }
  };

  const handleSubmitUser = (ev) => {
    ev.preventDefault();
    const username = ev.target.username.value;
    const firstname = ev.target.firstName.value;
    const lastname = ev.target.lastName.value;
    const email = ev.target.email.value;
    const password = ev.target.password.value;
    const address = ev.target.address.value;
    const phone = ev.target.phone.value;
    registerNewUser({
      username,
      firstname,
      lastname,
      email,
      password,
      address,
      phone,
      role,
    });
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <FormProvider {...methods}>
          <form className={classes.form} onSubmit={handleSubmitUser}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    value={role}
                    onChange={handleChange}
                  >
                    <MenuItem value="client">Client</MenuItem>
                    <MenuItem value="user">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="passwordConfirm"
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                />
              </Grid>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox required />}
                  {...register("terms")}
                  label={
                    <Typography color={errors["terms"] ? "error" : "inherit"}>
                      Accept Terms and Conditions
                    </Typography>
                  }
                />
                <FormHelperText error={!!errors["terms"]}>
                  {errors["terms"] ? errors["terms"].message : ""}
                </FormHelperText>
              </FormGroup>

              <LoadingButton
                variant="contained"
                fullWidth
                type="submit"
                loading={loading}
                sx={{ py: "0.8rem", mt: "1rem" }}
              >
                Register
              </LoadingButton>
            </Grid>
          </form>
        </FormProvider>
      </div>
      <Box mt={5}>
        <MadeBySteven />
      </Box>
    </Container>
  );
};

export default RegisterPage;
