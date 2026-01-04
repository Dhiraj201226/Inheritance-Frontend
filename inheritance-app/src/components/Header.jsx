import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import logo from "assets/image.png"; 
=======
import logo from "assets/image.png";
>>>>>>> d514ce4b69bfc6063c68ca10e48f9d60ba8c38f4



export default function Header({
  brand = "Bridging Trust Through Data",
  links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "FAQ", href: "/faq" },
  ]
}) {
  return (
    <>
<<<<<<< HEAD
      <style>
        {`
        /* Base Reset for Header */
        .oa-header-wrapper {
          width: 100%;
          background: linear-gradient(135deg, #27a7ff 0%, #5287c0ff 100%);
          box-shadow: 0 4px 20px rgba(0, 86, 179, 0.2);
          position: relative;
          z-index: 100;
        }

        .oa-navbar {
          max-width: 1200px;
          height:100px;
=======
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
>>>>>>> d514ce4b69bfc6063c68ca10e48f9d60ba8c38f4
          margin: 0 auto;
          padding: 15px 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .oa-logo-container {
          display: flex;
<<<<<<< HEAD
          align-items: center;
          gap: 15px;
          text-decoration: none;
        }
        
        .oa-logo-img {
          height: 230px; /* Adjusted from 150px to fit navbar */
          width: auto;
          object-fit: contain;
          position: absolute;
  left: 00px;
  z-index: 101;
        }
=======
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
>>>>>>> d514ce4b69bfc6063c68ca10e48f9d60ba8c38f4

        .oa-brand-text {
          color: #ffffff;
          font-family: sans-serif;
          font-weight: 700;
          font-size: 30px;
          letter-spacing: -0.5px;
          margin:100px
        }

<<<<<<< HEAD
        /* Navigation Container */
        .oa-nav {
          display: flex;
          gap: 12px;
          padding:30px
         
        }

        /* GLASSMORPHISM BUTTON STYLES */
        .oa-navlink {
          text-decoration: none;
          font-family: sans-serif;
          font-weight: 600;
          font-size: 15px;
          padding: 10px 20px;
          border-radius: 12px;
          transition: all 0.3s ease;
          
          /* The Glass Look */
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(5px);
        }

        /* Hover State */
        .oa-navlink:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          color: #ffffff;
        }

        /* Active Page State */
        .oa-navlink-active {
          background: #ffffff;
          color: #0056b3; /* Deep Blue Text */
          box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          border-color: #ffffff;
        }
        
        .oa-navlink-active:hover {
           background: #ffffff;
           color: #0056b3;
           transform: none;
           cursor: default;
        }
      `}
      </style>

      <header className="oa-header-wrapper">
        <div className="oa-navbar">
          
          {/* Logo Section */}
          <div className="oa-logo-container">
            <img src={logo} alt="OpenAudit Logo" className="oa-logo-img" />
            {/* Optional: Add text next to logo if needed, otherwise remove div */}
            <span className="oa-brand-text">{brand}</span>
=======
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
>>>>>>> d514ce4b69bfc6063c68ca10e48f9d60ba8c38f4
          </div>

          {/* Navigation Section */}
          <nav className="oa-nav">
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.href}
                className={({ isActive }) =>
                  `oa-navlink ${isActive ? "oa-navlink-active" : ""}`
                }
              >
                {l.label}{}
              </NavLink>
            ))}
          </nav>

        </div>
      </header>
    </>
  );
}