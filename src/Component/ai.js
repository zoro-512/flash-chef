import.meta.env
export async function getRecipeFromMistral(ingredientsArr) {
  const HF_TOKEN = import.meta.env.VITE_HF_ACCESS_TOKEN; 
  const model = "mistralai/Mixtral-8x7B-Instruct-v0.1";

  const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

  const ingredientsString = ingredientsArr.join(", ");
  const prompt = `${SYSTEM_PROMPT}\n\nUser: I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`;

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
        },
      }),
    });

    const result = await response.json();

    if (result.error) throw new Error(result.error);

    return result.generated_text || result[0]?.generated_text || "No response from model.";
  } catch (err) {
    console.error("Error fetching recipe:", err.message);
    return "Sorry, I couldn't generate a recipe.";
  }
}
