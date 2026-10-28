
import { useState } from 'react';
import { Clock3, Flame, Leaf, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { foods } from '../data/foods';
import { Link, useParams } from 'react-router-dom';
import useCart from '../CartContext';

export default function FoodDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const food = foods.find((f) => f.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  if (!food) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">Food Not Found!</h2>
        <Link to="/menu" className="mt-4 inline-block text-[#741F35]">
          Back to Menu
        </Link>
      </div>
    );
  }

  // Images belonging to this food
  const foodImages = food.images?.length
    ? food.images
    : [food.image];

  // Selected image or default image
  const mainImage = selectedImage || foodImages[0];

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrease quantity
  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Add selected food and quantity to cart
  const handleAddToCart = () => {
    addToCart(food, quantity);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 rounded-2xl border border-[#e9dfd4] bg-[#fffdf9] p-5 md:grid-cols-2 md:p-7">

        {/* Food Images */}
        <div>
          <img
            src={mainImage}
            alt={food.name}
            className="h-[330px] w-full rounded-xl object-cover"
          />

          <div className="mt-3 grid grid-cols-3 gap-3">
            {foodImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`overflow-hidden rounded-lg border-2 ${
                  mainImage === image
                    ? 'border-[#741F35]'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={image}
                  alt={`${food.name} preview ${index + 1}`}
                  className="h-20 w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Food Details */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a7781f]">
            Fresh from our kitchen
          </p>

          <h1 className="display mt-2 text-3xl font-bold">
            {food.name}
          </h1>

          <p className="mt-3 flex items-center gap-2 text-sm text-[#b78013]">
            <Star size={15} fill="currentColor" />
            {food.rating}
            <span className="text-xs text-stone-400">
              (124 reviews)
            </span>
          </p>

          <h2 className="mt-4 text-2xl font-bold text-[#741F35]">
            ${Number(food.price).toFixed(2)}
          </h2>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            {food.desc}
          </p>

          <p className="mt-5 flex gap-2 text-xs">
            <Leaf size={15} />
            Category: <b>{food.category}</b>
          </p>

          <p className="mt-3 flex gap-2 text-xs">
            <Clock3 size={15} />
            Prep Time: {food.prepTime ?? 20} mins
          </p>

          <p className="mt-3 flex gap-2 text-xs">
            <Flame size={15} />
            Calories: {food.calories ?? 450} kcal
          </p>

          {/* Quantity Selector */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-4 rounded-lg border border-[#e9dfd4] px-3 py-2">
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity === 1}
                className="text-[#741F35] disabled:opacity-40"
              >
                <Minus size={16} />
              </button>

              <span className="min-w-5 text-center text-sm font-bold">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                className="text-[#741F35]"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-2 rounded-lg bg-[#741F35] px-8 py-3 text-xs font-bold text-white transition hover:bg-[#5c172a]"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>

          {/* Selected quantity total */}
          <p className="mt-4 text-sm text-stone-500">
            Subtotal:
            <b className="ml-2 text-[#741F35]">
              ${(Number(food.price) * quantity).toFixed(2)}
            </b>
          </p>

          <hr className="my-6 border-[#e9dfd4]" />

          <h3 className="display font-bold">Ingredients</h3>

          <p className="mt-2 text-xs text-stone-500">
            {food.ingredients?.join(', ') ||
              'Ingredients information is not available.'}
          </p>
        </div>
      </div>
    </div>
  );
}
