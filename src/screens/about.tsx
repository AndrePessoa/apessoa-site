import Diving from "../components/diving";

export default function ScreenAbout() {
  return (
    <section id="info" className="screen">
      <Diving />
      <div className="content">
        <h2>André Pessoa.</h2>
        <p>
          I'm a Brazilian creative developer, and formed designer & animator.
        </p>
        <p>
          If you want to know a little more about me, take a look on my profile.
        </p>
        <p>
          <a
            href="https://www.linkedin.com/in/andrepessoamendes/"
            rel="noreferrer"
          >
            Linkedin
          </a>
        </p>
        <br />
        <p>Thank you for coming so deep.</p>
        <p>I hope to see you soon again! = )</p>
      </div>
    </section>
  );
}
