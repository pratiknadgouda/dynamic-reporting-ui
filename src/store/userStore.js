import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      loggedIn: !!sessionStorage.getItem("token"),
      token: sessionStorage.getItem("token"),
      user: "",
      email: "",
      login: (user, email, token) => {
        set({ loggedIn: true, token, user, email });
        sessionStorage.setItem("token", token);
      },
      logout: () => {
        set({ loggedIn: false, token: null, user: null, email: null });
        sessionStorage.setItem("token", null);
      },
    }),
    {
      name: "user-storage", // unique name
    }
  )
);

export default userStore;
