document.getElementById("matchForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const teamA = document.getElementById("teamA").value;
    const teamB = document.getElementById("teamB").value;
    const venue = document.getElementById("venue").value;
    const pitch = document.getElementById("pitch").value;
    const formA = document.getElementById("formA").value;
    const formB = document.getElementById("formB").value;
    const players = document.getElementById("players").value;
  
    const prompt = `
  Predict the winner of a cricket match based on the following:
  Match: ${teamA} vs ${teamB}
  Venue: ${venue}
  Pitch: ${pitch}
  Form:
  ${teamA}: ${formA}
  ${teamB}: ${formB}
  Key Players:
  ${players}
  `;
  
    document.getElementById("predictionText").innerText = "Loading prediction...";
  
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a cricket match prediction expert." },
            { role: "user", content: prompt }
          ]
        })
      });
  
      const data = await response.json();
      const result = data.choices?.[0]?.message?.content || "Prediction could not be retrieved.";
      document.getElementById("predictionText").innerText = result;
  
    } catch (error) {
      console.error("Prediction error:", error);
      document.getElementById("predictionText").innerText = "Error getting prediction.";
    }
  });
  
  