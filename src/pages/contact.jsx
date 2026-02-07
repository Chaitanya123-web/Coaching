import { useState } from "react";
import api from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await api.post("/contact/send", form);
        if(res) {
        alert("Message Sent Successfully ");
        setForm({ name: "", email: "", message: "" });
        }
    } catch (err) {
        alert("Something went wrong. Please try again.");
    }
    };

  return (
    <div className="min-h-screen bg-[#f8f7eb] pt-32 px-4 sm:px-6 pb-20">

      {/* HERO */}
      <section className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-6xl font-black text-[#0b2a4a] tracking-tight">
          Contact <span className="text-[#1f4f5a]">Us</span>
        </h1>

        <p className="mt-5 text-[#2f6f7e] text-sm sm:text-lg max-w-2xl mx-auto">
          Have doubts, feedback, or need support?  
          Our team at <b>The Indofrench IAS</b> is always here to help.
        </p>
      </section>

      {/* CONTACT GRID */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <div className="bg-[#0b2a4a] text-[#f2f1d5] rounded-[2rem] p-10 shadow-2xl">
          <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">
            Get In Touch
          </h2>

          <p className="text-[#6fa6b2] text-sm leading-relaxed mb-8">
            Reach out anytime for batch details, enrollment queries, or doubt
            resolution support.
          </p>

          <div className="space-y-6 text-sm font-bold">
            <div>
              <p className="uppercase text-[10px] tracking-widest text-[#6fa6b2]">
                Email
              </p>
              <p className="text-[#f2f1d5]">support@teaching.com</p>
            </div>

            <div>
              <p className="uppercase text-[10px] tracking-widest text-[#6fa6b2]">
                Phone
              </p>
              <p className="text-[#f2f1d5]">+91 98765 43210</p>
            </div>

            <div>
              <p className="uppercase text-[10px] tracking-widest text-[#6fa6b2]">
                Location
              </p>
              <p className="text-[#f2f1d5]">
                Kanpur, Uttar Pradesh, India
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-[#0b2a4a]/5">
          <h2 className="text-2xl font-black text-[#0b2a4a] mb-6">
            Send a Message ✉️
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-5 py-4 rounded-xl bg-[#f8f7eb] border border-transparent focus:border-[#1f4f5a] outline-none font-medium"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="w-full px-5 py-4 rounded-xl bg-[#f8f7eb] border border-transparent focus:border-[#1f4f5a] outline-none font-medium"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message..."
              required
              rows="5"
              className="w-full px-5 py-4 rounded-xl bg-[#f8f7eb] border border-transparent focus:border-[#1f4f5a] outline-none font-medium resize-none"
            />

            <button
              type="submit"
              className="w-full bg-[#0b2a4a] text-[#f2f1d5] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#1f4f5a] transition-all active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}