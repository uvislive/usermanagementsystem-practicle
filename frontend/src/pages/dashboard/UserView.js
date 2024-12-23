import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  MenuItem,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  responsiveFontSizes,
} from "@mui/material";
import SimpleTableComponent from "../../components/SimpleTableComponent";
import { useSelector } from "react-redux";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";



const rolesOptions = ["Admin", "User", "Manager", "Editor"]; // Available roles

const MainDashboard = ({ rowData, columnData,loader,isActionButtons=true }) => {
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);
  // Static data with Role field
  const [rowsData, setRowData] = useState([
    //     { id: 1, Name: "John Doe", Email: "johndoe@example.com", Role: "Admin" },
    //     { id: 2, Name: "Jane Smith", Email: "janesmith@example.com", Role: "User" },
    //     { id: 3, Name: "Alice Brown", Email: "alicebrown@example.com", Role: "Manager" },
  ]);

  // Modal state for edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  // Dialog state for delete confirmation
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  // Edit functions
  const handleOnEdit = (rowIndex) => {
    const row = rowData.find((row) => row._id == rowIndex);
    setEditRow({ ...row });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditRow(null);
  };

  const handleSave = async () => {
    try {
        loader(true);
      setRowData((prevData) =>
        prevData.map((row) => (row.id === editRow.id ? { ...editRow } : row))
      );
      // console.log("submittedData",editRow)
      const response = await apiClient.put(`/api/users/${editRow._id}`, {
        ...editRow,
      });
      console.log("response",response)
      if (response?.data?.statusCode == 200) {
        toast.success("successfully Updated");
      }
      loader(false)
      handleModalClose();
    } catch (err) {
      toast.error(err);
    }
  };

  // Delete functions
  const handleOnDelete = (rowIndex) => {
    setRowToDelete(rowIndex);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setRowToDelete(null);
  };

  const confirmDelete = async() => {
    try {
        loader(true);
     
      // console.log("submittedData",editRow)
      const response = await apiClient.delete(`/api/users/${rowToDelete}`);
      console.log("response",response)
      if (response?.data?.statusCode == 200) {
        toast.success("successfully Deleted");
      }
      loader(false)
      handleModalClose();
    } catch (err) {
      toast.error(err);
    }
    handleDialogClose();
  };

  console.log("Edit row", editRow);

  return (
    <>
      <Box>
        <SimpleTableComponent
          data={rowData}
          columns={columnData}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
          tableHeading={"User Table"}
          tableHeaderColor={!isDarkMode ? "#1975d0" : "#1e1e1e"}
          isActionButtons={isActionButtons}
        />
      </Box>

      {/* Edit Modal */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Edit User
          </Typography>
          {editRow && (
            <>
              <TextField
                fullWidth
                label="Name"
                value={editRow.name}
                onChange={(e) =>
                  setEditRow((prev) => ({ ...prev, name: e.target.value }))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={editRow.email}
                onChange={(e) =>
                  setEditRow((prev) => ({ ...prev, email: e.target.value }))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="phone"
                value={editRow.phone}
                onChange={(e) =>
                  setEditRow((prev) => ({ ...prev, phone: e.target.value }))
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                select
                label="Role"
                value={editRow.roleId.name}
                onChange={(e) =>
                  setEditRow((prev) => ({ ...prev, roleId: e.target.value }))
                }
                sx={{ mb: 2 }}
              >
                {rolesOptions.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
              <Box sx={{ textAlign: "right" }}>
                <Button onClick={handleModalClose} sx={{ mr: 2 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this row? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MainDashboard;
