
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, Wallet } from 'lucide-react';
import useCart from '../CartContext';

// Reusable Input Field
function Field({
  label,
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
}) {
  return (
    <label className="mb-4 block text-xs font-bold">
      {label}

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="mt-2 w-full rounded-lg border border-[#e9dfd4] bg-white px-3 py-3 text-xs font-normal outline-none focus:border-[#D9A441]"
      />
    </label>
  );
}

export default function Checkout() {
  const navigate = useNavigate();

  const { foods, clearCart } = useCart();

  // Get logged-in user
  const savedUser =
    localStorage.getItem('royalbite_user') ||
    sessionStorage.getItem('royalbite_user');

  const loggedUser = savedUser ? JSON.parse(savedUser) : null;

  // Customer information
  const [customer, setCustomer] = useState({
    name: loggedUser?.name || '',
    email: loggedUser?.email || '',
    phone: loggedUser?.phone || '',
    address: '',
  });

  // Payment method
  const [payment, setPayment] = useState('Cash on Delivery');

  // Handle customer input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate subtotal
  const subtotal = foods.reduce(
    (total, food) =>
      total + Number(food.price) * (food.quantity || 1),
    0
  );

  // Delivery fee
  const deliveryFee = foods.length > 0 ? 2 : 0;

  // Grand total
  const grandTotal = subtotal + deliveryFee;

  // Place order
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!loggedUser) {
      navigate('/login');
      return;
    }

    if (foods.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!customer.email) {
      alert('Your account email is missing. Please login again.');
      return;
    }

    // Create order
    const order = {
      id: Date.now(),
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      },
      foods: foods.map((food) => ({ ...food })),
      payment,
      subtotal,
      deliveryFee,
      total: grandTotal,
      status: 'Pending',
      date: new Date().toISOString(),
    };

    // Get previous orders
    const previousOrders = JSON.parse(
      localStorage.getItem('royalbite_orders') || '[]'
    );

    // Save new order
    localStorage.setItem(
      'royalbite_orders',
      JSON.stringify([...previousOrders, order])
    );

    // Success message
    alert(
      `Order placed successfully!\n\n` +
      `Customer: ${customer.name}\n` +
      `Phone: ${customer.phone}\n` +
      `Address: ${customer.address}\n` +
      `Payment: ${payment}\n` +
      `Total: $${grandTotal.toFixed(2)}`
    );

    // Clear cart
    clearCart();

    // Navigate to My Orders
    navigate('/my-orders');
  };

  // Require login
  if (!loggedUser) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="rounded-2xl border border-[#e9dfd4] bg-[#fffdf9] p-8">

          <h2 className="display text-2xl font-bold text-[#741F35]">
            Login Required
          </h2>

          <p className="my-4 text-sm text-stone-500">
            Please login or create an account before proceeding to checkout.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="w-full rounded-lg bg-[#741F35] py-3 text-xs font-bold text-white"
          >
            Login to Continue
          </button>

          <button
            onClick={() => navigate('/register')}
            className="mt-3 w-full rounded-lg border border-[#741F35] py-3 text-xs font-bold text-[#741F35]"
          >
            Create Account
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a7781f]">
        One last step
      </p>

      <h1 className="display mb-6 mt-1 text-3xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">

        {/* Delivery Information */}
        <section className="rounded-xl border border-[#e9dfd4] bg-[#fffdf9] p-5 md:p-7">

          <h2 className="display mb-5 flex items-center gap-2 text-lg font-bold">
            <MapPin size={18} className="text-[#741F35]" />
            Delivery Information
          </h2>

          <form onSubmit={handlePlaceOrder}>

            <div className="grid gap-x-4 sm:grid-cols-2">

              <Field
                label="Full Name"
                name="name"
                placeholder="Enter your name"
                value={customer.name}
                onChange={handleChange}
              />

              <Field
                label="Phone Number"
                name="phone"
                placeholder="+252 61 2345678"
                type="tel"
                value={customer.phone}
                onChange={handleChange}
              />

            </div>

            <Field
              label="Delivery Address"
              name="address"
              placeholder="Street, area, city"
              value={customer.address}
              onChange={handleChange}
            />

            {/* Payment Method */}
            <h3 className="display mb-3 mt-5 font-bold">
              Payment Method
            </h3>

            <label className="mb-2 flex cursor-pointer items-center gap-3 rounded-lg border border-[#741F35] bg-[#fbf4ec] p-4 text-xs">

              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={payment === 'Cash on Delivery'}
                onChange={(e) => setPayment(e.target.value)}
              />

              <Wallet size={18} />

              <span>
                <b>Cash on Delivery</b>
                <small className="mt-1 block text-stone-500">
                  Pay when your order arrives
                </small>
              </span>

            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#e9dfd4] bg-white p-4 text-xs">

              <input
                type="radio"
                name="payment"
                value="Card Payment"
                checked={payment === 'Card Payment'}
                onChange={(e) => setPayment(e.target.value)}
              />

              <CreditCard size={18} />

              <span>
                <b>Card Payment</b>
                <small className="mt-1 block text-stone-500">
                  Pay securely with your card
                </small>
              </span>

              <b className="ml-auto text-[#741F35]">
                VISA · MC
              </b>

            </label>

            <button
              type="submit"
              disabled={foods.length === 0}
              className="mt-5 w-full rounded-lg bg-[#741F35] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#5d182b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Place Order · ${grandTotal.toFixed(2)}
            </button>

          </form>
        </section>

        {/* Order Summary */}
        <aside className="h-fit rounded-xl border border-[#e9dfd4] bg-[#fffdf9] p-5">

          <h2 className="display mb-4 text-lg font-bold">
            Order Summary
          </h2>

          {foods.length === 0 ? (

            <p className="py-6 text-center text-sm text-stone-500">
              Your cart is empty.
            </p>

          ) : (

            foods.map((food) => (

              <div
                key={food.id}
                className="mb-4 flex items-center gap-3"
              >

                <img
                  src={food.image}
                  alt={food.name}
                  className="h-12 w-14 rounded-lg object-cover"
                />

                <span className="flex-1 text-xs font-semibold">
                  {food.name}

                  <small className="mt-1 block text-stone-500">
                    Qty: {food.quantity || 1}
                  </small>
                </span>

                <b className="text-xs">
                  ${(
                    Number(food.price) * (food.quantity || 1)
                  ).toFixed(2)}
                </b>

              </div>

            ))

          )}

          <hr className="my-4 border-[#e9dfd4]" />

          <div className="flex justify-between py-2 text-xs text-stone-500">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between py-2 text-xs text-stone-500">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          <div className="mt-2 flex justify-between border-t border-[#e9dfd4] pt-4 font-bold text-[#741F35]">
            <span>Total</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>

        </aside>

      </div>
    </div>
  );
}
