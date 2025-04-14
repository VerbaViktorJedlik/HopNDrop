interface PropsExampleProps {
  value: string;
  value2: number;
}

function PropsExample({ value, value2 }: PropsExampleProps) {
  return (
    <div>
      <h1 className="text-xl">Én a PropsExample component vagyok</h1>
      <p>Ezt a szövget a szülő elemtől kaptam: {value}</p>
      <p>Ezt a számot a szülő elemtől kaptam: {value2}</p>
    </div>
  );
}
export default PropsExample;
