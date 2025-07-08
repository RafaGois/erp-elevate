import { addDoc, getDocs, collection, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

import User from "../models/user";
import db from "@/lib/config/firestore"

async function findAll(): Promise<User[]> {
  const querySnapshot = await getDocs(collection(db, "users"));

  return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as User));
}

async function create(data: User): Promise<User> {
  const docRef = await addDoc(collection(db, "users"), { ...data });
  return { ...data, uid: docRef.id } as User;
}

async function findById(id: string): Promise<User | null> {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { uid: docSnap.id, ...docSnap.data() } as User;
  }

  return null;
}

async function update(id: string, data: Partial<User>): Promise<User> {
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, data);

  const updatedDoc = await getDoc(docRef);
  return { uid: updatedDoc.id, ...updatedDoc.data() } as User;
}

async function remove(id: string): Promise<void> {
  const docRef = doc(db, "users", id);
  await deleteDoc(docRef);
}

export {
  findAll,
  create,
  findById,
  update,
  remove
}
