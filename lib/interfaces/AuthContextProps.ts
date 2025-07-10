import User from "../models/User";

export default interface AuthContextProps {
  user?: User | null;
  login?: (recivedUser: User) => Promise<string>;
  loginGoogle?: () => Promise<string>;
  logout?: () => void;
  loading?: boolean;
}
