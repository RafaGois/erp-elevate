import {addDoc, getDocs, collection } from "firebase/firestore";

import User from "../models/user";
import db from "@/lib/config/firestore"

async function findAll(): Promise<User[]> {
  const querySnapshot = await getDocs(collection(db, "users"));
  
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
