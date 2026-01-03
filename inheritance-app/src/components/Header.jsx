import { NavLink } from "react-router-dom";
import logo from "assets/image.png";



export default function Header({
  brand = "OpenAudit",
  links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "FAQ", href: "/faq" },
  ],
}) {
  return (
    <>
      <style>{`
        .oa-header {
          background: #f5f7fb;
          border-bottom: 1px solid rgba(10, 22, 180, 0.08);
        }
          .oa-navlink-active {
  background: #03395aff;
  color: white;
}

        .oa-topbar {
          background: linear-gradient(180deg, #27a7ff 0%, #0b6fb6 100%);
        }
        .oa-topbar-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 10px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .oa-brand {
          color: rgba(255, 255, 255, 0.95);
          font-weight: 700;
          font-size:30px
        }
        .oa-nav {
          display: flex;
          gap: 10px;
        }
          .oa-navlink {
  color: #0a2a3c;
  background: rgba(255, 255, 255, 0.65);
  padding: 8px 14px;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}
.oa-navlink:hover {
  background: rgba(255, 255, 255, 0.85);
}
.oa-navlink-active,
.oa-navlink-active:hover {
  background: #022e49ff;
  color: white;
}

      `}</style>

      <header className="oa-header">
        <div className="oa-topbar">
          <div className="oa-topbar-inner">
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <img src={logo} alt="OpenAudit logo" style={{height:50}} />
              <span className="oa-brand ">{brand}</span>
           </div> 

            <nav className="oa-nav">
              {links.map((l) => (
               <NavLink
  key={l.label}
  to={l.href}
  end={l.href === "/"}
  className={({ isActive }) =>
    `oa-navlink ${isActive ? "oa-navlink-active" : ""}`
  }
>
  {l.label}
</NavLink>


              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
