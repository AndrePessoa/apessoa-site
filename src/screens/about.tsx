import Diving from "../components/diving";
import { WaterSurfaceCanvas } from "../components/watersurface";

export default function ScreenAbout() {
  return (
    <section id="info" className="screen">
      <WaterSurfaceCanvas />
      <Diving />
      <div className="content">
        <h2>André Pessoa.</h2>
        <p>
          I'm a Brazilian creative developer with more than 16 years of experience, and formed designer & animator.
        </p>
        <p>
          I specialize in crafting engaging digital experiences that blend functionality with visual appeal.
        </p>
        <p>Feel free to explore my{" "}
          <a
            href="https://www.linkedin.com/in/andrepessoamendes/"
            rel="noreferrer"
            target="_blank"
          >
            Linkedin
          </a>
          {" / "}
          <a
            href="https://github.com/AndrePessoa"
            rel="noreferrer"
            target="_blank"
          >
            Github
          </a>{" "}
          to know more about me.
        </p>
        <br />
        <p>Thank you for coming so deep.</p>
        <p>I hope to see you soon again! <span className="block"> = )</span></p>
      </div>
    </section>
  );
}
