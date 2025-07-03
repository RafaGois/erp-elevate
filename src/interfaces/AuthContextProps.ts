import User from "../models/User";

export default interface AuthContextProps {
  user?: User;
  login?: (recivedUser: User) => Promise<number>;
  register?: (recivedUser: User) => Promise<void>;
  logout?: () => void;
  loading?: boolean;
}
