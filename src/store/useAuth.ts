import { create } from "zustand";

interface AuthState {
  id: number | null;
  username: string | null;
  email: string | null;
  phone_number: string | null;

  login: (
    id: number,
    username: string,
    email: string,
    phone_number: string
  ) => void;
  logout: () => void;
}

const useAuth = create<AuthState>((set) => ({
  id: null,
  username: null,
  email: null,
  phone_number: null,

  login: (id, username, email, phone_number) =>
    set({
      id,
      username,
      email,
      phone_number,
    }),

  logout: () =>
    set({
      id: null,
      username: null,
      email: null,
      phone_number: null,
    }),
}));

export default useAuth;
