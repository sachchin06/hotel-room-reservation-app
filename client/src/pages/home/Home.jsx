import { Navbar } from "../../components/navbar/Navbar";
import "./home.css";
import { Header } from "../../components/header/Header";
import { Featured } from "../../components/featured/Featured";
import { PropertList } from "../../components/propertyList/propertyList";
import { FeaturedProperties } from "../../components/featuredProperties/FeaturedProperties";
import { MailList } from "../../components/mailList/MailList";
import { Footer } from "../../components/footer/Footer";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};
