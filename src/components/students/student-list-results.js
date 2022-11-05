import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Card, FormControl, Grid, MenuItem, Select, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import Moment from "react-moment";
import { toast } from "react-toastify";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../../axios/fetchSwr";
import studentsApi from "../../axios/studentsApi";
import { validateEmail } from "../../utils";

export const StudentListResults = ({ ...rest }) => {
  const router = useRouter();
  const { data, error } = useSWR("students", fetcher);
  let rowsSelected = [];
  const students = data;
  if (!!error) {
    router.push("/404");
  }
  const { mutate } = useSWRConfig();
  if (!data) {
    return <div>Loading</div>;
  }
  const indexStudent = [...students].map((item, index) => {
    return { ...item, stt: index + 1 };
  });
  const columns = [
    {
      field: "stt",
      headerName: "#",
      type: "number",
      width: 20,
      editable: false,
    },
    {
      field: "name",
      headerName: "Tên học viên",
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
      headerName: "Email học viên",
      preProcessEditCellProps: (params) => {
        const isValid = validateEmail(params.props.value);
        if (isValid) {
        }
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "mobile",
      editable: true,
      width: 120,
      headerName: "Số điện thoại",
    },  
    {
      field: "birthday",
      type: "date",
      editable: true,
      width: 120,
      headerName: "Ngày sinh",
    },
    {
      field: "address",
      editable: true,
      width: 200,
      headerName: "Địa chỉ",
    },
    {
      field: "work",
      editable: true,
      width: 200,
      headerName: "Công việc hiện tại",
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
    studentsApi
      .updateStudent(data)
      .then((res) => {
        toast.success("Cập nhật học viên thành công");
      })
      .then(() => {
        setTimeout(() => {
          mutate("students");
        }, 2000);
      })
      .catch((err) => {
        toast.error("Cập nhật học viên thất bại. Vui lòng thử lại");
      });
  };
  const handleEditStop = (params, event) => {
    const data = {
      id: params.row.id,
      [params.field]: event.target?.value || params.value,
    };
    if (data[params.field] != params.value) {
      studentsApi
        .updateStudent(data)
        .then((res) => {
          toast.success("Cập nhật học viên thành công");
        })
        .then(() => {
          setTimeout(() => {
            mutate("students");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Cập nhật học viên thất bại. Vui lòng thử lại");
        });
    }
  };
  const handleOnDeleteClick = () => {
    if (rowsSelected.length > 0) {
      studentsApi
        .deleteStudents({ idList: rowsSelected })
        .then((res) => {
          toast.success(`Đã xóa ${res.data.count} học viên`);
        })
        .then(() => {
          setTimeout(() => {
            mutate("students");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          justifyContent: "space-between",
          padding: "10px 20px 10px 10px",
        }}
      >
        <Box>
          <Tooltip title="Xóa học viên đã chọn">
            <Button
              sx={{
                marginRight: "16px",
              }}
              aria-label="delete"
              variant="outlined"
              color="error"
              component="label"
              startIcon={<DeleteIcon />}
              onClick={handleOnDeleteClick}
            >
              Delete
            </Button>
          </Tooltip>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Box>
        <Grid>
          <GridToolbarQuickFilter
            sx={{
              marginTop: "6px",
            }}
          />
        </Grid>
      </GridToolbarContainer>
    );
  }
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
        rows={indexStudent}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        experimentalFeatures={{ newEditingApi: true }}
        components={{ Toolbar: CustomToolbar }}
        onCellEditStop={(params, event) => handleEditStop(params, event)}
        onSelectionModelChange={(ids) => {
          rowsSelected = ids;
        }}
      />
    </Card>
  );
};
