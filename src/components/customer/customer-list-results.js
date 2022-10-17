import { Card, FormControl, MenuItem, Select } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";
import customersApi from "../../axios/customersApi";
import { validateEmail } from "../../utils";
import { fetcher } from "../../axios/fetchSwr";

export const CustomerListResults = ({ ...rest }) => {
  const router = useRouter();
  const { data, error } = useSWR("customers", fetcher);
  const customers = data;
  if (!!error) {
    router.push("/404");
  }
  const { mutate } = useSWRConfig();
  if (!data) {
    return <div>Loading</div>;
  }
  const indexCustomer = [...customers].map((item, index) => {
    return { ...item, stt: index + 1 };
  });
  const stageChoices = {
    paid: "Đã thanh toán",
    unpaid: "Chưa thanh toán",
    joined: "Đã vào lớp",
  };

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      type: "number",
      width: 40,
      editable: false,
    },
    {
      field: "name",
      headerName: "Tên khách hàng",
      width: 250,
      editable: true,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length < 3;
        return { ...params.props, error: hasError };
      },
    },
    {
      field: "email",
      editable: true,
      width: 250,
      headerName: "Email khách hàng",
      preProcessEditCellProps: (params) => {
        const isValid = validateEmail(params.props.value);
        if (isValid) {
        }
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "course",
      editable: true,
      width: 200,
      headerName: "Khóa học quan tâm",
    },
    {
      field: "mobile",
      editable: true,
      width: 120,
      headerName: "Số điện thoại",
    },
    {
      field: "stage",
      editable: true,
      width: 200,
      headerName: "Trạng thái thanh toán",
      valueFormatter: (params) => {
        return stageChoices[params.value];
      },
      renderEditCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="stage-select-label"
              id="stage-select"
              defaultValue={params.row.stage}
              label="Trạng thái"
              name="stage"
              onChange={(e) => handleOnStageChange(params, e)}
            >
              <MenuItem value="unpaid">Chưa thanh toán</MenuItem>
              <MenuItem value="paid">Đã thanh toán</MenuItem>
              <MenuItem value="joined">Đã vào lớp</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "is_student",
      editable: true,
      headerName: "Đã là học viên chưa",
      width: 200,
      valueFormatter: (params) => {
        return params.value ? "Đã từng là học viên" : "Chưa từng là học viên";
      },
      renderEditCell: (params) => {
        return (
          <FormControl fullWidth>
            <Select
              labelId="is-student-select-label"
              id="is-student-select"
              defaultValue={params.row.is_student}
              label="Từng là học viên chưa"
              name="is_student"
              onChange={(e) => handleOnStageChange(params, e)}
            >
              <MenuItem value={false}>Chưa từng là học viên</MenuItem>
              <MenuItem value={true}>Đã từng là học viên</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      field: "created",
      editable: false,
      type: "date",
      headerName: "Đã được tạo",
      width: 200,
      renderCell: (params) => {
        return <Moment fromNow>{params.value}</Moment>;
      },
    },
  ];
  const handleOnStageChange = (params, e) => {
    const data = {
      id: params.row.id,
      [params.field]: e.target.value,
    };
    customersApi
      .updateCustomer(data)
      .then((res) => {
        toast.success("Cập nhật khách hàng thành công");
      })
      .then(() => {
        setTimeout(() => {
          mutate("customers");
        }, 800);
      })
      .catch((err) => {
        toast.error("Cập nhật khách hàng thất bại. Vui lòng thử lại");
      });
  };
  return (
    <Card
      {...rest}
      sx={{
        height: 680,
        width: "100%",
        "& .MuiDataGrid-cell--editing": {
          bgcolor: "rgb(255,215,115, 0.19)",
          color: "#1a3e72",
          "& .MuiInputBase-root": {
            height: "100%",
          },
        },
        "& .Mui-error": {
          bgcolor: (theme) => `rgb(126,10,15, ${theme.palette.mode === "dark" ? 0 : 0.1})`,
          color: (theme) => (theme.palette.mode === "dark" ? "#ff4343" : "#750f0f"),
        },
      }}
    >
      <DataGrid
        rows={indexCustomer}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        experimentalFeatures={{ newEditingApi: true }}
        initialState={{
          setPageSize: 10,
        }}
        components={{ Toolbar: GridToolbar }}
        onCellEditStop={(params, event) => {
          console.log(params);
          const data = {
            id: params.row.id,
            [params.field]: event.target?.value || params.value,
          };
          if (data[params.field] != params.value) {
            customersApi
              .updateCustomer(data)
              .then((res) => {
                toast.success("Cập nhật khách hàng thành công");
              })
              .then(() => {
                setTimeout(() => {
                  mutate("customers");
                }, 800);
              })
              .catch((err) => {
                console.log(err);
                toast.error("Cập nhật khách hàng thất bại. Vui lòng thử lại");
              });
          }
        }}
      />
    </Card>
  );
};
