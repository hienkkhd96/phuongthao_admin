import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import authApi from "../axios/auth";
import { useAuthContext } from "../contexts/auth-context";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";

const Login = (props) => {
  const authContext = useAuthContext();
  const { isAuthenticated, signIn } = authContext;
  const router = useRouter();
  const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  const formik = useFormik({
    initialValues: {
      username: "hienkkhd",
      password: "Password123",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Tên tài khoản phải nhiều hơn 8 ký tự")
        .max(20, "Tên tài khoản không được lớn hơn 20 ký tự")
        .required("Bạn chưa nhập tên tại khoản"),
      password: Yup.string()
        .max(40, "Mật khẩu không quá 40 ký tự")
        .min(6, "Mật khẩu phải nhiều hơn 6 ký tự")
        .required("Bạn chưa nhập mật khẩu"),
      mobile: Yup.string().matches(regexPhone, "Số điện thoại không hợp lệ"),
    }),
    onSubmit: async (value) => {
      try {
        const { data } = await authApi.login(value);
        const { token } = data;
        const user = {
          id: data.user.id,
          username: data.user.username,
          name: data.user.name,
          permisson: data.user.permisson,
        };
        signIn({ user, token });
        toast.success("Đăng nhập thành công");
      } catch (err) {
        toast.error(err.response.data);
      }
    },
  });
  if (isAuthenticated) {
    router.push("/");
    return;
  }
  return (
    <>
      <Head>
        <title>Login |Phương Thảo</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  color="error"
                  fullWidth
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  startIcon={<GoogleIcon />}
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                Đăng nhập bằng tài khoản
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Tên tài khoản"
              margin="normal"
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
