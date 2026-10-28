import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, UserRound, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(
      localStorage.getItem('royalbite_users') || '[]'
    );

    // Check existing account
    const userExists = users.some(
      (user) =>
        user.email.toLowerCase() === formData.email.toLowerCase() ||
        user.phone === formData.phone
    );

    if (userExists) {
      setError('Email or phone number already registered.');
      return;
    }

    // Save new user
    const newUser = {
      id: Date.now(),
      ...formData,
    };

    localStorage.setItem(
      'royalbite_users',
      JSON.stringify([...users, newUser])
    );

    alert('Account created successfully!');

    navigate('/login');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-7">
      <div className="grid overflow-hidden rounded-2xl border border-[#e9dfd4] bg-white shadow-sm md:grid-cols-2">

        {/* Left Section */}
        <section
          className="flex min-h-[460px] flex-col items-center justify-center bg-cover bg-center p-8 text-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(#48091de0,#741f35d9),url('https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85')",
          }}
        >
          <ChefHat size={38} className="text-[#D9A441]" />

          <h2 className="display mt-3 text-2xl font-bold">
            RoyalBite
          </h2>

          <h3 className="display mt-7 text-xl font-bold">
            Join RoyalBite
          </h3>

          <p className="mt-2 max-w-xs text-xs leading-6 text-rose-100">
            Create your account and enjoy amazing food offers.
          </p>
        </section>

        {/* Register Form */}
        <section className="p-7 sm:p-9">

          <h1 className="display text-2xl font-bold">
            Create Account
          </h1>

          <p className="mb-5 mt-2 text-xs text-stone-500">
            Join us for delicious moments.
          </p>

          <form onSubmit={handleRegister}>

            {/* Full Name */}
            <label className="mb-3 block text-xs font-bold">
              Full Name

              <span className="mt-2 flex items-center gap-2 rounded-lg border border-[#e9dfd4] px-3 py-3 text-stone-400">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full text-xs font-normal outline-none"
                />

                <UserRound size={15} />
              </span>
            </label>

            {/* Email */}
            <label className="mb-3 block text-xs font-bold">
              Email

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="mt-2 w-full rounded-lg border border-[#e9dfd4] px-3 py-3 text-xs font-normal outline-none focus:border-[#D9A441]"
              />
            </label>

            {/* Phone */}
            <label className="mb-3 block text-xs font-bold">
              Phone Number

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="mt-2 w-full rounded-lg border border-[#e9dfd4] px-3 py-3 text-xs font-normal outline-none focus:border-[#D9A441]"
              />
            </label>

            {/* Password */}
            <label className="mb-3 block text-xs font-bold">
              Password

              <span className="mt-2 flex items-center gap-2 rounded-lg border border-[#e9dfd4] px-3 py-3 text-stone-400">

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  minLength={6}
                  required
                  className="w-full text-xs font-normal outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>

              </span>
            </label>

            {error && (
              <p className="mb-3 text-xs text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-[#741F35] py-3 text-xs font-bold text-white transition hover:bg-[#5d182b]"
            >
              Register
            </button>

          </form>

          <p className="mt-4 text-center text-xs text-stone-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#741F35]">
              Login
            </Link>
          </p>

        </section>
      </div>
    </div>
  );
}