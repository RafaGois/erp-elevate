
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, signOut} from "firebase/auth";
import { query, collection, where, getDocs, setDoc, doc, getFirestore } from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

async function loginWithEmailAndPassword(username: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
        console.log(error);  
    }
}

async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: user.displayName,
            });
        }
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

function logout() {
    signOut(auth);
}

function recoverPassword(email: string) {
    try {
        sendPasswordResetEmail(auth, email);
        alert("Email de recuperação enviado");
    } catch (error) {
        console.log(error);
    }
}

export { auth, loginWithEmailAndPassword, loginWithGoogle, recoverPassword, logout };

