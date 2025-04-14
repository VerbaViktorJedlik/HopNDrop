import { href, Link } from "react-router";

const numList = ["1.", "2.", "3.", "4."]; // Mivel itt hozom létre, ezért ez csak egyszer jön létre és többször nem fut le.

function list() {
  // const numList = ["1.", "2.", "3.", "4."] // Ha itt hoznám létre, akkor minden újra renderelésnél lefut és elkészíti ezt a listás
  return (
    <div className="p-12">
      <p>
        Én most megmutatom, hogy hogyan tudsz listát kirajzolni. Fontos, hogy
        mindig a <span className="font-bold">map</span> fügvényt használd (nem
        lesz jó a for vagy a foreach).
      </p>
      <div className="flex flex-col gap-2">
        {numList.map((num, idx) => {
          // a map 2. paramétere egy index. Ez 0-tól számol. Ezt mindig tudod key nek használni, mert egyedi. De ha van id-d, ami fix egyedi, akkor azt is használhatod
          return (
            <div key={idx}>
              <span>{num}</span>
            </div>
          ); // A key megadása kötelező map használatakor (a parent elementnek)!! Ezen kívül valójában egy irdatlan egyszerű JSX return
        })}
      </div>
      <Link
        className="underline text-cyan-400"
        to={href("/tutorial/useStateObject")}
      >
        useState object és array esetén
      </Link>
    </div>
  );
}
export default list;
