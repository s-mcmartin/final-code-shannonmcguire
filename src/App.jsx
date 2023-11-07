import { Link, Outlet } from "react-router-dom";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("SM_Portfolio");
  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  return (
    <div className="bg-light dark:bg-dark">
    <nav>
      <Link to='/'>Home</Link>
      {" | "}
      <Link to='/about'>About</Link>
      {" | "}
      <Link to='/projects'>Projects</Link>
    </nav>
      <Outlet />
    </div>
  );
}

export default App;
