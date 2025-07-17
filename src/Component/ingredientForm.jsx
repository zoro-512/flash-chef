import { useState } from "react";
import IngredientList from "./ingredient";
import { getRecipeFromGemini } from "./ai";
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ING() {
  const [inputValue, setInputValue] = useState('');
  const [exp, setExp] = useState(false);
  const [i, setI] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
    const [xloading, setxLoading] = useState(false);
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (ingredient) => {
    const newItem = ingredient || inputValue;
    console.log('Input:', newItem);
    setI(prev => [...prev, newItem]);
    setInputValue("");
  };

  const quickIngredients = [
    '🥕 Carrots', '🍅 Tomatoes', '🧄 Garlic', '🧅 Onions',
    '🥔 Potatoes', '🍗 Chicken', '🐟 Fish',
    '🍝 Pasta', '🍚 Rice', '🥚 Eggs', '🧀 Cheese'
  ];

  const qk = quickIngredients.map((item, index) => (
    <div
      className="qkCell"
      onClick={() => handleSubmit(item)}
      key={index}
    >
      {item}
    </div>
  ));

  const handleGenerate = async () => {
    setxLoading(true)
    setLoading(true);
    const result = await getRecipeFromGemini(i);
    setRecipe(result);
    setLoading(false);
    
  };

  return (
    <div className="cen">
      <div className="ING">
        <div className="ADD-top">
          <img src="src/assets/chef-claude-icon.png" alt="not found" />
          <h2>ADD YOUR INGREDIENT</h2>
        </div>

        <div className="input-box">
          <input
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
            onChange={handleChange}
            type="text"
            className="inp"
            placeholder="eg:chicken,eggs....."
          />
          <button onClick={handleSubmit}>+ADD</button>
        </div>

        <div className="lis">
          <IngredientList p={i} s={setI} />
        </div>
      </div>

      <button className="qkb" onClick={() => setExp(!exp)}>Quick ADD</button>

      <div className="qk">
        {exp && qk}
      </div>

      <div className="genREC">
        <button className="qkb" onClick={handleGenerate}>Generate Recipe</button>
      </div>

      {xloading && (<div className="recipe-box">
        {loading ? (
          <>
            <Skeleton height={3}  count={1} />
            <Skeleton height={2} count={5} />
          </>
        ) : (
          recipe && <ReactMarkdown>{recipe}</ReactMarkdown>
        )}
      </div>)}
    </div>
  );
}
