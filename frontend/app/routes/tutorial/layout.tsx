import { href, Link, Outlet } from "react-router";
import PlayGround from "./tutorialComponents/PlayGround";

function layout() {
  return (
    <>
      <nav className="flex flex-wrap gap-5 p-2">
        <Link className="underline text-cyan-400" to={href("/tutorial")}>
          Bevezetés
        </Link>
        <Link
          className="underline text-cyan-400"
          to={href("/tutorial/components")}
        >
          Komponensek
        </Link>
        <Link className="underline text-cyan-400" to={href("/tutorial/props")}>
          props
        </Link>
        <Link
          className="underline text-cyan-400"
          to={href("/tutorial/useState")}
        >
          useState
        </Link>
        <Link
          className="underline text-cyan-400"
          to={href("/tutorial/conditionRender")}
        >
          Feltételes renderelés
        </Link>
        <Link className="underline text-cyan-400" to={href("/tutorial/list")}>
          Lista kiírás
        </Link>
        <Link
          className="underline text-cyan-400"
          to={href("/tutorial/useStateObject")}
        >
          useState object és array esetén
        </Link>
        <Link
          className="underline text-cyan-400"
          to={href("/tutorial/useEffect")}
        >
          useEffect
        </Link>
      </nav>
      <hr />
      <Outlet />
      <hr />
      <footer>
        <PlayGround />
      </footer>
    </>
  );
}
export default layout;
