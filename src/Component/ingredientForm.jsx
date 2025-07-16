import { useState,useEffect } from "react";
import IngredientList from "./ingredient";
export default function ING(){
     const [inputValue, setInputValue] = useState('');
     const[exp,setExp]=useState(false);
  const handleChange = (e) => {
    setInputValue(e.target.value); 
  };
  const [i,setI]=useState([]);

const handleSubmit = (ingredient) => {
  const newItem = ingredient || inputValue;
  console.log('Input:', newItem); 
  setI(prev => [...prev, newItem]);
  setInputValue("");
}

   
  const quickIngredients = [
    '🥕 Carrots', '🍅 Tomatoes', '🧄 Garlic', '🧅 Onions', 
    '🥔 Potatoes', '🍗 Chicken',  '🐟 Fish',
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

    return(
    <div className="cen">
<div className="ING">
      <div className="ADD-top">
        <img src="src\assets\chef-claude-icon.png" alt="not found" srcset="" />
        <h2>ADD YOUR INGREDIENT</h2>
        
      </div>
             <div className="input-box">
        <input 
        value={inputValue} onKeyDown={(e) => {
    if (e.key === 'Enter') {
      handleSubmit();  }  }} 
      onChange={handleChange} 
      type="text" className="inp" placeholder="eg:chicken,eggs....."
       />
        <button onClick={
             handleSubmit
        }>+ADD</button>

            </div>
            <div className="lis">
            <IngredientList p={i}  s={setI}/>
            
            </div>

</div>
<button className="qkb" onClick={()=>setExp(!exp)}>Quick ADD</button>
<div className="qk">
  
  {exp && qk}
  
</div>

 
    </div>

    )
}