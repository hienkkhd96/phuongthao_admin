import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button, Container, Link,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import usersApi from "../axios/userApi";
import { useAuthContext } from "../contexts/auth-context";

const Register = () => {
  const router = useRouter()
  const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  const authContext = useAuthContext();
  const {isAuthenticated,signIn}= authContext
  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      mobile: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Tên tài khoản phải nhiều hơn 8 ký tự")
        .max(20, "Tên tài khoản không được lớn hơn 20 ký tự")
        .required("Bạn chưa nhập tên tại khoản"),
      email: Yup.string().email("Email không hợp lệ").max(255).required("Bạn chưa nhập email"),
      name: Yup.string().max(40, "Tên không quá 40 ký tự").required("Bạn chưa nhập tên"),
      password: Yup.string()
        .max(40, "Mật khẩu không quá 40 ký tự")
        .min(6, "Mật khẩu phải nhiều hơn 6 ký tự")
        .required("Bạn chưa nhập mật khẩu"),
      mobile: Yup.string().matches(regexPhone, "Số điện thoại không hợp lệ"),
    }),
    onSubmit: async (data) => {
      try {
        const res = await usersApi.createUser(data);
        toast.success("Tạo tài khoản thành công.Mời đăng nhập")
        await router.push("/");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data);
      }
    },
  });
  if (isAuthenticated) {
    router.push("/")
    return
  }
  return (
    <>
      <Head>
        <title>Register | Material Kit</title>
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
                Tạo tài khoản
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Tạo tài khoản để đăng nhập vào dashboard
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
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Tên của bạn"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Đại chỉ email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.mobile && formik.errors.mobile)}
              fullWidth
              helperText={formik.touched.mobile && formik.errors.mobile}
              label="Số điện thoại"
              margin="normal"
              name="mobile"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.mobile}
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
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            ></Box>

            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;
