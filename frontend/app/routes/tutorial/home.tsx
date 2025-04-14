import MyCard from "./tutorialComponents/MyCard";
import PlayGround from "./tutorialComponents/PlayGround";

export default function Home() {
  return (
    <div className="p-12">
      <p>
        Nézzünk pár alap dolgot. A components mappában vannak a componensek,
        amiket így kell meghívni:{" "}
        <span className="font-bold">&lt;MyCard&gt; &lt;/MyCard&gt;</span> vagy
        röviden <span className="font-bold">&lt;MyCard/&gt;</span>
        <MyCard /> {/* Komponens */}
      </p>
    </div>
  );
}
