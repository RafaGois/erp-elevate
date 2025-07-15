import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <Link href="/auth">
        <Button variant="outline">Entrar</Button>
      </Link>
    </div>
  );
}
