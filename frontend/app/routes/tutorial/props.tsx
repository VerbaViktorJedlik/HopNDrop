import { href, Link } from "react-router";
import PlayGround from "./tutorialComponents/PlayGround";
import PropsExample from "./tutorialComponents/PropsExample";

function props() {
  const testNum = 65;
  return (
    <div className="p-12">
      <p>
        A <span className="font-bold"> componentProps </span> snippet
        segítségével készíthetsz magadnak egy olyan componenst ami vár egy prop
        ot.{" "}
      </p>
      <p>
        A reactben is úgy van, hogy a komponensek egymásnak lefelé adják a
        propsokat (parent a childrennek), tehát úgy gondolkozz, hogy fel nem
        tudsz adni egyet sem.
      </p>
      <p>Itt egy példa a prop átadásra:</p>
      <div className="p-3 border-2 border-black">
        <PropsExample value={"test szöveg"} value2={testNum} />
      </div>
      <p>
        Fontos tudni, ha a szülő elem újra renderelődik, akkor az összes gyerek
        elem is újra renderelődik. Na de mikor is renderelődik újra egy
        komponens?
      </p>
      <Link className="underline text-cyan-400" to={href("/tutorial/useState")}>
        useState
      </Link>
    </div>
  );
}
export default props;
