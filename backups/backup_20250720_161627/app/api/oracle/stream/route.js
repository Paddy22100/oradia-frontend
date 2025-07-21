export const runtime = "edge";

export async function GET() {
  const encoder = new TextEncoder();
  const familles = {
    "Émotions": ["Joie", "Tristesse", "Colère", "Peur", "Sérénité"],
    "Besoins": ["Sécurité", "Amour", "Reconnaissance", "Liberté", "Clarté"],
    "Transmutation": ["Lâcher-Prise", "Transformation", "Résilience", "Guérison", "Élévation"],
    "Archétypes": ["Sage", "Guerrier", "Amant", "Créateur", "Alchimiste"],
    "Révélations": ["Prendre Conscience", "Illumination", "Ouverture", "Vision", "Éveil"],
    "Actions": ["Agir", "Exprimer", "Oser", "Ancrer", "Partager"]
  };

  const stream = new ReadableStream({
    async start(controller) {
      for (const [famille, cartes] of Object.entries(familles)) {
        const carte = cartes[Math.floor(Math.random() * cartes.length)];
        const prompt = `Oracle Oradia – Famille : ${famille}. Carte : "${carte}". Écris une interprétation vibratoire et poétique.`;

        try {
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4",
              messages: [{ role: "user", content: prompt }],
              max_tokens: 300,
            }),
          });

          const data = await response.json();
          const interpretation = data.choices?.[0]?.message?.content?.trim() || "Pas de réponse GPT";

          const card = JSON.stringify({ famille, carte, interpretation });
          controller.enqueue(encoder.encode(`${card}\n`));
        } catch (error) {
          console.error("❌ Erreur OpenAI :", error);
          const card = JSON.stringify({
            famille,
            carte,
            interpretation: "Erreur lors de la génération.",
          });
          controller.enqueue(encoder.encode(`${card}\n`));
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
    },
  });
}
