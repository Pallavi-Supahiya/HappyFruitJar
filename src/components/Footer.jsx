import "../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">
      <div className="footer-brand"> 
      <h3>Happy FruitJar</h3>
      <p>Own your food. Empower farmers.</p>
      <p className="copyright">© 2025 Happy FruitJar</p>
      </div> 

        <div className="footer-links">

          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/faq">FAQ</Link>
            <a href="#contact">Contact Us</a>
          </div>  
            <div className="footer-column">
            <h4>Social</h4>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

          </div>
          </div>

      </div>
    </footer>
  );
}

export default Footer;
