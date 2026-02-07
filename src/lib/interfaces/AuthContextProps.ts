import User from "../models/User";

export default interface AuthContextProps {
  user?: User | null;
  login?: (recivedUser: User) => Promise<string>;
  loginWithGoogle?: (googleIdToken: string) => Promise<string | false>;
  register?: (recivedUser: User) => Promise<string>;
  logout?: () => void;
  loading?: boolean;
}
