export async function getRecipeFromGemini(ingredientsArr) {
  // const GEMINI_API_KEY = '';
  const model = "gemini-2.0-flash"; 
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is missing.");
    return "API key is not configured.";
  }

  if (!Array.isArray(ingredientsArr) || ingredientsArr.length === 0) {
    return "Please provide a list of ingredients.";
  }

  const ingredientsString = ingredientsArr.join(", ");
  const userPrompt = `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;

  const systemPrompt = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "API call failed");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    return reply?.trim() || "No recipe was generated.";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Sorry, I couldn't generate a recipe using Gemini.";
  }
}
