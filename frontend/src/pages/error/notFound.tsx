import { Link } from "react-router-dom"


const NotFound = () => {
  return (
    <div className="bg-zinc-900 text-white w-full  flex-col  flex items-center justify-center">
      Not Found
      <Link to={'/'}>Home</Link>
    </div>
  )
}

export default NotFound
