import Hero from "./sections/Hero";
import Thesis from "./sections/Thesis";
import NowSelling from "./sections/NowSelling";
import TrackRecord from "./sections/TrackRecord";
import Mission from "./sections/Mission";
import WalkTheLand from "./sections/WalkTheLand";
import Footer from "./sections/Footer";
import ContactHero from "./sections/ContactHero";
import ContactForm from "./sections/ContactForm";
function App() {
  if (window.location.pathname === "/contact") {
    return (
      <main>
        <ContactHero image="/images/contacthero.jpg" />
        <ContactForm />
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Hero />
      <Thesis />
      <NowSelling />
      <TrackRecord />
      <Mission image="/images/houses.jpg" />
      <WalkTheLand image="/images/housesbanner.jpg" />
      <Footer />
      

    </main>
  );
}

export default App;