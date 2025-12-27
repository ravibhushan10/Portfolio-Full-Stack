import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import "./footer.css";
import { SiX } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer section-bg">
      <div className="section-content">
        <div className="footer__container">
          <div className="footer__top">
            <div className="footer__grid">
              <div className="footer__section">
                <h3 className="footer__section-title">Connect With Me</h3>
                <div className="footer__social">
                  <div className="social__icons">
                    <a
                      href="https://github.com/ravibhushan10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social__link github"
                    >
                      <FaGithub />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ravibhushan-kumar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social__link linkedin"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href="https://x.com/Ravibhushan_12"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social__link twitter"
                    >
                      <SiX />
                    </a>
                  </div>
                  <p className="social__text">
                    Let's connect and discuss tech, projects, and opportunities.
                  </p>
                </div>
              </div>

              <div className="footer__section">
                <h3 className="footer__section-title">Quick Links</h3>
                <ul className="footer__links">
                  <li>
                    <a href="#home" className="footer__link">Home</a>
                  </li>
                  
                  <li>
                    <a href="#projects" className="footer__link">Projects</a>
                  </li>
                  <li>
                    <a href="#skills" className="footer__link">Skills</a>
                  </li>
                  <li>
                    <a href="#contact" className="footer__link">Contact</a>
                  </li>
                </ul>
              </div>

              <div className="footer__section">
                <h3 className="footer__section-title">Contact Info</h3>
                <div className="footer__contact">
                  <a
                    href="mailto:ravibhushankumar87tp@gmail.com"
                    className="contact__item"
                  >
                    <FaEnvelope className="contact__icon" />
                    <span className="contact__text">
                      ravibhushankumar87tp@gmail.com
                    </span>
                  </a>

                  <a
                    href="tel:+919199519751"
                    className="contact__item"
                  >
                    <FaPhone className="contact__icon" />
                    <span className="contact__text">
                      +91 9199519751
                    </span>
                  </a>
                </div>
              </div>

              <div className="footer__section">
                <h3 className="footer__section-title">Stay Connected</h3>
                <div className="footer__cta">
                  <p className="cta__text">
                    Let's build something impactful—reach out for collaborations
                    or new opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer__divider"></div>

          <div className="footer__bottom">
            <div className="footer__copyright">
              <p className="copyright__text">
                Copyright © {currentYear} by{" "}
                <span className="copyright__name">Ravi Bhushan</span> | All
                Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
