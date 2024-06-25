// lib/auth.js
export async function verifyAuth(token) {
  // Implementa la lógica para verificar el token de autenticación
  // Esto podría ser una llamada a tu backend o verificación de un token JWT
  if (!token) return false;

  try {
    // Verifica el token, por ejemplo, usando una función de tu backend
    const response = await fetch("https://your-backend.com/api/verifyToken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.isAuthenticated;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}
