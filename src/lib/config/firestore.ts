import { app } from "@/lib/firebase/config";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export default db;