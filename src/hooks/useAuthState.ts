import { AppState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function useAuthState() {
  const user = useSelector((state: AppState) => state.auth);
  if (user) {
    return user;
  }
  return null
}
