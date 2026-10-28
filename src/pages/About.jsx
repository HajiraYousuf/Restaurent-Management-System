import { Link } from 'react-router-dom';
import { Award, HeartHandshake, Leaf, Users } from 'lucide-react';

const values = [
  [Leaf, 'Fresh Ingredients', 'Carefully selected ingredients in every dish.'],
  [Award, 'Skilled Chefs', 'Crafted with care, creativity and passion.'],
  [HeartHandshake, 'Happy Customers', 'Warm service and great food, every visit.'],
  [Users, 'Made to Share', 'Good food creates memorable moments.'],
];

export default function About() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-7">
        
        {/* Qaybta Hordhaca (Hero Section) */}
        <section
          className="flex min-h-[250px] items-center justify-center rounded-2xl bg-cover bg-center px-5 py-12 text-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(#32121dcc,#32121dbb),url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=90')",
          }}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#D9A441]">
              Good Food · Fresh Ingredients · Happy Customers
            </p>
            <h1 className="display mt-3 text-4xl font-bold">About RoyalBite</h1>
            <p className="mt-2 text-sm text-rose-100">
              Made with passion. Served with love.
            </p>
          </div>
        </section>

        {/* Qaybta Sheekadeenna (Our Story) */}
        <section className="grid gap-8 py-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a7781f]">
              Our Story
            </p>
            <h2 className="display mt-2 text-3xl font-bold">
              Food that brings us together
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-500">
              RoyalBite was founded with a simple mission: to bring delicious,
              high-quality food to our customers. We use fresh ingredients,
              traditional recipes, and modern cooking techniques to create meals
              that satisfy every craving.
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-500">
              From a quick lunch to a family dinner, every meal deserves care,
              flavour and a warm welcome.
            </p>
            <Link
              to="/menu"
              className="mt-5 inline-block rounded-lg bg-[#741F35] px-5 py-3 text-xs font-bold text-white hover:bg-[#5e182b] transition-colors"
            >
              Explore Our Menu
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=85"
            alt="Restaurant"
            className="h-72 w-full rounded-2xl object-cover shadow-md"
          />
        </section>

        {/* Qaybta Qiimaha Shirkadda (Values Grid) */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {values.map(([Icon, title, desc]) => (
            <div
              key={title}
              className="rounded-xl border border-[#e9dfd4] bg-[#fffaf4] p-4 transition-transform hover:-translate-y-1"
            >
              <Icon className="mb-4 text-[#741F35]" size={24} />
              <h3 className="display font-bold">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-stone-500">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}