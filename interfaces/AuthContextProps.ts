import User from "../models/user";

export default interface AuthContextProps {
  user?: User | null;
  login?: (recivedUser: User) => Promise<string>;
  loginGoogle?: () => Promise<string>;
  logout?: () => void;
  loading?: boolean;
}
