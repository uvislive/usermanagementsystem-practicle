const jwt = require('jsonwebtoken');

export function decodeJwtToken(token) {
  try {
    // Decode the token without verifying the signature
    const decoded = jwt.decode(token);
    
    if (!decoded) {
      throw new Error('Invalid token');
    }

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error.message);
    return null;
  }
}




// export const convertFileToBase64 = async(file) => {
//   if (file) {
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const arrayBuffer = e.target.result; // ArrayBuffer of the file
//       const binary = Array.from(new Uint8Array(arrayBuffer))
//         .map((byte) => String.fromCharCode(byte))
//         .join("");
//       setBinaryString(binary);
//     };

//     reader.onerror = () => {
//       console.error("File reading failed");
//     };
//     reader.readAsArrayBuffer(file);
//   }
// };




export const convertToTableData=(data)=>{

  
}