import About from "./compnents/componentjsx/About";
import Contact from "./compnents/componentjsx/Contact";
// import Experiance from "./compnents/componentjsx/Projects";
import Footer from "./compnents/componentjsx/Footer";
import Home from "./compnents/componentjsx/Home";
import Navbar from "./compnents/componentjsx/Navbar";
import Portfolio from "./compnents/componentjsx/Portfolio";
import Projects from "./compnents/componentjsx/Projects";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Projects />
      <Portfolio />
      {/* <Experiance /> */}
      <Contact />
      <Footer />
    </>
  );
}

export default App;
