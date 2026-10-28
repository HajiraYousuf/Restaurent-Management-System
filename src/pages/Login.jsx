import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, Mail, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(
      localStorage.getItem('royalbite_users') || '[]'
    );

    const user = users.find(
      (u) =>
        (
          u.email.toLowerCase() ===
          formData.emailOrPhone.toLowerCase() ||
          u.phone === formData.emailOrPhone
        ) &&
        u.password === formData.password
    );

    if (!user) {
      setError('Invalid email, phone number or password.');
      return;
    }

    // Save logged-in user
    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(
      'royalbite_user',
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      })
    );

    navigate('/');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-7">
      <div className="grid overflow-hidden rounded-2xl border border-[#e9dfd4] bg-white shadow-sm md:grid-cols-2">

        {/* Left Section */}
        <section
          className="flex min-h-[420px] flex-col items-center justify-center bg-cover bg-center p-8 text-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(#48091de0,#741f35d9),url('https://images.unsplash.com/photo-1568901346375-23c9450c58bd?auto=format&fit=crop&w=900&q=85')",
          }}
        >
          <ChefHat size={38} className="text-[#D9A441]" />

          <h2 className="display mt-3 text-2xl font-bold">
            RoyalBite
          </h2>

          <h3 className="display mt-7 text-xl font-bold">
            Welcome Back!
          </h3>

          <p className="mt-2 max-w-xs text-xs leading-6 text-rose-100">
            Log in to your account to continue your delicious journey.
          </p>
        </section>

        {/* Login Form */}
        <section className="p-7 sm:p-10">

          <h1 className="display text-2xl font-bold">
            Login
          </h1>

          <p className="mb-6 mt-2 text-xs text-stone-500">
            Welcome back to RoyalBite.
          </p>

          <form onSubmit={handleLogin}>

            {/* Email or Phone */}
            <label className="mb-4 block text-xs font-bold">
              Email or Phone

              <span className="mt-2 flex items-center gap-2 rounded-lg border border-[#e9dfd4] px-3 py-3 text-stone-400">

                <Mail size={15} />

                <input
                  type="text"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  placeholder="Enter your email or phone"
                  required
                  className="w-full text-xs font-normal outline-none"
                />

              </span>
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
                  placeholder="Enter your password"
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

            {/* Remember Me */}
            <div className="mb-5 flex justify-between text-[10px]">

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>

              <Link
                to="/login"
                className="font-semibold text-[#741F35]"
              >
                Forgot password?
              </Link>

            </div>

            {error && (
              <p className="mb-3 text-xs text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[#741F35] py-3 text-xs font-bold text-white transition hover:bg-[#5d182b]"
            >
              Login
            </button>

          </form>

          <p className="mt-5 text-center text-xs text-stone-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#741F35]">
              Register
            </Link>
          </p>

        </section>
      </div>
    </div>
  );
}