import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DataCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export default function DataCard({ title, value, icon }: DataCardProps) {
  if(value === null || value === undefined || isNaN(value)) value = 0;
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          {icon}
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{value}</p>
      </CardContent>
    </Card>
  );
}
