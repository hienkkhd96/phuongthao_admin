import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, DesktopDatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";
import * as Yup from "yup";
import customersApi from "../../axios/customersApi";
import { useAuthContext } from "../../contexts/auth-context";

function CreateCustomerModal(props) {
  const { user } = useAuthContext();

  const regexPhone = /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/;
  const { open, handleClose } = props;
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      birthday: new Date(),
      address: "",
      work: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Tên học viên phải nhiều hơn 2 ký tự")
        .max(30, "Tên học viên không được lớn hơn 30 ký tự")
        .required("Bạn chưa nhập tên học viên"),
      email: Yup.string().email("Email không đúng định dạng").required("Bạn chưa nhập email"),
      mobile: Yup.string().matches(regexPhone, "Số điện thoại không hợp lệ"),
      birthday: Yup.date()
        .min("1960/01/01", "Ngày sinh không hợp lệ")
        .max(new Date(), "Ngày sinh không hợp lệ"),
      address: Yup.string()
        .min(4, "Địa chỉ học viên phải nhiều hơn 4 ký tự")
        .max(30, "Địa chỉ học viên không được lớn hơn 40 ký tự"),
      work: Yup.string()
        .min(4, "Việc làm của học viên phải nhiều hơn 4 ký tự")
        .max(30, "Việc làm của học viên không được lớn hơn 40 ký tự"),
    }),
    onSubmit: async (value) => {
      const data = { ...value, create_by: user.id };
      try {
        const res = await customersApi.createCustomer(data);
        toast.success("Thêm học viên thành công");
        handleClose();
        setTimeout(() => {
          mutate("customers");
        }, 2000);
      } catch (error) {
        toast.error(err.response.data);
      }
    },
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Thêm học sinh</DialogTitle>
      <DialogContent>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Tên học sinh"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
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
            <DatePicker
              label="Basic example"
              value={formik.values.birthday}
              name="birthday"
              onChange=={formik.handleChange}
              renderInput={(params) => <TextField  {...params} />}
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
                Tạo
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
CreateCustomerModal.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default CreateCustomerModal;
