import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartArea } from "lucide-react";

interface DataCardProps {
  title: string;
  value: number;
}

export default function DataCard({ title, value }: DataCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
        <CardAction>
          <ChartArea />
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{value}</p>
      </CardContent>
      {/*       <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
