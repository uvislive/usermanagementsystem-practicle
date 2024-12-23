import * as Yup from "yup";
import {
  emailregex,
  letterAndNumberRegex,
  nameregex,
  phoneRegex,
} from "./regexConstant";


const FILE_SIZE_LIMIT = 2 * 1024 * 1024*1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

export const IMAGE_VALIDATE=Yup.mixed()
.required("File Is Required")
.test("fileSize", "File size is too large (Max: 2MB)", (value) => {
  return value && value.size <= FILE_SIZE_LIMIT;
})
.test("fileFormat", "Unsupported file format", (value) => {
  return value && SUPPORTED_FORMATS.includes(value.type);
});

export const FIELD_REQUIRED = (field) => {
  return Yup.string().required(`${field} is Required`);
};

export const REQUIRED = Yup.string().required("Field is Required");

export const REQUIRED_MAX_50CHAR = Yup.string()
  .required("Field is Required")
  .max(50, "Maximum 50 characters allowed.");

export const REQUIRED_MAX_100CHAR = Yup.string()
  .required("Field is Required")
  .max(100, "Maximum 100 characters allowed.");

export const VALIDATE_MAX_100CHAR = Yup.string().max(
  100,
  "Maximum 100 characters allowed."
);

export const REQUIREDNUMBER = Yup.number().required("Field is Required");

export const NAME_VALIDATE = Yup.string()
  .required("Name is Required")
  .trim()
  .min(1, "Name is Too short")
  .max(50, "Name is Too Long")
  .matches(nameregex, "Name Contains Only Letters and Spaces");

export const GOV_ID_NUMBER_VALIDATE = Yup.string()
  // .required("Gov Id Number is Required")
  .trim()
  .matches(letterAndNumberRegex, "Gov Id Contains Only Letters and Numbers");

export const EMAIL_VALIDATE = Yup.string()
  .required("Email is Required")
  .matches(emailregex, "Email Must Be In Valid format");

export const CAPTCHA_VALIDATE = Yup.string().required(
  "Please Enter Valid Captcha"
);

export const PHONE_VALIDATE = Yup.string()
  .required("Mobile Number is Required")
  .matches(phoneRegex, "Mobile Number Must be 10 Digit")
  .test(
    "len",
    "Mobile Number Must be 10 Digit",
    (val) => val && val.toString().length === 10
  );

export const BARCODE_VALIDATE = Yup.string().required(
  "Barcode is required for advocate registration"
);

export const PASSWORD_VALIDATE = Yup.string().required("Password is required");

export const PASSWORD_FULL_VALIDATE = Yup.string()
  .required("Password is Required")
  .min(8, "Password must be 8 characters long")
  .matches(/[0-9]/, "The password must include at least one number.")
  .matches(/[a-z]/, "The password must include at least one lowercase letter.")
  .matches(/[A-Z]/, "The password must include at least one uppercase letter.")
  .matches(/[^\w]/, "The password must include at least one symbol.");

export const CONFIRM_PASSWORD_VALIDATE = Yup.string()
  .required("Password is Required")
  .oneOf([Yup.ref("password"), null], 'Must match "password" field value');

export const NEW_PASSWORD_VALIDATE = Yup.object().shape({
  password: Yup.string()
    .required("Password is Required")
    .min(8, "Password must be 8 characters long")
    .matches(/[0-9]/, "The password must include at least one number.")
    .matches(
      /[a-z]/,
      "The password must include at least one lowercase letter."
    )
    .matches(
      /[A-Z]/,
      "The password must include at least one uppercase letter."
    )
    .matches(/[^\w]/, "The password must include at least one symbol."),
  confirm: Yup.string()
    .required("Password is Required")
    .oneOf([Yup.ref("password"), null], 'Must match "password" field value'),
});

export const PDF_VALIDATE_FOR_AUTHORISE = Yup.mixed()
  .required("PDF file is required")
  .test("fileType", "Only PDF file allowed", (value) => {
    if (value) {
      const allowedFileTypes = [
        "application/pdf",
        // "application/msword",
        // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      // Get the MIME type from the file object
      const mimeType = value.type;
      return allowedFileTypes.includes(mimeType);
    }
    return true; // No file provided, so no validation needed
  })
  .test(
    "fileSize",
    "File size exceeds the limit (20 MB)",
    (value) => !value || value.size <= 20 * 1024 * 1024 // 20 MB limit
  );

export const VALID_PAYMENT_CARD_NO = Yup.number()
  .required("Card Number Is Required")
  .typeError("The Value Must be a Number")
  .test(
    "len",
    "Card Number must be exactly 16 digits",
    (val) => val && val.toString().length === 16
  );

export const VALID_CVC = Yup.number()
  .required("CVC Is required")
  .typeError("CVC Must be a Number")
  .test(
    "len",
    "CVC must be exactly 3 digits",
    (val) => val && val.toString().length === 3
  );

export const VALID_PAN_NO = Yup.string()
  .required("PanCard No is Required")
  .test(
    "len",
    "PanCard must be exactly 16 digits",
    (val) => val && val.toString().length === 16
  );

export const VALID_PINCODE = Yup.number()
  .required("PINCODE No is Required")
  .typeError("PINCODE Must be a Number")
  .test(
    "len",
    "PINCODE must be exactly 6 digits",
    (val) => val && val.toString().length === 6
  );

export const IFSC_NUMBER = Yup.string()
  .matches(
    /^[A-Za-z0-9]+$/,
    "IFSC Code must contain only alphanumeric characters"
  )
  .length(11, "IFSC Code must be exactly 11 characters")
  .required("IFSC Code is required");

export const BANK_NAME = Yup.string()
  .matches(/^[A-Za-z\s]+$/, "Bank name must contain only letters and spaces")
  .required("Bank name is required");
