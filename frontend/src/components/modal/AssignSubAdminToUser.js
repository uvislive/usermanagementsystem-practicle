import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import  { PasswordField,InputField, ImageField, MobileField, SelectField } from '../../utils/InputField';
import { Grid ,MenuItem} from '@mui/material';
import {ROLE_CONSTANTS_LIST }  from "../../constants/optionsConstant"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AssingSubAdminToUser({openModal,handleChange,formik,values,subAdmins,users}) {

  const [open, setOpen] = React.useState(openModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    handleChange();
  };

    
const subAdminsOptions= subAdmins?.map((element,idx)=>{
    return <MenuItem key={idx} value={element._id}>{element.name}</MenuItem>
  })


  const usersOptions= users?.map((element,idx)=>{
    return <MenuItem key={idx} value={element._id}>{element.name}</MenuItem>
  })



  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontWeight='bolder' mb={'20px'} fontSize='20px'>Assign Admin To User</Typography>
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SelectField 
                type="select" 
                label="Select SubAdmin" 
                name="subAdmin"
                 value={values.subAdmin}
                 formik={formik}
                 selectedItems={subAdminsOptions}
                //  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectField 
                type="select" 
                label="Select User" 
                name="user"
                 value={values.user}
                 formik={formik}
                 selectedItems={usersOptions}
                //  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained">
              Assign 
            </Button>
          </Box>
        </Box>
      </Modal>
  );
}
