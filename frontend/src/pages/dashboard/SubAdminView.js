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
} from "@mui/material";
import SimpleTableComponent from "../../components/SimpleTableComponent";
import { useSelector } from "react-redux";
import apiClient from "../../api/apiClient";
import { toast } from "react-toastify";
import { useForm } from "../../hooks/useFormHook";
import AddUser from "../../components/modal/AddUser";
import { ROLE_CONSTANTS_LIST } from "../../constants/optionsConstant";


const RoleOptions = ROLE_CONSTANTS_LIST?.filter((element) => element.label === "User")
  .map((element, idx) => {
    return <MenuItem key={idx} value={element.value}>{element.label}</MenuItem>;
  });


const SubAdminView = ({
  rowData,
  columnData,
  loader,
  isActionButtons = true,
}) => {
  const isDarkMode = useSelector((state) => state.auth.isDarkMode);


  // Modal state for edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);

  // Dialog state for delete confirmation
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);

  const adminId = useSelector((state) => state.auth.id);

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

  // Delete functions
  const handleOnDelete = (rowIndex) => {
    setRowToDelete(rowIndex);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setRowToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      loader(true);
      const response = await apiClient.delete(`/api/subadmin/clients/${rowToDelete}/${adminId}`);
      if (response?.data?.statusCode == 200) {
        toast.success("successfully Deleted");
      }
      loader(false);
      handleModalClose();
    } catch (err) {
      toast.error(err);
    }
    handleDialogClose();
  };


  const FormikState = {
    name: editRow?.name,
    email: editRow?.email,
    phone: editRow?.phone,
    roleId: editRow?.roleId,
  };

  const handleSubmit = async(values) => {
    try {
      loader(true);
      const response = await apiClient.put(`/api/subadmin/clients/${adminId}/${editRow._id}`, {
        ...values,
      });      
      if (response?.data?.statusCode == 200) {
        toast.success("Successfully Updated");
      }
    } catch (error) {
      toast.error(error)
    }finally{
      handleModalClose();
      loader(false);
      resetForm();
    }
  };

  const formik = useForm(FormikState, handleSubmit, null);
  const {resetForm}=formik;

  
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

      {isModalOpen && (
        <AddUser
          type="edit"
          openModal={isModalOpen}
          handleChange={handleModalClose}
          formik={formik}
          values={formik.values}
          RoleOptions={RoleOptions}
        />
      )}


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

export default SubAdminView;
