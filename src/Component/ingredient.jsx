export default function IngredientList({ p, s }) {
  return (
    <section className="list-box">
      {p.map((item, index) => (
        <div
          className="list"
          key={index}
         
        >
          {item} 
          <svg onClick={() => {
            const newList = p.filter((_, i) => i !== index);
            s(newList); 
          }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
        </div>
      ))}
    </section>
  );
}
