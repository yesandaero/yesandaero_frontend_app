import { router } from "expo-router";
import { useEffect } from "react";

export default function index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/Signup");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
}
