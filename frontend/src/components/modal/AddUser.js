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

export default function AddUser({type,openModal,handleChange,formik,values,RoleOptions}) {

  const [open, setOpen] = React.useState(openModal);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    handleChange();
  };

    

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontWeight='bolder' fontSize='25px'>{type} User</Typography>
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Grid container spacing={.5}>
              <Grid item xs={12}>
                <InputField
                  name="name"
                  size="small"
                  label="Enter Your Name"
                  value={values.name}
                  formik={formik}
                />
              </Grid>

              <Grid item xs={12}>
                <InputField
                  name="email"
                  size="small"
                  label="Enter Your Email Address"
                  value={values.email}
                  formik={formik}
                />
              </Grid>

           {type!="edit" &&  <Grid item xs={12}>
                <PasswordField
                  type="password"
                  name="password"
                  size="small"
                  label="Enter Your Password"
                  value={values.password}
                  formik={formik}
                />
              </Grid>}

              <Grid item xs={12}>
                <MobileField
                  name="phone"
                  size="small"
                  label="Enter Your PhoneNumber "
                  value={values.phone}
                  formik={formik}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectField 
                type="select" 
                label="Select Role" 
                name="roleId"
                 value={values.roleId}
                 formik={formik}
                 selectedItems={RoleOptions}
                //  onChange={formik.handleChange}
                />
              </Grid>
            </Grid>

            <Button type="submit" fullWidth variant="contained">
              {type} User
            </Button>
          </Box>
        </Box>
      </Modal>
  );
}
