
export const phoneRegex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);

export const passwordRegex1 = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8})/
);

export const passwordRegex = new RegExp(/^\d{10}$/);

export const nameregex = new RegExp(/^[a-zA-Z]+[\-'\s]?[a-zA-Z ]+$/);

export const emailregex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

export const letterAndNumberRegex = new RegExp(/^[A-Za-z0-9]+$/);

 export const searchSuggestionRegex = /\(([^)]+)\)/;
