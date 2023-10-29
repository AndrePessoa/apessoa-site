import Stars from "../components/stars";

export default function ScreenResume() {
  return (
    <section id="extra" className="screen">
      <div className="table">
        <div className="row" id="intro">
          <div className=""></div>
          <div className="col col-2">
            <p>Are you still here? Great!</p>
            <p>Let's talk a little bit more about me? = D</p>
          </div>
        </div>
        <div className="row" id="carrer">
          <div className="">
            <h2>Career</h2>
          </div>
          <div className="col col-2">
            <div className="timeline">
              <div className="dates">
                <div>2001</div>
                <div>2009</div>
                <div>2021</div>
              </div>
              <div className="steps">
                <div>Designer/animator</div>
                <div>Developer</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className=""></div>
          <div className="col">
            <div className="experiences">+ 12 years as developer</div>
            <div className="experiences">+ 4 years on react</div>
            <div className="experiences">+ 5 years as animator</div>
            <div className="experiences">+ 8 years as designer</div>
          </div>
          <div className="col">
            <div className="experiences">. hundreds of sites</div>
            <div className="experiences">. a lot of web apps</div>
            <div className="experiences">. a custom eLearn CMS</div>
            <div className="experiences">. SmarTV app</div>
            <div className="experiences">. a no-code app</div>
          </div>
        </div>
        <div className="row" id="exp">
          <div className="">
            <h2>Skills</h2>
          </div>
          <div className="col">
            <h3>Team</h3>
            <div className="rated">
              <span>Mentor</span>
              <span className="stars"></span>
            </div>
            <div className="rated">
              <span>Team lead</span>
              <span className="stars">
                <Stars filled={3} stroked={2} />
              </span>
            </div>
            <div className="rated">
              <span>Tech lead</span>
              <span className="stars">
                <Stars filled={3} stroked={2} />
              </span>
            </div>
          </div>
          <div className="col">
            <h3>Management</h3>
            <div className="rated">
              <span>SCRUM master</span>
              <span className="stars">
                <Stars filled={4} stroked={1} />
              </span>
            </div>
            <div className="rated">
              <span>Project manager</span>
              <span className="stars">
                <Stars filled={3} stroked={2} />
              </span>
            </div>
          </div>
        </div>
        <div className="row" id="techs">
          <div className="">
            <h2>Techs</h2>
          </div>
          <div className="col">
            <h3>Frontend</h3>
            <div className="rated">
              <span>React</span>
              <span className="stars">
                <Stars filled={5} stroked={0} />
              </span>
            </div>
            <div className="rated">
              <span>Angular</span>
              <span className="stars">
                <Stars filled={3} stroked={2} />
              </span>
            </div>
            <div className="rated">
              <span>Vuejs</span>
              <span className="stars">
                <Stars filled={2} stroked={3} />
              </span>
            </div>
            <div className="rated">
              <span>React Native</span>
              <span className="stars">
                <Stars filled={2} stroked={3} />
              </span>
            </div>
          </div>
          <div className="col">
            <h3>Backend</h3>
            <div className="rated">
              <span>PHP</span>
              <span className="stars">
                <Stars filled={4} stroked={1} />
              </span>
            </div>
            <div className="rated">
              <span>Nodejs</span>
              <span className="stars">
                <Stars filled={3} stroked={2} />
              </span>
            </div>
            <h3>CMS</h3>
            <div className="rated">
              <span>Wordpress</span>
              <span className="stars">
                <Stars filled={4} stroked={1} />
              </span>
            </div>
            <div className="rated">
              <span>Drupal</span>
              <span className="stars">
                <Stars filled={3} stroked={2} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <img src="./imgs/deep_anchor.png" id="deepanchor" />
    </section>
  );
}
