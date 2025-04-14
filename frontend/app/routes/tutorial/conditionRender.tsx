import { useState } from "react";
import { href, Link } from "react-router";

function conditionRender() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isNice, setIsNice] = useState<boolean>(true);
  console.log(
    "Én minden alkalommal lefutok, amikor újra renderelődik a conditionRender."
  ); //Nézd meg a consolt és nézd meg, hogy bármelyik gombra nyosz megjelenek és mindent (beleértve a fenti mondatokat is) újra renderelődöm.
  return (
    <div className="p-12">
      <p>
        Megnézünk néhány feltételes renderelést. Tehát valamit csak akkor
        jelenítünk meg a htmlben, ha...
      </p>
      <p>
        Alapvetően ez mind a javascriptből fog jönni, tehát lehet szörnyülködni.
        (consoleon, pedig meg lehet nézni, hogy mikor renderelődik újra ez az
        egész komponens)
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            className="bg-amber-200 cursor-pointer p-2 rounded-2xl"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            SetIsVisible
          </button>
          {isVisible && <p>Én látszódom, ha az isvisible true</p>}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="bg-amber-200 cursor-pointer p-2 rounded-2xl"
            onClick={() => setIsNice((prev) => !prev)}
          >
            setIsNice
          </button>
          {isNice ? (
            <p>Én látszódom, ha szép</p>
          ) : (
            <p>Én látszódom, ha nem szép</p>
          )}
        </div>
      </div>
      <Link className="underline text-cyan-400" to={href("/tutorial/list")}>
        List
      </Link>
    </div>
  );
}
export default conditionRender;
