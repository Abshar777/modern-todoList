import { Outlet } from "react-router-dom";
import "../../assets/css/index.css";
import { useGSAP } from "@gsap/react";
import gsap, { Expo } from "gsap";
import { useState } from "react";


const Auth = () => {
  const [i, setI] = useState(-1.5);
  const qots = [
    "Forget about your lists and do what you can because that’s all you can do",
    "You can always change your plan, but only if you have one",
    "Phone up the people you miss and tell them you love them.",
    "Implement whatever organizational system works best for you.",
  ];
  const [str, setStr] = useState(qots[i]);

  useGSAP(() => {
    gsap.from("h1 span", {
      textShadow: "0 0 100px #fff",
      filter: "blur(5px)",
      scale: 1.2,
      opacity: 0,
      ease: Expo.easeInOut,
      duration: 5,
      stagger: 0.1,
      runBackwards: true,
      repeat: Infinity,
      yoyo: true,
      onRepeat: () => {
        setI((pre) => {
          const nextI = pre !== qots.length + 0.5 - 1 ? pre + 0.5 : 0;
          setStr(qots[Math.floor(nextI)]);
          return nextI;
        });
      },
    });
  });

  return (
    <div className="gridAnim h-screen w-screen relative">
      <div className="absolute w-full h-screen pointer-events-none bg-gradient-to-b from-transparent to-background"></div>
      <div className="w-1/4 left-0 h-full absolute z-[0] bg-gradient-to-r from-background"></div>
      <div className="w-1/4 right-0 h-full absolute z-[0] bg-gradient-to-l from-background"></div>
      <div className="relative z-20 flex items-center justify-center px-4 w-full h-full">
        <Outlet />
      
        <h1 className="mt-[3rem]  absolute top-[85%] md:flex hidden uppercase font-semibold text-xl  gap-1">
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <span
                className="bg-clip-text  text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500"
                key={i}
              >
                {str?.split(" ")?.[i]}
              </span>
            ))}
        </h1>
      </div>
    </div>
  );
};

export default Auth;
