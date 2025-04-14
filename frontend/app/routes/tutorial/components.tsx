import { href, Link } from "react-router";

function components() {
  return (
    <div className="p-12">
      <p>
        Na én most megmutatom neked, hogy hogy néz ki egy componens. A komponens
        mindig nagy betűvel kell hogy kezdődjön. Alapból a{" "}
        <span className="italic font-bold">component</span> snippet generál
        neked egy alap componenst.
      </p>
      <p>
        Amit látni fogsz hogy egy html szerű cuccot return el vissza. Ezt
        javascript estén <span>JSX</span> Ezért amikor létrehozol egy komponens,
        akkor a kiterjesztés legyen <span className="font-bold">.jsx</span>{" "}
        (javascript esetén) vagy <span className="font-bold">.tsx</span> Ezzel
        jelzed, hogy a fájlban van olyan function ami JSX el fog returnelni.
      </p>
      <p>
        Amivel különbözik a JSX a htmltől, hogy class helyett{" "}
        <span className="font-bold">className</span> van. For helyett{" "}
        <span className="font-bold">htmlFor</span>. A többi kb ugyanaz. Ami
        menő, ha raksz egy &#123; &#125; amit e közé írsz az typescript.
      </p>
      <p>
        Ami még fontos, hogy nem tudsz két elemet returnelni JSX ben. Pl:
        <code>
          <br />
          &lt;div&gt;
          <br />
          &lt;/div&gt;
          <br />
          &lt;div&gt;
          <br />
          &lt;/div&gt;
        </code>
        <br />
        Ebben az esetben vagy bele kell rakni egy div be az egészet, vagy ha nem
        akarsz még egy div et, akkor rakd be teljesen üres tagbe. (Ez konkrétan
        semmit jelent, tehát a html be nem jelenik meg, csak legalább tudsz
        returnelni több elemet.)
        <br />
        <code>
          &lt;&gt;
          <br />
          &lt;div&gt;
          <br />
          &lt;/div&gt;
          <br />
          &lt;div&gt;
          <br />
          &lt;/div&gt;
          <br />
          &lt;/&gt;
        </code>
      </p>
      <p>Na nem lesz ilyen sok elmélet, csak ez muszáj az elején.</p>
      <p>Kicsit izgalmasabb rész jön :D</p>
      <Link className="underline text-cyan-400" to={href("/tutorial/props")}>
        props
      </Link>
    </div>
  );
}
export default components;
