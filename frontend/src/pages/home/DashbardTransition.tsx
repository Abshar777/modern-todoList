
import { motion } from "framer-motion";
import { ComponentType } from "react";

const DashbardTransition = (OgComponent: ComponentType<any>) => {
  return ()=> (
    <>
      <OgComponent />
      <motion.div
        initial={{ opacity: 1 }}
        className="fixed flex bg-background items-center justify-center h-screen w-full"
      >
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="h-fit overflow-hidden items-center flex text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8"
        >
          {"Todos".split("").map((e, i) => (
            <motion.span
              initial={{ y: 100, scale: 0.5, opacity: 0, rotate: "90deg" }}
              animate={"first"}
              variants={{
                first: { y: 0, scale: 1, opacity: 1, rotate: "0deg" },
              }}
              transition={{
                ease: [0.33, 1, 0.68, 1],
                delay: i * 0.1,
                type: "spring",
                bounce: 0.39,
              }}
              key={i}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default DashbardTransition;
