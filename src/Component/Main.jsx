import React from "react";
import IngredientList from "./ingredient";
import Recipe from "./recipe";
import { getRecipeFromGemini } from "./ai";
export default function Main(){

    const [ingredient,setIngredient]=React.useState([])

    const [loading, setLoading] = React.useState(false);

    const [GetRecipe,SetGetRecipe]=React.useState("");

    function sub(formData){
     const newIngredient =formData.get("ingredient");
        setIngredient(p=>[...p,newIngredient]);
    }

    async function togle(){ 
        setLoading(true); 
        const result = await getRecipeFromGemini(ingredient);
        SetGetRecipe(result);
        setLoading(false);
        
    }

    return(
        <main>
            <form action={sub} className="add-ingredient" >
                <input type="text" placeholder="eg.oregano" aria-label="Add ingredient" 
                name="ingredient" />
                <button>Add ingredient</button>
            </form>
                <IngredientList ingredient={ingredient} togle={togle} />
                {loading && <div className="loader">🍳 Cooking up your recipe...</div>}
               {GetRecipe && <Recipe recipe={GetRecipe} />}
        </main>
    )
}