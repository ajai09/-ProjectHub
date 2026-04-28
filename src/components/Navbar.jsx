import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-container">
        <NavLink className="brand" to="/">
          Aloysius Ajai L.<span>.</span>
        </NavLink>

        <nav className={`site-nav ${open ? "open" : ""}`} id="siteNav">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>
            About
          </NavLink>
          <NavLink to="/skills" onClick={() => setOpen(false)}>
            Skills
          </NavLink>
          <NavLink to="/services" onClick={() => setOpen(false)}>
            Services
          </NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>
        </nav>

        <button className="nav-toggle" id="navToggle" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
