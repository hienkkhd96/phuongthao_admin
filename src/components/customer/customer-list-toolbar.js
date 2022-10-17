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
import CreateCustomerModal from "./CreateCustomerModal";
import { useState } from "react";
import ImportExcellModal from "./ImportExcellModal";

export const CustomerListToolbar = (props) => {
  const [openCreateCustomers, setOpenCreateCustomers] = useState(false);
  const [openImportExcell, setOpenImportExcell] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreateCustomers(!openCreateCustomers);
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
          Customers
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }} onClick={handleOpenImportExcell}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <Button color="primary" variant="contained" onClick={handleOpenCreate}>
            Add Customers
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search customer"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <CreateCustomerModal open={openCreateCustomers} handleClose={handleOpenCreate} />
      <ImportExcellModal open={openImportExcell} handleClose={handleOpenImportExcell} />
    </Box>
  );
};
