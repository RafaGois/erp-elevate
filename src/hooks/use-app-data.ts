import { useContext } from "react";
import AppContext from "@/lib/contexts/AppContext";

const useAppData = () => useContext(AppContext);

export default useAppData;