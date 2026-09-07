import Hero from "./sections/Hero";
import Thesis from "./sections/Thesis";
import NowSelling from "./sections/NowSelling";
import TrackRecord from "./sections/TrackRecord";
import Mission from "./sections/Mission";
import WalkTheLand from "./sections/WalkTheLand";
import Footer from "./sections/Footer";
import ContactHero from "./sections/ContactHero";
import ContactForm from "./sections/ContactForm";
import Properties from "./pages/Properties";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdModal from "./components/AdModal";

const HomePage = () => (
  <main>
    <Hero />
    <Thesis />
    <NowSelling />
    <TrackRecord />
    <Mission image="/images/houses.avif" />
    <WalkTheLand image="/images/housesbanner.jpg" />
    <Footer />
  </main>
);

const ContactPage = () => (
  <main>
    <ContactHero image="/images/contacthero.avif" />
    <ContactForm />
    <Footer />
  </main>
);

function App() {
  return (
    <BrowserRouter>
     <AdModal images={["/images/spotlight1.avif", "/images/spotlight2.avif"]} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;