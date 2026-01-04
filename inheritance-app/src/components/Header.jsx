import { NavLink } from "react-router-dom";
import logo from "assets/image.png"; 

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
          margin: 0 auto;
          padding: 15px 50px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .oa-logo-container {
          display: flex;
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

        .oa-brand-text {
          color: #ffffff;
          font-family: sans-serif;
          font-weight: 700;
          font-size: 30px;
          letter-spacing: -0.5px;
          margin:100px
        }

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