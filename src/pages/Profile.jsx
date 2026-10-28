
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Camera,
  UserRound,
  Package,
  MapPin,
  CreditCard,
  LogOut,
  Save,
  X,
} from 'lucide-react';

// Get logged-in user
const getLoggedUser = () => {
  const savedUser =
    localStorage.getItem('royalbite_user') ||
    sessionStorage.getItem('royalbite_user');

  return savedUser ? JSON.parse(savedUser) : null;
};

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const loggedUser = getLoggedUser();

  const [user, setUser] = useState({
    name: loggedUser?.name || '',
    email: loggedUser?.email || '',
    phone: loggedUser?.phone || '',
    address: loggedUser?.address || '',
    photo: loggedUser?.photo || '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess(false);
  };

  // Change profile photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setUser((prev) => ({
        ...prev,
        photo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // Save profile
  const handleSave = (e) => {
    e.preventDefault();

    if (!loggedUser) {
      navigate('/login');
      return;
    }

    const updatedUser = {
      ...loggedUser,
      ...user,
    };

    // Update current logged-in user
    if (localStorage.getItem('royalbite_user')) {
      localStorage.setItem(
        'royalbite_user',
        JSON.stringify(updatedUser)
      );
    } else {
      sessionStorage.setItem(
        'royalbite_user',
        JSON.stringify(updatedUser)
      );
    }

    // Update user in registered users list
    const registeredUsers = JSON.parse(
      localStorage.getItem('royalbite_users') || '[]'
    );

    const updatedUsers = registeredUsers.map((registeredUser) => {
      const isSameUser =
        loggedUser.id
          ? registeredUser.id === loggedUser.id
          : registeredUser.email === loggedUser.email;

      return isSameUser
        ? { ...registeredUser, ...user }
        : registeredUser;
    });

    localStorage.setItem(
      'royalbite_users',
      JSON.stringify(updatedUsers)
    );

    setIsEditing(false);
    setSuccess(true);

    // Notify other components
    window.dispatchEvent(new Event('auth-change'));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('royalbite_user');
    sessionStorage.removeItem('royalbite_user');

    window.dispatchEvent(new Event('auth-change'));

    navigate('/login');
  };

  // Require login
  if (!loggedUser) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div className="rounded-2xl border border-[#e9dfd4] bg-[#fffdf9] p-8">
          <UserRound
            size={40}
            className="mx-auto text-[#741F35]"
          />

          <h2 className="display mt-4 text-2xl font-bold text-[#741F35]">
            Login Required
          </h2>

          <p className="my-4 text-sm text-stone-500">
            Please login to view your profile.
          </p>

          <button
            onClick={() => navigate('/login')}
            className="w-full rounded-lg bg-[#741F35] py-3 text-xs font-bold text-white"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Profile', path: '/profile', icon: UserRound },
    { label: 'My Orders', path: '/my-orders', icon: Package },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      <div className="grid gap-5 md:grid-cols-[230px_1fr]">

        {/* Sidebar */}
        <aside className="h-fit rounded-xl border border-[#e9dfd4] bg-[#fffdf9] p-4">

          <div className="mb-5 flex items-center gap-3">

            <img
              src={
                user.photo ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=85'
              }
              alt="Customer"
              className="h-14 w-14 rounded-full object-cover"
            />

            <div className="min-w-0">
              <h3 className="truncate font-bold">
                {user.name}
              </h3>

              <p className="text-[10px] text-stone-500">
                Customer
              </p>
            </div>

          </div>

          {/* Navigation */}
          {menuItems.map(({ label, path, icon: Icon }) => (
            <Link
              key={label}
              to={path}
              className={`mb-1 flex items-center gap-3 rounded-lg px-3 py-3 text-xs ${
                label === 'Profile'
                  ? 'bg-[#741F35] text-white'
                  : 'text-stone-600 hover:bg-[#f5e9dd]'
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-xs text-red-600 hover:bg-red-50"
          >
            <LogOut size={15} />
            Logout
          </button>

        </aside>

        {/* Profile Content */}
        <section className="rounded-xl border border-[#e9dfd4] bg-[#fffdf9] p-5 sm:p-7">

          {/* Heading */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a7781f]">
                Account settings
              </p>

              <h1 className="display mt-1 text-2xl font-bold">
                My Profile
              </h1>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsEditing(!isEditing);
                setSuccess(false);
              }}
              className="flex items-center gap-2 rounded-lg border border-[#741F35] px-4 py-2 text-xs font-bold text-[#741F35]"
            >
              {isEditing ? <X size={14} /> : <UserRound size={14} />}
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>

          </div>

          {/* Profile Photo */}
          <div className="mb-6 flex items-center gap-4">

            <img
              src={
                user.photo ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=85'
              }
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover"
            />

            <div>
              <button
                type="button"
                disabled={!isEditing}
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 rounded-lg bg-[#f4e5c5] px-3 py-2 text-[10px] font-bold text-[#741F35] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Camera size={14} />
                Change Photo
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <p className="mt-1 text-[10px] text-stone-400">
                Maximum image size: 2MB
              </p>
            </div>

          </div>

          {/* Profile Form */}
          <form onSubmit={handleSave}>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Full Name */}
              <label className="text-xs font-bold">
                Full Name

                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className="mt-2 block w-full rounded-lg border border-[#e9dfd4] bg-white px-3 py-3 text-xs font-normal outline-none focus:border-[#D9A441] read-only:bg-stone-50"
                />
              </label>

              {/* Email */}
              <label className="text-xs font-bold">
                Email

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className="mt-2 block w-full rounded-lg border border-[#e9dfd4] bg-white px-3 py-3 text-xs font-normal outline-none focus:border-[#D9A441] read-only:bg-stone-50"
                />
              </label>

              {/* Phone */}
              <label className="text-xs font-bold">
                Phone Number

                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  required
                  className="mt-2 block w-full rounded-lg border border-[#e9dfd4] bg-white px-3 py-3 text-xs font-normal outline-none focus:border-[#D9A441] read-only:bg-stone-50"
                />
              </label>

              {/* Address */}
              <label className="text-xs font-bold">
                Address

                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  placeholder="Enter your address"
                  className="mt-2 block w-full rounded-lg border border-[#e9dfd4] bg-white px-3 py-3 text-xs font-normal outline-none focus:border-[#D9A441] read-only:bg-stone-50"
                />
              </label>

            </div>

            {/* Success Message */}
            {success && (
              <p className="mt-4 rounded-lg bg-green-50 p-3 text-xs font-semibold text-green-700">
                Profile updated successfully!
              </p>
            )}

            {/* Save Button */}
            {isEditing && (
              <button
                type="submit"
                className="mt-6 flex items-center gap-2 rounded-lg bg-[#741F35] px-6 py-3 text-xs font-bold text-white hover:bg-[#5d182b]"
              >
                <Save size={15} />
                Save Changes
              </button>
            )}

          </form>

        </section>

      </div>
    </div>
  );
}
