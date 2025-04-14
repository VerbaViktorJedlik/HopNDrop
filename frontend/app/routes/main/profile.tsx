import { PostageTable } from "components/table";
import { Button } from "~/components/ui/button";
import { Fragment } from "react/jsx-runtime";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Link } from "react-router";
export default function profile() {
  return (
    <div className="p-10">
      <Card>
        <CardHeader>
          <CardTitle>Csomagjaid</CardTitle>
          <CardDescription>Itt láthatod csomagjaid.</CardDescription>
        </CardHeader>
        <CardContent>
          <PostageTable />
        </CardContent>
      </Card>
      <div className="buttons flex justify-center gap-4 mt-5 ">
        <Button asChild>
          <Link to="/send">Új csomag feladása</Link>
        </Button>
        <Button>
          <Link to="/pickup">Új csomag elvállalása</Link>
        </Button>
      </div>
    </div>
  );
}
