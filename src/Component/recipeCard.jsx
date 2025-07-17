import ReactMarkdown from 'react-markdown';

export default function RecipeCard({ recipe }) {
  if (!recipe) return null;

  function parseRecipe(markdown) {
    const data = {
      title: '',
      ingredients: '',
      steps: '',
      others: [],
    };

    const sections = markdown.split(/(?:^|\n)(?=##? )/); // Split by heading lines (## or #)

    sections.forEach((section) => {
      const lower = section.toLowerCase();
      if (lower.startsWith('# ')) {
        data.title = section.replace(/^# /, '').trim();
      } else if (lower.includes('ingredients')) {
        data.ingredients += section.trim() + '\n';
      } else if (lower.includes('steps') || lower.includes('instructions')) {
        data.steps += section.trim() + '\n';
      } else {
        data.others.push(section.trim());
      }
    });

    return data;
  }

  const { title, ingredients, steps, others } = parseRecipe(recipe);

  return (
    <div >
      {title && <h2 className="recipe-title">{title}</h2>}

      {ingredients && (
        <div className="recipe-section">
          <h3>🍽️ Ingredients</h3>
          <ReactMarkdown>{ingredients}</ReactMarkdown>
        </div>
      )}

      {steps && (
        <div className="recipe-section">
          <h3>👨‍🍳 Steps</h3>
          <ReactMarkdown>{steps}</ReactMarkdown>
        </div>
      )}

      {others.length > 0 &&
        others.map((sec, i) => (
          <div className="recipe-section" key={i}>
            <ReactMarkdown>{sec}</ReactMarkdown>
          </div>
        ))}
    </div>
  );
}
