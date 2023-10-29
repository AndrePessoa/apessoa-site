import React from "react";
import ScreenHome from "./screens/home";
import ScreenAbout from "./screens/about";
import ScreenResume from "./screens/resume";

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

function Footer(props: FooterProps) {
  return (
    <footer {...props}>
      Power by <a href="https://github.com/AndrePessoa">@AndrePessoa</a>
    </footer>
  );
}

function App() {
  return (
    <>
      <ScreenHome />
      <ScreenAbout />
      <ScreenResume />
      <Footer />
      <script src="./resources/script.js"></script>
    </>
  );
}

export default App;
