export async function GET() {
  const familles = {
    "Émotions": ["Joie", "Tristesse", "Colère", "Peur", "Sérénité"],
    "Besoins": ["Sécurité", "Amour", "Reconnaissance", "Liberté", "Clarté"],
    "Transmutation": ["Lâcher-Prise", "Transformation", "Résilience", "Guérison", "Élévation"],
    "Archétypes": ["Sage", "Guerrier", "Amant", "Créateur", "Alchimiste"],
    "Révélations": ["Prendre Conscience", "Illumination", "Ouverture", "Vision", "Éveil"],
    "Actions": ["Agir", "Exprimer", "Oser", "Ancrer", "Partager"]
  };

  const tirage = await Promise.all(
    Object.entries(familles).map(async ([famille, cartes]) => {
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
        return {
          famille,
          carte,
          interpretation: data.choices?.[0]?.message?.content?.trim() || "Erreur OpenAI",
        };
      } catch (err) {
        console.error("Erreur OpenAI :", err);
        return { famille, carte, interpretation: "Erreur lors de la génération." };
      }
    })
  );

  return Response.json({ tirage });
}
