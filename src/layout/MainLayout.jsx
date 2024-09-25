
import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation/Navigation";
import { Footer } from "../components/Footer/Footer";

export const MainLayout = () => {
  return (
    <main>
      <Navigation />
      <Outlet />
      <Footer/>
    </main>
  );
};
