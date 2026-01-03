import "./about.css";

const About = () => {
  const stats = [
    { number: "0+", label: "Years Experience" },
    { number: "10+", label: "Projects Completed" },
    { number: "0+", label: "Internships" },
    { number: "5+", label: "Certificates" },
  ];

  return (
    <section id="about" className="about">
      <div className="about__bg about__bg--left" />
      <div className="about__bg about__bg--right" />

      <div className="about__container">
        <header className="about__header">
          <h2 className="about__title">
            Know Me <span>Better</span>
          </h2>
          <span className="about__subtitle">
            My background, passion, and approach to development
          </span>
        </header>

        <div className="about__main">
          <figure className="about__image">
            <div className="about__image-box">
              <img src={Image} alt="Ravi Bhushan" loading="lazy" />
              <div className="about__image-overlay" />
            </div>
          </figure>

          <article className="about__content">
            <h3>
              Full Stack Developer from <span>Bihar, India</span>
            </h3>

            <p>
              I’m a dedicated Full Stack Developer skilled in React.js, Next.js,
              Node.js, Express, MongoDB, and TailwindCSS. I specialize in
              building modern, fast, and accessible digital experiences with a
              focus on UI/UX, performance optimization, and clean architecture.
            </p>

            <p>
              I enjoy converting ideas into production-ready solutions with
              clean architecture, strong UI/UX, and maintainable codebases.
            </p>

            <a href="#contact" className="about__cta">
              Let's Work Together
            </a>
          </article>
        </div>

        <section className="about__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="about__stat">
              <h4>{stat.number}</h4>
              <p>{stat.label}</p>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
};

export default About;
