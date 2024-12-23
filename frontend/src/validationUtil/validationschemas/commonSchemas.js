import * as Yup from "yup";
import {
  BARCODE_VALIDATE,
  CAPTCHA_VALIDATE,
  CONFIRM_PASSWORD_VALIDATE,
  EMAIL_VALIDATE,
  FIELD_REQUIRED,
  GOV_ID_NUMBER_VALIDATE,
  IMAGE_VALIDATE,
  NAME_VALIDATE,
  PASSWORD_FULL_VALIDATE,
  PASSWORD_VALIDATE,
  PDF_VALIDATE_FOR_AUTHORISE,
  PHONE_VALIDATE,
  REQUIRED,
  REQUIRED_MAX_100CHAR,
  REQUIRED_MAX_50CHAR,
  VALIDATE_MAX_100CHAR,
} from '../validationField';
// import { COUNTRY_INDIA } from "../constants/StaticOptions";

const today = new Date();
today.setHours(0, 0, 0, 0);
// Common schema for basic user information



export const SIGNUP_SCHEMA = Yup.object().shape({
  name: NAME_VALIDATE,
  email: EMAIL_VALIDATE,
  password: PASSWORD_FULL_VALIDATE,
  phone:PHONE_VALIDATE,
  roleId:REQUIRED
});


export const SIGNIN_SCHEMA = Yup.object().shape({
  email: EMAIL_VALIDATE,
  password: PASSWORD_FULL_VALIDATE,
});

export const SEARCH_STOCK_SCHEMA = Yup.object().shape({
  search:REQUIRED
})