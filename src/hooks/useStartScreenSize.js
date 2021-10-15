import { useEffect } from "react";

let initScreenSize = 1000000;

export default function useStartScreenSize() {
  useEffect(() => {
    function defineDocumentVH() {
      const vh = window.innerHeight * 0.01;
      const size = Math.min(initScreenSize, vh);

      if (initScreenSize !== size) {
        document.documentElement.style.setProperty("--vh", `${size}px`);
        initScreenSize = size;
      }
    }
    defineDocumentVH();
    window.addEventListener("resize", ("resize", defineDocumentVH));

    return () => window.removeEventListener("resize", defineDocumentVH);
  }, []);
}
