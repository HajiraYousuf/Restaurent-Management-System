
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ChefHat, ShoppingCart, Search, LogOut } from 'lucide-react';
import useCart from '../CartContext';

const links = [
  ['Home', '/'],
  ['Menu', '/menu'],
  ['About', '/about'],
  ['Contact', '/contact'],
];

const getLoggedUser = () => {
  const savedUser =
    localStorage.getItem('royalbite_user') ||
    sessionStorage.getItem('royalbite_user');

  return savedUser ? JSON.parse(savedUser) : null;
};

export default function Header() {
  const { foods } = useCart();
  const [user, setUser] = useState(getLoggedUser);

  const navigate = useNavigate();
  const location = useLocation();

  // Update user when route changes or authentication changes
  useEffect(() => {
    setUser(getLoggedUser());

    const updateUser = () => setUser(getLoggedUser());

    window.addEventListener('storage', updateUser);
    window.addEventListener('auth-change', updateUser);

    return () => {
      window.removeEventListener('storage', updateUser);
      window.removeEventListener('auth-change', updateUser);
    };
  }, [location.pathname]);

  // Calculate cart quantity
  const cartCount = foods.reduce(
    (total, food) => total + (food.quantity || 1),
    0
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('royalbite_user');
    sessionStorage.removeItem('royalbite_user');

    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-[#741F35] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-4 lg:px-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <ChefHat className="text-[#D9A441]" />
          RoyalBite
        </Link>

        {/* Navigation */}
        <nav className="order-3 flex w-full justify-center gap-5 text-xs sm:order-none sm:w-auto sm:text-sm">
          {links.map(([title, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#D9A441]'
                  : 'hover:text-[#D9A441]'
              }
            >
              {title}
            </NavLink>
          ))}
        </nav>

        {/* Search, Cart and Authentication */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <label className="hidden items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-stone-500 md:flex">
            <Search size={14} />
            <input
              placeholder="Search food..."
              className="w-24 outline-none"
            />
          </label>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <ShoppingCart size={19} />

            {cartCount > 0 && (
              <sup className="absolute -right-2 -top-2 rounded-full bg-[#D9A441] px-1.5 text-[9px] font-bold text-[#32121d]">
                {cartCount}
              </sup>
            )}
          </Link>

          {/* Authentication */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium sm:block">
                Hi, {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 rounded-lg bg-[#D9A441] px-3 py-2 text-[11px] font-bold text-[#32121d] hover:bg-[#c6922f]"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-lg bg-[#D9A441] px-3 py-2 text-[11px] font-bold text-[#32121d]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg border border-[#D9A441] px-3 py-2 text-[11px] font-bold text-white hover:bg-[#D9A441] hover:text-[#32121d]"
              >
                Register
              </Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
