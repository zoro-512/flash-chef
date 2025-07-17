export async function getRecipeFromGemini({ ingredients, diet, cuisine }) {
  const model = "gemini-2.0-flash";
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is missing.");
    return "API key is not configured.";
  }

  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return "Please provide a list of ingredients.";
  }

  const ingredientsString = ingredients.join(", ");
  const dietPref = diet || "none";
  const cuisinePref = cuisine || "any";

  const userPrompt = `
I have the following ingredients: ${ingredientsString}.
I prefer a ${dietPref} diet and I'm in the mood for ${cuisinePref} cuisine.
Please give me a creative, simple recipe recommendation.
`;

  const systemPrompt = `
You are a helpful chef assistant that receives a user's ingredients and preferences, then suggests a recipe.

Guidelines:
- Use most of the user's ingredients.
- Add minimal extra ingredients if needed (only common ones).
- Respect dietary preference: ${dietPref}.
- Respect cuisine preference: ${cuisinePref}.
- Format your response in **Markdown** like below:

# [Recipe Title]

## Ingredients
- Bullet point list

## Steps
1. Step-by-step clear instructions

## Optional Notes
- Tips, substitutions, or serving suggestions

Also, make it visually attractive by including relevant food emojis throughout the recipe.

Do NOT include anything outside this markdown format.
`;

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
    parts: [
      {
        text: `${systemPrompt}\n\n${userPrompt}`
      }
    ]
  }
],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Gemini API call failed");
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply?.trim() || "No recipe was generated.";
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Sorry, I couldn't generate a recipe at the moment.";
  }
}
