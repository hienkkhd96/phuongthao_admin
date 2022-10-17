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
import { useFormik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
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
      course: "",
      stage: "unpaid",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Tên khách hàng phải nhiều hơn 2 ký tự")
        .max(30, "Tên khách hàng không được lớn hơn 30 ký tự")
        .required("Bạn chưa nhập tên khách hàng"),
      email: Yup.string().email("Email không đúng định dạng").required("Bạn chưa nhập email"),
      mobile: Yup.string().matches(regexPhone, "Số điện thoại không hợp lệ"),
      course: Yup.string().min(2, "Khóa học không hợp lệ"),
      stage: Yup.string().required("Bạn chưa nhập trạng thái thanh toán"),
    }),
    onSubmit: async (value) => {
      const data = { ...value, create_by: user.id };
      try {
        const res = await customersApi.createCustomer(data);
        toast.success("Thêm khách hàng thành công");
        handleClose()
      } catch (error) {
        toast.error(err.response.data);
      }
    },
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Thêm khách hàng</DialogTitle>
      <DialogContent>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Tên khách hàng"
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
            <TextField
              error={Boolean(formik.touched.course && formik.errors.course)}
              fullWidth
              helperText={formik.touched.course && formik.errors.course}
              label="Khóa học quan tâm"
              margin="normal"
              name="course"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.course}
              variant="outlined"
            />
            <FormControl sx={{ mt: 2, minWidth: "100%" }}>
              <InputLabel id="select-helper-label">Trạng thái thanh toán</InputLabel>
              <Select
                labelId="select-label"
                id="select"
                name="stage"
                onBlur={formik.handleBlur}
                value={formik.values.stage}
                onChange={formik.handleChange}
                label="Trạng thái thanh toán"
              >
                <MenuItem value={"unpaid"}>Chưa thanh toán</MenuItem>
                <MenuItem value={"paid"}>Đã thanh toán</MenuItem>
                <MenuItem value={"joined"}>Đã vào lớp</MenuItem>
              </Select>
            </FormControl>
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
