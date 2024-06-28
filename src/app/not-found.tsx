"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    // Redirige al usuario a la página de inicio después de 1 segundo
    const timeoutId = setTimeout(() => {
      router.push("/");
    }, 1000);

    // Limpia el timeout cuando el componente se desmonta
    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Redirecting to the homepage...</p>
    </div>
  );
}
