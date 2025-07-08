import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  role: string;
  exp: number;
  iat: number;
  [key: string]: any;
}

export const getRoleFromToken = (): string | null => {
  const token = localStorage.getItem("userAuthToken");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
