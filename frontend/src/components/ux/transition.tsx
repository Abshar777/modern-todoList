import {motion} from "framer-motion"
import { ComponentType } from "react"

const Transition = (OgComponent:ComponentType<any>) => {
  return ()=>(
    <>
    <OgComponent/>
    <motion.div initial={{scaleY:0,borderRadius:"0"}} animate={{scaleY:0,borderRadius:"0"}} exit={{scaleY:1,borderRadius:"0"}} style={{transformOrigin:"bottom"}} transition={{duration:1.5,delay:.3,delayChildren:1,ease:[0.22, 1, 0.36, 1]}} className="w-full z-[9999999] h-screen fixed top-0 left-0 t- bg-primary "></motion.div>
    <motion.div initial={{scaleY:1,borderRadius:"0"}} animate={{scaleY:0,borderRadius:"0"}} exit={{scaleY:0,borderRadius:"0"}} style={{transformOrigin:"top"}} transition={{duration:1.5,delay:.3,delayChildren:1,ease:[0.22, 1, 0.36, 1]}} className="w-full z-[9999999] h-screen fixed top-0 left-0 bg-primary "></motion.div>
    <motion.div initial={{scaleY:0,borderRadius:"0"}} animate={{scaleY:0,borderRadius:"0"}} exit={{scaleY:1,borderRadius:"0"}} style={{transformOrigin:"bottom"}} transition={{duration:1.5,delayChildren:1,ease:[0.22, 1, 0.36, 1]}} className="w-full z-[9999999] h-screen fixed top-0 left-0 t- bg-zinc-900 "></motion.div>
    <motion.div initial={{scaleY:1,borderRadius:"0"}} animate={{scaleY:0,borderRadius:"0"}} exit={{scaleY:0,borderRadius:"0"}} style={{transformOrigin:"top"}} transition={{duration:1.5,delayChildren:1,ease:[0.22, 1, 0.36, 1]}} className="w-full z-[9999999] h-screen fixed top-0 left-0 bg-zinc-900 "></motion.div>
    </>
  )
}

export default Transition
