import { useState } from "react";

function Clicker() {
  const [num, setNum] = useState<number>(0); //létrehozzuk a state et
  function plus() {
    // setNum(num + 1) // EZ HELYTELEN! Soha nem használjuk a num ot arra, hogy változtassunk, mert ezzel nem garantáljuk, hogy az előzőt változtatjuk. Tehát vannak esetek, amikor ez logikai hibához vezet.
    setNum((prev) => {
      return prev + 1;
    }); // Ez a jó megoldás. Kapunk a setNumtől egy paramétert (általában prev nek hívjuk) és azt returneljük vissza.
    // setNum(prev => prev + 1) //Javascript miatt ez is helyes és rövidebb, de az első könnyebben átlátható először.
  }
  return (
    <div className="flex flex-col justify-start items-start">
      <span>{num}</span>
      <button
        // onClick={plus()} // EZ HELYTELEN, a plus egyszer fog csak lefutni akkor mikor a Clicker renderelődik.
        onClick={() => plus()} // fontos!!! Az onclick mindig egy függvényt vár, tehát soha ne közvetlenül hívjuk meg a fügvényt, hanem lambdával.
        className="bg-amber-200 cursor-pointer p-2 rounded-2xl"
      >
        Növelem a számot
      </button>
    </div>
  );
}
export default Clicker;
