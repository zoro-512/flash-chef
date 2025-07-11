export default function Main(){

    function sub(event){
    event.preventDefault();
    console.log("done");
    const formData=new FormData(event.currentTarget)
     const newIngredient =formData.get("ingredient");

    }

    return(
        <main>
            <form onSubmit={sub} className="add-ingredient" >
                <input type="text" placeholder="eg.oregano" aria-label="Add ingredient" 
                name="ingredient" />
                <button>Add ingredient</button>
            </form>

        </main>
    )
}