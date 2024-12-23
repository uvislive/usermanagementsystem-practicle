import React, { useState } from 'react'
import TextField from "@mui/material/TextField";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { UploadFile, Visibility, VisibilityOff } from '@mui/icons-material';


export const InputField = ({type,label,name,size="large",value,formik,...rest}) => {
  return (
    <TextField
    type={type || "text"}
    label={label}
    size={size}
    name={name}
    value={value}
    variant="outlined"
    onChange={(e) => {
        formik.handleBlur(e);
        formik.handleChange(e);
        // handleChangeValues(e); // Call onChange for parent component
      }}
    onBlur={formik.handleBlur}
    onChangeCapture={formik.handleBlur}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
    fullWidth
    margin="normal"
    {...rest}
  />
  )
}



export const PasswordField = ({ type, ...rest }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
      };
    
  return (
    <>
      <InputField 
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest} />
    </>
  );
};




export const SelectField = ({
  type,
  label,
  name,
  size = "large",
  value,
  formik,
  selectedItems,
  ...rest
}) => {
  return (
    <FormControl
      required={true}
      fullWidth
      error={formik?.touched[name] && Boolean(formik?.errors[name])}
    >
      <InputLabel id="select-label-id">{label}</InputLabel>
      <Select
        size={size}
        labelId="select-label-id"
        id="select-id"
        name={name}
        variant="outlined"
        label={label}
        value={value}
        onChange={(e) => formik.handleChange(e)}
        onBlur={formik?.handleBlur}
        error={formik?.touched[name] && Boolean(formik?.errors[name])}
        {...rest}
      >
        {selectedItems}
      </Select>
      <FormHelperText>
        {formik?.touched[name] && formik?.errors[name]}
      </FormHelperText>
    </FormControl>
  );
};




export const ImageField = ({label, name, size="large", formik, ...rest}) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue(name, file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlur = () => {
    formik.setFieldTouched(name, true);
  };

  return (
    <Box>
      <input
        accept="image/*"
        type="file"
        id={name}
        name={name}
        style={{ display: "none" }}
        onChange={handleImageChange}
        onBlur={handleBlur}
        {...rest}
      />
      <label htmlFor={name}>
        <Button
          variant="outlined"
          component="span"
          size={size}
          startIcon={<UploadFile />}
          fullWidth
          onBlur={handleBlur}
        >
          {label || "Upload Image"}
        </Button>
      </label>
      {preview && (
        <Box mt={2}>
          <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "50px" }} />
        </Box>
      )}
      {(formik.touched[name] || formik.submitCount > 0) && formik.errors[name] && (
        <Typography color="error" variant="caption">
          {formik.errors[name]}
        </Typography>
      )}
    </Box>
  );
};

export const MobileField = ({label, name, size="large", value, formik, ...rest}) => {
  return (
    <TextField
      type="tel"
      label={label}
      size={size}
      name={name}
      value={value}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">+91</InputAdornment>
        ),
      }}
      onChange={(e) => {
        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
        if (onlyNums.length <= 10) {
          formik.setFieldValue(name, onlyNums);
        }
      }}
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      fullWidth
      margin="normal"
      {...rest}
    />
  );
};