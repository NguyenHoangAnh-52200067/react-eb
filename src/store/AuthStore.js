import { create } from "zustand";

const useAuthSore = create((set) => ({
  email: "",
  password: "",
  isLogin: false,
  role: [],
  avatar: "",
  setIsLogin: (isLogin) => set(() => ({ isLogin: isLogin })),
  setRole: (role) => set(() => ({ role: role })),
  setEmail: (email) => set(() => ({ email: email })),
  setPassword: (password) => set(() => ({ password: password })),
  setAvatar: (avatar) => set(() => ({ avatar: avatar })),
  logout: () => {
    set(() => ({ isLogin: false }));
    set(() => ({ role: [] }));
    set(() => ({ email: "" }));
    set(() => ({ password: "" }));
    set(() => ({ avatar: "" }));
  },
}));

export default useAuthSore;
