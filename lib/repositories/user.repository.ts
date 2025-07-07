import { app } from "@/firebase/config";
import { getFirestore, addDoc, getDocs, collection } from "firebase/firestore";


import User from "../models/user";
const db = getFirestore(app);

async function findAll(): Promise<User[]> {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
  return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as User));
}

async function create(data: User): Promise<User> {
  await addDoc(collection(db, "users"),
    { ...data })

  return data;
}


export default {
  findAll,
  create
}
