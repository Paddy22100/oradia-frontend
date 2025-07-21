export async function GET() {
  const familles = {
    "Ã‰motions": ["Joie", "Tristesse", "ColÃ¨re", "Peur", "SÃ©rÃ©nitÃ©"],
    "Besoins": ["SÃ©curitÃ©", "Amour", "Reconnaissance", "LibertÃ©", "ClartÃ©"],
    "Transmutation": ["LÃ¢cher-Prise", "Transformation", "RÃ©silience", "GuÃ©rison", "Ã‰lÃ©vation"],
    "ArchÃ©types": ["Sage", "Guerrier", "Amant", "CrÃ©ateur", "Alchimiste"],
    "RÃ©vÃ©lations": ["Prendre Conscience", "Illumination", "Ouverture", "Vision", "Ã‰veil"],
    "Actions": ["Agir", "Exprimer", "Oser", "Ancrer", "Partager"]
  };

  const tirage = await Promise.all(
    Object.entries(familles).map(async ([famille, cartes]) => {
      const carte = cartes[Math.floor(Math.random() * cartes.length)];
      const prompt = `Oracle Oradia â€“ Famille : ${famille}. Carte : "${carte}". Ã‰cris une interprÃ©tation vibratoire et poÃ©tique.`;

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
        return { famille, carte, interpretation: "Erreur lors de la gÃ©nÃ©ration." };
      }
    })
  );

  return Response.json({ tirage });
}
