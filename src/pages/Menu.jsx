
import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Title, FoodCard } from '../components/Shared';
import { foods } from '../data/foods';

export default function Menu() {
  const cats = [
    'All Categories',
    'Burgers',
    'Pizza',
    'Pasta',
    'Rice',
    'Chicken',
    'Salads',
    'Sides',
    'Drinks',
    'Desserts',
  ];

  // Search state
  const [search, setSearch] = useState('');

  // Category state
  const [activeCategory, setActiveCategory] = useState('All Categories');

  // Filter logic
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === 'All Categories' ||
      food.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-10">

      <Title
        eyebrow="Discover your favourites"
        title="Our Menu"
        desc="Delicious meals for every taste."
      />

      <div className="grid gap-5 lg:grid-cols-[210px_1fr]">

        {/* Categories Sidebar */}
        <aside className="h-fit rounded-xl border border-[#e9dfd4] bg-[#fffdf9] p-4">
          <h3 className="display mb-3 font-bold">Categories</h3>

          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={
                'mb-1 flex w-full gap-2 rounded-lg px-3 py-2.5 text-left text-xs ' +
                (activeCategory === c
                  ? 'bg-[#741F35] text-white'
                  : 'text-stone-600 hover:bg-[#f5e9dd]')
              }
            >
              <span className="text-[#D9A441]">✦</span>
              {c}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <section>

          {/* Search Bar */}
          <div className="mb-4 flex gap-3">

            <label className="flex flex-1 items-center gap-2 rounded-lg border border-[#e9dfd4] bg-white px-3 py-3 text-stone-400">
              <Search size={16} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search food..."
                className="w-full text-xs outline-none"
              />
            </label>

            <button className="flex items-center gap-2 rounded-lg border border-[#e9dfd4] bg-white px-4 text-xs">
              <SlidersHorizontal size={15} />
              Filter
            </button>

          </div>

          {/* Food Grid */}
          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filteredFoods.map((f) => (
                <FoodCard key={f.id} food={f} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="font-bold text-stone-700">
                No food found!
              </h3>
              <p className="mt-2 text-sm text-stone-500">
                Try another search or category.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All Categories');
                }}
                className="mt-4 rounded-lg bg-[#741F35] px-5 py-2 text-sm text-white"
              >
                Clear Filters
              </button>
            </div>
          )}

        </section>
      </div>
    </div>
  );
}
