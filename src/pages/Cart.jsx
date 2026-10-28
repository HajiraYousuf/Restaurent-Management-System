import { Link } from 'react-router-dom';
import { Title } from '../components/Shared';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import useCart from '../CartContext';

export default function Cart() {
  const {
    foods,
    total,
    removeFromCart,
    updateFoodQuantity,
  } = useCart();

  const deliveryFee = foods.length > 0 ? 2 : 0;

  const grandTotal = total + deliveryFee;

  return (
    <div className="mx-auto max-w-6xl px-4 py-9">

      <Title
        eyebrow="Almost yours"
        title="Your Cart"
        action={
          <Link
            to="/menu"
            className="text-xs font-bold text-[#741F35]"
          >
            Continue Shopping
          </Link>
        }
      />

      <div className="rounded-xl border border-[#e9dfd4] bg-[#fffdf9] p-4 md:p-6">

        {foods.length === 0 ? (

          <div className="py-14 text-center">
            <ShoppingBag
              size={45}
              className="mx-auto mb-4 text-stone-400"
            />

            <h2 className="mb-2 text-lg font-bold text-[#741F35]">
              Your Cart is Empty
            </h2>

            <p className="mb-5 text-sm text-stone-500">
              You haven't added any food yet.
            </p>

            <Link
              to="/menu"
              className="inline-block rounded-lg bg-[#741F35] px-6 py-3 text-xs font-bold text-white"
            >
              Explore Menu
            </Link>
          </div>

        ) : (

          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-xs">

                <thead className="border-b border-[#e9dfd4] text-stone-500">
                  <tr>
                    {['Item', 'Price', 'Quantity', 'Total', ''].map((item) => (
                      <th key={item} className="px-3 py-4 font-medium">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {foods.map((food) => (
                    <tr
                      key={food.id}
                      className="border-b border-[#eee5dc]"
                    >

                      <td className="px-3 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="h-14 w-16 rounded-lg object-cover"
                          />

                          <b>{food.name}</b>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        ${Number(food.price).toFixed(2)}
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex w-fit items-center gap-3 rounded-md border border-[#e9dfd4] px-2 py-2">

                          <button
                            onClick={() =>
                              updateFoodQuantity(food, food.quantity - 1)
                            }
                            className="text-[#741F35]"
                          >
                            <Minus size={13} />
                          </button>

                          <span className="font-bold">
                            {food.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateFoodQuantity(food, food.quantity + 1)
                            }
                            className="text-[#741F35]"
                          >
                            <Plus size={13} />
                          </button>

                        </div>
                      </td>

                      <td className="px-3 py-4 font-bold">
                        ${(Number(food.price) * food.quantity).toFixed(2)}
                      </td>

                      <td className="px-3 py-4">
                        <button
                          onClick={() => removeFromCart(food)}
                          className="text-[#741F35] hover:text-red-600"
                          aria-label={`Remove ${food.name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="ml-auto mt-6 max-w-xs space-y-3 text-xs">

              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-stone-500">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between border-t border-[#e9dfd4] pt-4 text-base font-bold text-[#741F35]">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <Link
                to="/checkout"
                className="block rounded-lg bg-[#741F35] px-5 py-3 text-center text-xs font-bold text-white hover:bg-[#5c172a]"
              >
                Proceed to Checkout
              </Link>

            </div>
          </>
        )}

      </div>
    </div>
  );
}