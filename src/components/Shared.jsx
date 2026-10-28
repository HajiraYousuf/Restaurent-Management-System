import { Link } from 'react-router-dom';
import useCart from '../CartContext';
import { Plus } from 'lucide-react';

// Component-ga Title
export function Title({ eyebrow, title, desc, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[.22em] text-[#a7781f]">
            {eyebrow}
          </p>
        )}
        <h2 className="display text-2xl font-bold">{title}</h2>
        {desc && <p className="mt-1 text-sm text-stone-500">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

// Component-ga FoodCard
export function FoodCard({ food }) {

  const { addToCart } =useCart();
    const handleAddToCart =()=>{
      
      console.log("food added")
      addToCart(food);
    };
    
  return (
    <article className="overflow-hidden rounded-xl border border-[#e9dfd4] bg-[#fffdf9] shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/food-details/${food.id}`}>
        <img
          src={food.image}
          alt={food.name}
          className="h-40 w-full object-cover"
        />
      </Link>
      <div className="p-3.5">
        <div className="flex justify-between gap-2">
          <h3 className="display text-sm font-bold">{food.name}</h3>
          <span className="text-[11px] text-[#b78013]">★ {food.rating}</span>
        </div>
        <p className="mb-3 mt-1 text-xs text-stone-500">{food.category}</p>
        <div className="flex items-center justify-between">
          <b className="text-[#741F35]">{food.price}</b>
          <button onClick={handleAddToCart} className="rounded-lg bg-[#D9A441] px-3 py-1.5 font-bold text-[#32121d]">
            <Plus size={17} className='text-black'/>
          </button>
        </div>
      </div>
    </article>
  );
}