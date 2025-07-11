import React from "react";
import IngredientList from "./ingredient";
import Recipe from "./recipe";
import { getRecipeFromMistral } from "./ai";
export default function Main(){

    const [ingredient,setIngredient]=React.useState([])


    const [GetRecipe,SetGetRecipe]=React.useState(false);

    function sub(formData){
     const newIngredient =formData.get("ingredient");
        setIngredient(p=>[...p,newIngredient]);
    }

    function togle(){
        SetGetRecipe(p=>!p)
    }

    return(
        <main>
            <form action={sub} className="add-ingredient" >
                <input type="text" placeholder="eg.oregano" aria-label="Add ingredient" 
                name="ingredient" />
                <button>Add ingredient</button>
            </form>
                <IngredientList ingredient={ingredient} togle={togle} />
               {GetRecipe && <Recipe />}
        </main>
    )
}