import Scene from "./components/Scene";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);
function App() {
  const container = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
 useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      }
    });
  }, []);

  return (
    <main>
      <div ref={container} className="h-[300vh] bg-white">
        <div className="h-screen sticky top-0">
          <Scene scrollProgress={scrollProgress} />
        </div>
      </div>
    </main>
  );
}

export default App;
