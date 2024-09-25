import { navLinks } from "../../navlinks"
import { NavLink } from "react-router-dom";

export const Navigation=()=> {
  return (

    <nav>
    {navLinks.map((item) => {
      return (
        <NavLink key={item.title} to={item.link}>
          {item.title}
        </NavLink>
      );
    })}
  </nav>
  )
}
