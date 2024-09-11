import About from "./compnents/componentjsx/About";
import Contact from "./compnents/componentjsx/Contact";
import Experiance from "./compnents/componentjsx/Experiance";
import Footer from "./compnents/componentjsx/Footer";
import Home from "./compnents/componentjsx/Home";
import Navbar from "./compnents/componentjsx/Navbar";
import Portfolio from "./compnents/componentjsx/Portfolio";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Portfolio />
      <Experiance />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
