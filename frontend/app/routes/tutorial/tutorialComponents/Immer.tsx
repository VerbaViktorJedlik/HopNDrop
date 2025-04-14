import { produce } from "immer";
import { useState } from "react";

function Immer() {
  const [newAi, setNewAi] = useState<string>("");
  const [ais, setAis] = useState<string[]>(["Sanyi", "Mau"]);

  const addAi = () => {
    setAis(
      produce((draft) => {
        draft.push(newAi); // tehát itt már lehet olyat, hogy draft.shop.products[0].name = "productModify" Tehát összetett objecteknél ez nagyon kényelmes és nincs túlcifrázva.
      })
    ); // itt már a draftot úgy tudom használni, mint egy arrayt, szóval nem kell bontanom, mint a fenti pédákban. És itt fontos, hogy semmit nem returnelünk
    setNewAi(""); // az input értékét törli
  };

  return (
    <div className="mt-3">
      <input
        className="border-2 border-black mr-2"
        placeholder="new AI name"
        type="text"
        value={newAi}
        onChange={(e) => setNewAi(e.target.value)}
      />
      <button
        onClick={addAi}
        className="bg-amber-200 cursor-pointer p-2 rounded-2xl"
      >
        Hozzáad
      </button>
      <div>
        <h1 className="text-2xl">AI lista:</h1>
        <div className="flex flex-col gap-1">
          {ais.map((ai, idx) => (
            <span key={idx}>{ai}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Immer;
