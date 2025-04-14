import { href, Link } from "react-router";

function MyCard() {
  return (
    <div className="flex justify-center items-center mt-2">
      <div className="w-1/2 border-2 border-black border-solid p-2">
        <p>Én vagyok az első react kártya.</p>
        <p className="text-sm">Engem a MyCard generál le.</p>
        Én átviszlek a componens felépítés oldalra:{" "}
        <Link to="/tutorial/components" className="underline text-cyan-400">
          Components
        </Link>
      </div>
    </div>
  );
}
export default MyCard;
