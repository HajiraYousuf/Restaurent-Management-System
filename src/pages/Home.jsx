import { Link } from 'react-router-dom';
import { Leaf, ShieldCheck, CreditCard, Clock3, ArrowRight } from 'lucide-react';
import { Title, FoodCard } from '../components/Shared';
import { foods } from '../data/foods';

const features = [
  [Leaf, 'Fresh Ingredients', 'Always fresh'],
  [ShieldCheck, 'Quality Food', 'Fresh & tasty'],
  [CreditCard, 'Easy Payment', 'Cash or card'],
  [Clock3, 'Quick Service', 'Here to help'],
];

export default function Home() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 pt-6 sm:px-6 lg:px-10">
        
        {/* Qaybta Hordhaca (Hero Section) */}
        <section
          className="flex min-h-[350px] items-center rounded-2xl bg-cover bg-center px-6 py-10 text-white sm:px-12"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(53,7,22,.97),rgba(89,17,39,.78),rgba(89,17,39,.08)),url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=90')",
          }}
        >
          <div className="max-w-lg">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.25em] text-[#D9A441]">
              Fresh · Delicious · Made with love
            </p>
            <h1 className="display text-4xl font-bold leading-tight sm:text-5xl">
              Delicious Food<br />
              Brings People<br />
              Together
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-rose-100">
              Fresh ingredients, delicious meals, right at your fingertips.
            </p>
            <div className="mt-6 flex gap-3">
              <Link
                to="/menu"
                className="rounded-lg bg-[#D9A441] px-5 py-3 text-xs font-bold text-[#32121d] hover:bg-[#c89437] transition-colors"
              >
                Order Now
              </Link>
              <Link
                to="/menu"
                className="rounded-lg border border-white px-5 py-3 text-xs font-bold hover:bg-white hover:text-[#32121d] transition-colors"
              >
                View Menu
              </Link>
            </div>
          </div>
        </section>

        {/* Qaybta Astaamaha/Adeegyada (Features Grid) */}
        <div className="grid grid-cols-2 gap-3 py-5 lg:grid-cols-4">
          {features.map(([Icon, t, s]) => (
            <div
              key={t}
              className="flex items-center gap-3 rounded-xl border border-[#e9dfd4] bg-[#fffaf4] p-3 sm:p-4"
            >
              <span className="rounded-lg bg-[#f4e5c5] p-2.5 text-[#741F35]">
                <Icon size={18} />
              </span>
              <div>
                <h3 className="text-xs font-bold">{t}</h3>
                <p className="mt-1 text-[10px] text-stone-500">{s}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Qaybta Cuntooyinka Caanka ah (Featured Meals) */}
        <section className="py-5">
          <Title
            eyebrow="Made for you"
            title="Featured Meals"
            desc="Our most popular dishes"
            action={
              <Link to="/menu" className="text-xs font-bold text-[#741F35] flex items-center gap-1 hover:underline">
                View All <ArrowRight size={14} />
              </Link>
            }
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {foods.slice(0, 4).map((f) => (
              <FoodCard key={f.id} food={f} />
            ))}
          </div>
        </section>

      </div>
    </>
  );
}