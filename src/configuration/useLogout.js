import useAuthSore from "../store/AuthStore";
import useSubmit from "./useSubmit";

export default function useLogout({ onSuccess }) {
  const { submit: submitFunc } = useSubmit("post");

  const clearUser = useAuthSore((state) => state.logout);

  return async function logout() {
    try {
      const res = await submitFunc(null, "/auth/logout");
      if (res) {
        clearUser();
        onSuccess?.();
      }
    } catch (error) {
      console.log(error);
    }
  };
}
