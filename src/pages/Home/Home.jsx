import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Skills from '../../components/Skills/Skills';
import Services from '../../components/Services/Services';
import SelectedWorks from '../../components/SelectedWorks/SelectedWorks';
import Contact from '../../components/Contact/Contact';
import SEO from '../../components/ui/SEO';
import { personalInfo } from '../../data/socialLinks';

export default function Home() {
  return (
    <>
      <SEO
        title="Home"
        description={`${personalInfo.name} is a Creative Designer and Video Editor. Explore my portfolio of posters, social media creatives, and motion design.`}
      />
      <Hero />
      <About />
      <Skills />
      <SelectedWorks />
      <Services limit={6} />
      <Contact />
    </>
  );
}



