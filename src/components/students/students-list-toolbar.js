import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import CreateStudentModal from "./CreateStudentModal";
import { useState } from "react";
import ImportExcellModal from "./ImportExcellModal";

export const StudentListToolbar = (props) => {
  const [openCreateStudents, setOpenCreateStudents] = useState(false);
  const [openImportExcell, setOpenImportExcell] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreateStudents(!openCreateStudents);
  };
  const handleOpenImportExcell = () => {
    setOpenImportExcell(!openImportExcell);
  };

  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Students
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button
            startIcon={<UploadIcon fontSize="small" />}
            sx={{ mr: 1 }}
            onClick={handleOpenImportExcell}
          >
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <Button color="primary" variant="contained" onClick={handleOpenCreate}>
            Thêm học sinh
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box >
              <Typography fontSize={25} textAlign="center" fontWeight='bold'>
                Quản lý học sinh
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <CreateStudentModal open={openCreateStudents} handleClose={handleOpenCreate} />
      <ImportExcellModal open={openImportExcell} handleClose={handleOpenImportExcell} />
    </Box>
  );
};
