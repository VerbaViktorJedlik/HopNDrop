import { useEffect, useState } from "react";
import ApiExample from "./tutorialComponents/ApiExample";

function useEffectComponent() {
  const [rerender, setRerender] = useState<number>(0);
  const [name, setName] = useState<string>("Sanyi");

  console.log("Én mindig lefutok");

  useEffect(() => {
    console.log("Én futok le csak egyszer");
  }, []); // az első paraméter egy function a második pedig a dependenci array, ha ez üres, akkor mindössze amikor először renderelődik ki akkor fut le ez, újra renderelésnél nem.

  useEffect(() => {
    console.log("Én azért futok le, mert változott a rerender vagy a name");
  }, [name, rerender]);

  useEffect(() => {
    console.log("Én azért futok le, mert változott a name");
  }, [name]);

  return (
    <div className="p-12">
      <p>
        Igen én vagyok a useEffect. Egy újabb hook. Mire vagyok jó? Nos én tudok
        olyat, hogy egy olyan function vagyok ami csak egyszer fut le, amikor a
        komponens létrejön és az újra renderelésnél már nem futok le újra. Vagy
        akkor futok le amikor az általad megadott változó(k) változott. Használd
        a <span className="font-bold">useEffect</span> snippetet, hogy létrehozd
      </p>
      <p>Nyomd meg a gombot és nézd a konzolt</p>
      <button
        onClick={() => setRerender((prev) => prev + 1)}
        className="bg-amber-200 cursor-pointer p-2 rounded-2xl"
      >
        Rerender változtatása miatt újra renderelés
      </button>
      <p>
        Tehát a useEffectben soha ne változtass olyan state et, ami feltételként
        meg van neki adva újra lefutásnak, mert könnyen végtelen ciklusra
        futhatsz. (Persze feltételesen változtathatod belül is, de azért akkor
        jól át kell gondolni.)
      </p>
      <p>
        Itt egy példa api lekérésére, mert azt rendszerint egy egyszer lefutós
        useEffectbe rakjuk. A példában megvárjuk az api válaszát és addig egy
        egyszerű loading animációt mutatunk. Nyomj egy f5 öt és nézd meg:
      </p>
      <ApiExample />
    </div>
  );
}
export default useEffectComponent;
