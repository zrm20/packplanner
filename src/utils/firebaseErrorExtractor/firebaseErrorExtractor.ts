import { AuthError } from "firebase/auth";


export function authErrorExtractor(error: AuthError): string {
  const errorMessage = error.code.split('/')[1] || "Something went wrong";

  const capitalizedMessage = errorMessage[0].toUpperCase() + errorMessage.slice(1);

  return capitalizedMessage.replaceAll('-', ' ');
};