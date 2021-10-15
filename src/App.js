/* eslint-disable jsx-a11y/alt-text */
/*
 <?php
    $now       = time();
    $longitude = 38.6396994;
    $latitude  = -9.1725432;
    
    $sun    = date_sun_info ( $now, $longitude, $latitude);
    $light  = $sun['civil_twilight_begin'];
    $dark   = $sun['civil_twilight_end'];
    
    $daylightClass = (($now > $light && $now < $dark)) ? 'day-mode' : 'night-mode';

    
?>

*/
import React from "react";
// import AnimHelper from "./components/animHelper";
import Diving from "./components/diving";
import Island from "./components/island";
import Stars from "./components/stars";
import useStartScreenSize from "./hooks/useStartScreenSize";

import { ReactComponent as Anchor } from "./imgs/anchor.svg";

function App() {
  useStartScreenSize();

  return (
    <>
      <section>
        <h1>A. Pessoa</h1>
        <div id="island">
          <Island />
        </div>
        <div id="bottombar">
          <div id="greeting">
            <p>Hi, nice to see you!</p>
            <p class="small">(It was really lonely in here.)</p>
          </div>
          <a id="godown" href="#info">
            <div class="anchor">
              <Anchor />
            </div>
            <div class="label">Let's go!</div>
          </a>
        </div>
      </section>

      <section id="info">
        <Diving />
        <div class="content">
          <h2>André Pessoa.</h2>
          <p>
            I'm a Brazilian creative developer, and formed designer & animator.
          </p>
          <p>
            If you want to know a little more about me, take a look on my
            profile.
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
      <section id="extra">
        <div class="table">
          <div class="row" id="intro">
            <div class=""></div>
            <div class="col col-2">
              <p>Are you still here? Great!</p>
              <p>Let's talk a little bit more about me? = D</p>
            </div>
          </div>
          <div class="row" id="carrer">
            <div class="">
              <h2>Career</h2>
            </div>
            <div class="col col-2">
              <div class="timeline">
                <div class="dates">
                  <div>2001</div>
                  <div>2009</div>
                  <div>2021</div>
                </div>
                <div class="steps">
                  <div>Designer/animator</div>
                  <div>Developer</div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class=""></div>
            <div class="col">
              <div class="experiences">+ 12 years as developer</div>
              <div class="experiences">+ 4 years on react</div>
              <div class="experiences">+ 5 years as animator</div>
              <div class="experiences">+ 8 years as designer</div>
            </div>
            <div class="col">
              <div class="experiences">. hundreds of sites</div>
              <div class="experiences">. a lot of web apps</div>
              <div class="experiences">. a custom eLearn CMS</div>
              <div class="experiences">. SmarTV app</div>
              <div class="experiences">. a no-code app</div>
            </div>
          </div>
          <div class="row" id="exp">
            <div class="">
              <h2>Skills</h2>
            </div>
            <div class="col">
              <h3>Team</h3>
              <div class="rated">
                <span>Mentor</span>
                <span class="stars"></span>
              </div>
              <div class="rated">
                <span>Team lead</span>
                <span class="stars">
                  <Stars filled={3} stroked={2} />
                </span>
              </div>
              <div class="rated">
                <span>Tech lead</span>
                <span class="stars">
                  <Stars filled={3} stroked={2} />
                </span>
              </div>
            </div>
            <div class="col">
              <h3>Management</h3>
              <div class="rated">
                <span>SCRUM master</span>
                <span class="stars">
                  <Stars filled={4} stroked={1} />
                </span>
              </div>
              <div class="rated">
                <span>Project manager</span>
                <span class="stars">
                  <Stars filled={3} stroked={2} />
                </span>
              </div>
            </div>
          </div>
          <div class="row" id="techs">
            <div class="">
              <h2>Techs</h2>
            </div>
            <div class="col">
              <h3>Frontend</h3>
              <div class="rated">
                <span>React</span>
                <span class="stars">
                  <Stars filled={5} stroked={0} />
                </span>
              </div>
              <div class="rated">
                <span>Angular</span>
                <span class="stars">
                  <Stars filled={3} stroked={2} />
                </span>
              </div>
              <div class="rated">
                <span>Vuejs</span>
                <span class="stars">
                  <Stars filled={2} stroked={3} />
                </span>
              </div>
              <div class="rated">
                <span>React Native</span>
                <span class="stars">
                  <Stars filled={2} stroked={3} />
                </span>
              </div>
            </div>
            <div class="col">
              <h3>Backend</h3>
              <div class="rated">
                <span>PHP</span>
                <span class="stars">
                  <Stars filled={4} stroked={1} />
                </span>
              </div>
              <div class="rated">
                <span>Nodejs</span>
                <span class="stars">
                  <Stars filled={3} stroked={2} />
                </span>
              </div>
              <h3>CMS</h3>
              <div class="rated">
                <span>Wordpress</span>
                <span class="stars">
                  <Stars filled={4} stroked={1} />
                </span>
              </div>
              <div class="rated">
                <span>Drupal</span>
                <span class="stars">
                  <Stars filled={3} stroked={2} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <img src="./imgs/deep_anchor.png" id="deepanchor" />
      </section>
      <footer>
        Power by <a href="https://github.com/AndrePessoa">@AndrePessoa</a>
      </footer>
      <script src="./resources/script.js"></script>
    </>
  );
}

export default App;
