import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import HorizontalScroll from './components/HorizontalScroll';
import SectionIndicator from './components/SectionIndicator';
import CustomCursor from './components/CustomCursor';
import SeoHead from './components/SeoHead';

function App() {
  return (
    <>
      <SeoHead />
      <CustomCursor />
      <Navbar />
      <SectionIndicator />
      <HorizontalScroll>
        <main id="main-content">
          <div className="horizontal-section">
            <Hero />
          </div>
          <div className="horizontal-section">
            <Services />
          </div>
          <div className="horizontal-section">
            <About />
          </div>
          <div className="horizontal-section">
            <Projects />
          </div>
          <div className="horizontal-section">
            <Contact />
          </div>
        </main>
      </HorizontalScroll>
    </>
  );
}

export default App;
