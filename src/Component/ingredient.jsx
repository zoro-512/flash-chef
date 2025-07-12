export default function IngredientList(prop){
    const ingredientsListItems = prop.ingredient.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ));

   return ( <section>
                {prop.ingredient.length>0 && <h2>Ingredients on hand:</h2>}
                <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                {prop.ingredient.length>3 &&<div className="get-recipe-container">
                    <div ref={prop.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div >
                    <button onClick={prop.togle}>Get a recipe</button>

                </div>}



            </section>)
}