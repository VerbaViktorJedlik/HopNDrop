import { href, Link } from "react-router";
import Clicker from "./tutorialComponents/Clicker";

function useState() {
  return (
    <div className="p-12">
      A useState egy hook. A hookok a reactben mindig a{" "}
      <span className="font-bold">use</span> kulcsszóval kell hogy kezdődjenek.
      A hookoknak nagyon sok szabályuk van. Az egyik például, hogy nem hívhatunk
      meg hookot if en belül vagy feltételes return után, tehát az után, hogy
      lehet, hogy már visszareturneltünk. A{" "}
      <span className="font-bold">useState</span> snippet használatával
      létrehozhatunk egy useState et.
      <p>
        Így néz ki amúgy:
        <br />
        <code>const [name, setName] = useState&lt;string&gt;("Sanyi OP");</code>
      </p>
      <p>
        Körülbelül amúgy olyan, mint egy prop a c# ban. Tehát van két cucc amit
        kapunk az egyik a name, a másik a setName. A name kezdő értéke "Sanyi
        OP" és a name egy konstans, tehát nem lehet neki újra értéket adni.
        Viszont a <code> setName()</code> az arra lett kitalálva, hogy ajd neki
        valami más értéket. Például:
        <br />
        <code>setName("Mau is OP")</code> akkor új értéket kap a name. És ami a
        legfontosabb, hogy ez a változtatás{" "}
        <span className="font-bold">Frissíti</span> a komponenst, tehát újra
        lerenderelődik az egész komponens ahol a name változott és annak
        gyerekei. Tehát ha valamiért a "Too many rerender hibát kapod az azért
        van, mert valahol végtelen ciklusban változtatsz egy state et, ami így
        végtelenszer próbál újra meg újra renderelődni."
      </p>
      <p>
        Ha egy useState et szeretnél egy gyerek komponensben változtatni, akkor
        adj át neki egy függvényt ami változtatja, vagy add át neki a setState
        függvényt és hívd meg a gyerek komponensben.
      </p>
      <p>
        Nézzünk egy példát egy egyszerű számlálóra (Itt érdemes mindenképp
        megnézni a Clicker komponenst, mert néhány új dolog van benne és
        kommenteltem.):
      </p>
      <br />
      <Clicker />
      <br />
      <Link
        className="underline text-cyan-400"
        to={href("/tutorial/conditionRender")}
      >
        Feltételes renderelés
      </Link>
    </div>
  );
}
export default useState;
