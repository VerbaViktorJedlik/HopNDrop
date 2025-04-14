import { href, Link } from "react-router";
import Immer from "./tutorialComponents/Immer";

function useStateObject() {
  return (
    <div className="p-12">
      Nos a useState tud bonyi lenni, ha object vagy array van benne. Egy példa:
      <br />
      <code>
        const [datas, setDatas] = useState&lt;&#123;name: string, age:
        number&#125;&gt;(&#123;name: "Sanyi", age: 2.4&#125;);
        <br />
        ...
        <br />
        setDatas(prev =&gt; &#123;...prev, name: "Mau"&#125;)
        <br />
      </code>
      Változtatja a datas-t, de az age marad a régi. Most persze ki lehetett
      volna írni, hogy age: prev.age, de azért el tudjuk képzelni, hogy 7
      hosszúnál már nem akarjuk. Példa array esetén:
      <br />
      <code>
        const [datas, setDatas] = useState&lt;string[]&gt;(["Sanyi", "Mau"]);
        <br />
        ...
        <br />
        setDatas([...datas, "newAIName"])
      </code>
      <p>
        Ez pedig így hozzáad egyet a useStatehez. De most nézzük meg, hogy ezt
        ne kelljen megértenetek mit fogunk használni. (Persze ha megy, akkor
        nyugodtan használjátok a fentit.)
      </p>
      <h1 className="text-2xl">Immer</h1>
      <p>
        Ide már lusta vagyok írni, szóval nézd meg az{" "}
        <span className="font-bold">Immer</span> komponenst. És használd az{" "}
        <span className="font-bold">Immer</span> snipetet, hogy ne kelljen
        semmit megjegyezned.
      </p>
      <Immer />
      <p>
        Na ha ezt megértetted, akkor már nagyon király vagy. Szinte kész vagy.
        Szóval már nem szabad feladni :D
      </p>
      <Link
        className="underline text-cyan-400"
        to={href("/tutorial/useEffect")}
      >
        useEffect
      </Link>
    </div>
  );
}
export default useStateObject;
