import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel
} from "@mui/material";
import React from "react";
import readXlsxFile from 'read-excel-file'

function ImportExcellModal(props) {
  const { open, handleClose } = props;
  const handleOnchangeImport = (e)=>{
    readXlsxFile(e.target.files[0]).then((rows) => {
        console.log(rows);
      })
  }
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Import khách hàng từ file xlsx</DialogTitle>
      <DialogContent>
        <Box>
          <form >
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel id="select-helper-label">Chọn file (xlsx,xls)</InputLabel>
              <input type="file" name="file-customers" onChange={handleOnchangeImport}/>
            </FormControl>
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Import
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

ImportExcellModal.propTypes = {};

export default ImportExcellModal;
