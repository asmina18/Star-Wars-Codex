
import { Outlet } from "react-router-dom";
import { Navigation } from "../components/Navigation/Navigation";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

export const MainLayout = () => {
  return (
    <main>
      <Header/>
      <Navigation />
      <Outlet />
      <Footer/>
    </main>
  );
};
