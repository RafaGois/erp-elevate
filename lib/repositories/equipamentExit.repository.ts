import { addDoc, getDocs, collection, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

import db from "@/lib/config/firestore"
import { EquipamentExit } from "../models/EquipamentExit";

async function findAll(): Promise<EquipamentExit[]> {
  const querySnapshot = await getDocs(collection(db, "equipamentExits"));

  return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as EquipamentExit));
}

async function create(data: EquipamentExit): Promise<EquipamentExit> {
  const docRef = await addDoc(collection(db, "equipamentExits"), { ...data });
  return { ...data, uid: docRef.id } as EquipamentExit;
}

async function findById(id: string): Promise<EquipamentExit | null> {
  const docRef = doc(db, "equipamentExits", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { uid: docSnap.id, ...docSnap.data() } as EquipamentExit;
  }

  return null;
}

async function update(id: string, data: Partial<EquipamentExit>): Promise<EquipamentExit> {
  const docRef = doc(db, "equipamentExits", id);
  await updateDoc(docRef, data);

  const updatedDoc = await getDoc(docRef);
  return { uid: updatedDoc.id, ...updatedDoc.data() } as EquipamentExit;
}

async function remove(id: string): Promise<void> {
  const docRef = doc(db, "equipamentExits", id);
  await deleteDoc(docRef);
}

export {
  findAll,
  create,
  findById,
  update,
  remove
}
