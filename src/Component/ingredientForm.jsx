import { useState } from "react";
import IngredientList from "./ingredient";
import { getRecipeFromGemini } from "./ai";
import ReactMarkdown from 'react-markdown';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import RecipeCard from "./recipeCard";


export default function ING() {
  const [inputValue, setInputValue] = useState('');
  const [exp, setExp] = useState(false);
  const [i, setI] = useState([]);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);
    const [xloading, setxLoading] = useState(false);
    
const [selectedDiet, setSelectedDiet] = useState('');
const [selectedCons, setSelectedCons] = useState('');
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
    const result = await getRecipeFromGemini({
    ingredients: i,
    diet: selectedDiet,
    cuisine: selectedCons,
  });
  setRecipe(result);
    setLoading(false);
    
  };


  const dietaryOptions = [
  { label: "🥦 Vegetarian", value: "vegetarian" },
  { label: "🌱 Vegan", value: "vegan" },
  { label: "🍖 Non-Vegetarian", value: "non-vegetarian" },
  { label: "🥓 Keto", value: "keto" },
  { label: "🌾 Gluten-Free", value: "gluten-free" },
  { label: "❌ None", value: "none" }
];
 
const diet=dietaryOptions.map((val,index)=>(
<option className="Opt"> 
 {val.label}
</option>));

const cuisineOptions = [
  { label: "🇮🇳 Indian", value: "indian" },
  { label: "🇮🇹 Italian", value: "italian" },
  { label: "🇨🇳 Chinese", value: "chinese" },
  { label: "🇲🇽 Mexican", value: "mexican" },
  { label: "🇺🇸 American", value: "american" },
  { label: "🇯🇵 Japanese", value: "japanese" },
  { label: "🇬🇷 Mediterranean", value: "mediterranean" }
];


 
const con=cuisineOptions.map((val,index)=>(
<option className="Opt"> 
 {val.label}
</option>));


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
          <button onClick={() => handleSubmit(inputValue)}>+ADD</button>
        </div>

        <div className="lis">
          <IngredientList p={i} s={setI} />
        </div>
                      <div className="sel">
                      <select className="diet" value={selectedDiet} 
                      onChange={(e) => setSelectedDiet(e.target.value)}>
                      {diet}
                      </select>

                      <select className="cuis" value={selectedCons} 
                      onChange={(e) => setSelectedCons(e.target.value)}>
                      {con}
                      </select>

                      </div>
      </div>

      <button className="qkb" onClick={() => setExp(!exp)}>Quick ADD</button>

      <div className="qk">
        {exp && qk}
      </div>
           
            

      <div className="genREC">
        <button className="qkb" onClick={handleGenerate}>⚡Generate Recipe</button>
      </div>
        


      {xloading && (<div className="recipe-box">
        {loading ? (
            <div
                    style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    width: '40vw', 
                    margin: ' 10px',
                    }}
                    >
                    <Skeleton
                    width='40vw'
                    height='50vh'
                    borderRadius={10}
                    baseColor="rgba(255, 255, 255, 0.07)"  // solid glass-like base
                    highlightColor="rgba(255, 255, 255, 0.15)" // shimmer highlight
                    duration={1.4}
                    />
                    </div>
        ) : (
          recipe && <RecipeCard recipe={recipe} />
        )}
      </div>)}
    </div>
  );
}
