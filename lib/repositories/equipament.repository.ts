import { addDoc, getDocs, collection, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

import db from "@/lib/config/firestore"
import Equipament, { IEquipament } from "../models/Equipament";

async function findAll(): Promise<Equipament[]> {
  const querySnapshot = await getDocs(collection(db, "equipaments"));

  return querySnapshot.docs.map((doc) => ({ uid: doc.id, ...doc.data() } as Equipament));
}

async function create(data: Equipament): Promise<Equipament> {
  const docRef = await addDoc(collection(db, "equipaments"), { ...data });
  return { ...data, uid: docRef.id } as Equipament;
}

async function findById(id: string): Promise<Equipament | null> {
  const docRef = doc(db, "equipaments", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { uid: docSnap.id, ...docSnap.data() } as Equipament;
  }

  return null;
}

async function update(id: string, data: Partial<IEquipament>): Promise<Equipament> {
  const docRef = doc(db, "equipaments", id);
  await updateDoc(docRef, data);

  const updatedDoc = await getDoc(docRef);
  return { uid: updatedDoc.id, ...updatedDoc.data() } as Equipament;
}

async function remove(id: string): Promise<void> {
  const docRef = doc(db, "equipaments", id);
  await deleteDoc(docRef);
}

export {
  findAll,
  create,
  findById,
  update,
  remove
}
