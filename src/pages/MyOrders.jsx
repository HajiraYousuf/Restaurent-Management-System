
import { useMemo, useState } from 'react';
import { ChevronRight, Package, ShoppingBag } from 'lucide-react';
import { Title } from '../components/Shared';

const filters = ['All', 'Pending', 'Preparing', 'Ready', 'Delivered'];

const statusStyles = {
  Pending: 'bg-stone-200 text-stone-600',
  Preparing: 'bg-orange-100 text-orange-700',
  Ready: 'bg-blue-100 text-blue-700',
  Delivered: 'bg-green-100 text-green-700',
};

export default function MyOrders() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Get logged-in user
  const savedUser =
    localStorage.getItem('royalbite_user') ||
    sessionStorage.getItem('royalbite_user');

  const currentUser = savedUser ? JSON.parse(savedUser) : null;

  // Get all orders
  const allOrders = JSON.parse(
    localStorage.getItem('royalbite_orders') || '[]'
  );

  // Show only orders belonging to the logged-in user
  const userOrders = currentUser
    ? allOrders.filter(
        (order) => order.customer?.email === currentUser.email
      )
    : [];

  // Filter orders by status
  const filteredOrders = useMemo(() => {
    if (activeFilter === 'All') return userOrders;

    return userOrders.filter(
      (order) => order.status === activeFilter
    );
  }, [activeFilter, allOrders, currentUser?.email]);

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate total quantity
  const getItemCount = (foods) => {
    return foods.reduce(
      (total, food) => total + (food.quantity || 1),
      0
    );
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">

      <Title
        eyebrow="Your food journey"
        title="My Orders"
        desc="View your orders and track their progress."
      />

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
              activeFilter === filter
                ? 'bg-[#741F35] text-white'
                : 'border border-[#e9dfd4] bg-white text-stone-600 hover:border-[#741F35]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filteredOrders.length > 0 ? (
        filteredOrders
          .slice()
          .reverse()
          .map((order) => {
            const firstFood = order.foods?.[0];

            const itemCount = getItemCount(order.foods || []);

            const foodNames = order.foods
              ?.map((food) => food.name)
              .join(', ');

            return (
              <article
                key={order.id}
                className="mb-3 flex flex-wrap items-center gap-4 rounded-xl border border-[#e9dfd4] bg-[#fffdf9] p-4"
              >
                {/* Food Image */}
                {firstFood && (
                  <img
                    src={firstFood.image}
                    alt={firstFood.name}
                    className="h-16 w-20 rounded-lg object-cover"
                  />
                )}

                {/* Order Information */}
                <div className="min-w-[140px] flex-1">
                  <p className="text-[10px] text-stone-400">
                    #RB{String(order.id).slice(-6)}
                  </p>

                  <h3 className="mt-1 text-sm font-bold text-stone-800">
                    {foodNames}
                  </h3>

                  <p className="mt-1 text-[11px] text-stone-500">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    {' · '}
                    {formatDate(order.date)}
                  </p>

                  <p className="mt-1 text-xs font-bold text-[#741F35]">
                    ${Number(order.total).toFixed(2)}
                  </p>
                </div>

                {/* Status */}
                <span
                  className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${
                    statusStyles[order.status] ||
                    'bg-stone-100 text-stone-600'
                  }`}
                >
                  {order.status}
                </span>

                <ChevronRight
                  size={16}
                  className="text-stone-400"
                />
              </article>
            );
          })
      ) : (
        /* Empty State */
        <div className="rounded-xl border border-dashed border-[#e9dfd4] bg-[#fffdf9] px-5 py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5e9e5]">
            {activeFilter === 'All' ? (
              <ShoppingBag
                size={25}
                className="text-[#741F35]"
              />
            ) : (
              <Package
                size={25}
                className="text-[#741F35]"
              />
            )}
          </div>

          <h3 className="text-base font-bold text-stone-800">
            {activeFilter === 'All'
              ? 'No orders yet'
              : `No ${activeFilter} orders`}
          </h3>

          <p className="mt-2 text-sm text-stone-500">
            {activeFilter === 'All'
              ? 'Your food orders will appear here after checkout.'
              : 'There are no orders with this status.'}
          </p>
        </div>
      )}

    </div>
  );
}
