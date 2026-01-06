import { NavLink } from "react-router-dom";
import logo from "assets/image1.png";

export default function Header({
  brand = "Bridging Trust Through Data",
  links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "FAQ", href: "/faq" },
  ],
}) {
  return (
    <header className="w-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg relative z-50">
      <div className="max-w-[1200px] h-[100px] mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-4">
<img
  src={logo}
  style={{ height: "200px",
    filter:"brightness(1.1)"
  }}
/>

          <span className="text-white font-bold text-2xl tracking-tight">
            {brand}
          </span>
        </div>

        <nav className="flex gap-3">
          {links.map((l) => (
            <NavLink
              key={l.label}
              to={l.href}
              className={({ isActive }) =>
                `
                px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-300
                backdrop-blur-md border
                ${
                  isActive
                    ? "bg-white text-blue-700 border-white shadow-lg cursor-default"
                    : "text-white bg-white/10 border-white/20 hover:bg-white/25 hover:-translate-y-0.5 hover:shadow-md"
                }
              `
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
}
