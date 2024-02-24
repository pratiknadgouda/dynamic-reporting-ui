import { create } from "zustand";
import { persist } from "zustand/middleware";

const userStore = create(
  persist(
    (set) => ({
      loggedIn: !!sessionStorage.getItem("token"),
      token: sessionStorage.getItem("token"),
      user: "",
      email: "",
      role: "",
      login: (user, email, role, token) => {
        set({ loggedIn: true, token, user, email, role });
        sessionStorage.setItem("token", token);
      },
      logout: () => {
        set({
          loggedIn: false,
          token: null,
          user: null,
          email: null,
          role: null,
        });
        sessionStorage.setItem("token", null);
      },
    }),
    {
      name: "user-storage", // unique name
    }
  )
);

export default userStore;
