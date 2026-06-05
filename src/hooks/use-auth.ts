import { useContext } from "react";
import AuthContext from "@/lib/contexts/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;