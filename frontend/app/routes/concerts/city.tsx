import type { Route } from "../../concerts/+types/city";

function city({ params }: Route.LoaderArgs) {
  return <div>City: {params.city}</div>;
}
export default city;
