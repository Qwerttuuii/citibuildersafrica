import AboutHero from "../sections/AboutHero";
import OriginStory from "../sections/OriginStory";
import MissionVision from "../sections/MissionVision";
import Accreditations from "../sections/Accreditations";
import RegionalFootprint from "../sections/RegionalFootprint";
import Footer from "../sections/Footer";


const About = () => {
  return (
    <main>
      <AboutHero image="/images/abouthero.avif" />
      <OriginStory image="/images/ceoimage.avif" />
      <MissionVision />
      <Accreditations />
      <RegionalFootprint  image="/images/reg.avif" />
      <Footer />
    </main>
  );
};

export default About;