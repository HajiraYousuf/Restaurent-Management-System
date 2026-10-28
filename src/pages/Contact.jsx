
import { useState } from 'react';
import { Clock3, Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [success, setSuccess] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess(false);
  };

  // Send message
  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      id: Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      date: new Date().toISOString(),
      status: 'Unread',
    };

    // Get previous messages
    const previousMessages = JSON.parse(
      localStorage.getItem('royalbite_messages') || '[]'
    );

    // Save new message
    localStorage.setItem(
      'royalbite_messages',
      JSON.stringify([...previousMessages, newMessage])
    );

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });

    setSuccess(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">

      <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#a7781f]">
        We're here to help
      </p>

      <h1 className="display mt-2 text-3xl font-bold">
        Contact Us
      </h1>

      <p className="mb-6 mt-2 max-w-xl text-sm text-stone-500">
        We'd love to hear from you! Get in touch with us for any questions, feedback, or support.
      </p>

      <div className="grid gap-5 md:grid-cols-2">

        {/* Contact Information */}
        <section className="rounded-xl border border-[#e9dfd4] bg-[#fffdf9] p-5">

          <h2 className="display text-lg font-bold">
            Get in Touch
          </h2>

          <div className="my-5 flex items-center gap-3">
            <span className="rounded-full bg-[#f4e5c5] p-3 text-[#741F35]">
              <MapPin size={17} />
            </span>
            <div>
              <h3 className="text-xs font-bold">Address</h3>
              <p className="mt-1 text-xs text-stone-500">
                Hargeisa, Somaliland
              </p>
            </div>
          </div>

          <div className="my-5 flex items-center gap-3">
            <span className="rounded-full bg-[#f4e5c5] p-3 text-[#741F35]">
              <Phone size={17} />
            </span>
            <div>
              <h3 className="text-xs font-bold">Phone</h3>
              <p className="mt-1 text-xs text-stone-500">
                +252 61 2345678
              </p>
            </div>
          </div>

          <div className="my-5 flex items-center gap-3">
            <span className="rounded-full bg-[#f4e5c5] p-3 text-[#741F35]">
              <Mail size={17} />
            </span>
            <div>
              <h3 className="text-xs font-bold">Email</h3>
              <p className="mt-1 text-xs text-stone-500">
                info@royalbite.com
              </p>
            </div>
          </div>

          <div className="my-5 flex items-center gap-3">
            <span className="rounded-full bg-[#f4e5c5] p-3 text-[#741F35]">
              <Clock3 size={17} />
            </span>
            <div>
              <h3 className="text-xs font-bold">Working Hours</h3>
              <p className="mt-1 text-xs text-stone-500">
                Mon – Sun: 8:00 AM – 11:00 PM
              </p>
            </div>
          </div>

          <div className="grid h-36 place-items-center rounded-lg bg-[#e7e4d8] text-sm text-[#741F35]">
            <div className="flex items-center gap-2">
              <MapPin />
              Hargeisa map preview
            </div>
          </div>

        </section>

        {/* Contact Form */}
        <section className="rounded-xl border border-[#e9dfd4] bg-[#fffdf9] p-5">

          <h2 className="display mb-5 text-lg font-bold">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <label className="mb-4 block text-xs font-bold">
              Full Name

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="mt-2 block w-full rounded-lg border border-[#e9dfd4] bg-white px-3 py-3 font-normal outline-none focus:border-[#D9A441]"
              />
            </label>

            {/* Email */}
            <label className="mb-4 block text-xs font-bold">
              Email

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your email"
                required
                className="mt-2 block w-full rounded-lg border border-[#e9dfd4] bg-white px-3 py-3 font-normal outline-none focus:border-[#D9A441]"
              />
            </label>

            {/* Message */}
            <label className="mb-4 block text-xs font-bold">
              Message

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                rows="5"
                required
                className="mt-2 block w-full rounded-lg border border-[#e9dfd4] bg-white px-3 py-3 font-normal outline-none focus:border-[#D9A441]"
              />
            </label>

            {/* Success Message */}
            {success && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-xs font-semibold text-green-700">
                <CheckCircle size={17} />
                Your message has been saved successfully!
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#741F35] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#5d182b]"
            >
              <Send size={15} />
              Send Message
            </button>

          </form>
        </section>

      </div>
    </div>
  );
}
