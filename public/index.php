<?php
    $now       = time();
    $longitude = 38.6396994;
    $latitude  = -9.1725432;
    
    $sun    = date_sun_info ( $now, $longitude, $latitude);
    $light  = $sun['civil_twilight_begin'];
    $dark   = $sun['civil_twilight_end'];
    
    $daylightClass = (($now > $light && $now < $dark)) ? 'day-mode' : 'night-mode';

    function star($filled, $stroked) {
        return '';
        for ($i=0; $i < $filled; $i++) { 
            $r = round(rand(1,5), 0);
            echo '<i class="rated-star-' . $r . ' rated-star-filled">';
            include("./resources/star.svg");
            echo '</i>';
        }
        for ($i=0; $i < $stroked; $i++) {
            $r = round(rand(1,5), 0);
            echo '<i class="rated-star-' . $r . '">';
            include("./resources/star.svg");
            echo '</i>';
        }
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>A. Pessoa</title>
        <meta charset="UTF-8">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Comic+Neue:wght@700&family=Fredericka+the+Great&family=Fredoka+One&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Coming+Soon&display=swap" rel="stylesheet">
        <link href="./resources/style.css" rel="stylesheet" />
    </head>
    <body>
        <section>
            <h1>A. Pessoa</h1>  
            <div id="island">
                <?php include("./resources/ilha.svg"); ?>
            </div>
            <div id="bottombar">
                <div id="greeting">
                    <p >Hi! Nice to see you here.</p>
                    <p class="small">(Here it was really lonely.)</p>
                </div> 
                <a id="godown" href="#info">
                    <div class="anchor">
                        <?php include("./resources/anchor.svg"); ?>
                    </div> 
                    <div class="label">
                        Let's go!
                    </div> 
                </a> 
            </div>
        </section>
        
        <section id="info">
            <div id="driving">
                <?php include("./resources/driving.svg"); ?>
            </div> 
            <div class="content">
                <h2>André Pessoa.</h2>
                <p>I'm a brazilian creative developer, and a formed designer & animator.</p>
                <p>If you want to know a little more about me, take a look on my profile.</p>
                <p><a href="https://www.linkedin.com/in/andrepessoamendes/" rel=”noreferrer”>Linkedin</a></p>
                <br>
                <p>Thank you for coming so deep.</p>
                <p>I hope see you soon again! = )</p>
            </div>
        </section>
        <section id="extra">
            <div class="table">
                <div class="row" id="intro">
                    <div class="" ></div>
                    <div class="col col-2">
                        <p>Do you still here? Great!</p>
                        <p>Lets talk a little more about me? = D</p>
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
                <div class="row" >
                    <div class="">
                    </div>
                    <div class="col">
                        <div class="experiences">+ 12 years as developer</div>
                        <div class="experiences">+ 4 years on react</div>
                        <div class="experiences">+ 5 years as animator</div>
                        <div class="experiences">+ 8 years as designer</div>
                    </div>
                    <div class="col">
                        <div class="experiences">. a hundreds of sites</div>
                        <div class="experiences">. a lot of web apps</div>
                        <div class="experiences">. a custom eLearn CMS</div>
                        <div class="experiences">. SmarTV app</div>
                        <div class="experiences">. a no-code developer app</div>
                    </div>
                </div>
                <div class="row" id="exp">
                    <div class="">
                        <h2>Skills</h2>
                    </div>
                    <div class="col">
                        <h3>Team</h3>
                        <div class="rated"><span>Mentor</span><span class="stars"><?php star(4,1); ?></span></div>
                        <div class="rated"><span>Team lead</span><span class="stars"><?php star(3,2); ?></span></div>
                        <div class="rated"><span>Tech lead</span><span class="stars"><?php star(3,2); ?></span></div>
                    </div>
                    <div class="col">
                        <h3>Management</h3>
                        <div class="rated"><span>SCRUM master</span><span class="stars"><?php star(4,1); ?></span></div>
                        <div class="rated"><span>Project manager</span><span class="stars"><?php star(3,2); ?></span></div>
                    </div>
                </div>
                <div class="row" id="techs">
                    <div class="">
                        <h2>Techs</h2>
                    </div>
                    <div class="col">
                        <h3>Frontend</h3>
                        <div class="rated"><span>React</span><span class="stars"><?php star(5,0); ?></span></div>
                        <div class="rated"><span>Angular</span><span class="stars"><?php star(3,2); ?></span></div>
                        <div class="rated"><span>Vuejs</span><span class="stars"><?php star(2,3); ?></span></div>
                        <div class="rated"><span>React Native</span><span class="stars"><?php star(2,3); ?></span></div>
                    </div>
                    <div class="col">
                        <h3>Backend</h3>
                        <div class="rated"><span>PHP</span><span class="stars"><?php star(4,1); ?></span></div>
                        <div class="rated"><span>Nodejs</span><span class="stars"><?php star(3,2); ?></span></div>
                        <h3>CMS</h3>
                        <div class="rated"><span>Wordpress</span><span class="stars"><?php star(4,1); ?></span></div>
                        <div class="rated"><span>Drupal</span><span class="stars"><?php star(3,2); ?></span></div>
                    </div>
                </div>
            </div>
            <img src="./resources/deep_anchor.png" id="deepanchor" />
        </section>
        <footer>Power by <a href="https://github.com/AndrePessoa">@AndrePessoa</a></footer>
        <script src="./resources/script.js" ></script>
    </body>
</html>