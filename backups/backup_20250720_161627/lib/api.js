// oradia-frontend/lib/api.js

// âœ… Supprime le slash final Ã©ventuel dans lâ€™URL backend
const API_URL = process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "");

export async function generatePage(prompt) {
  try {
    const response = await fetch(`${API_URL}/api/generate-page`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.statusText}`);
    }

    const data = await response.json();
    return data.message || "âœ… Page gÃ©nÃ©rÃ©e avec succÃ¨s.";
  } catch (error) {
    console.error("Erreur API :", error);
    throw error;
  }
}
