import User from "../models/User";

export default interface AuthContextProps {
  user?: User | null;
  login?: (recivedUser: User) => Promise<string>;
  register?: (recivedUser: User) => Promise<string>;
  logout?: () => void;
  loading?: boolean;
}
