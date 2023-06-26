import { usePokemon } from "@/hooks/usePokemon";
import Link from "next/link";
import styles from "@/styles/PokemonEntry.module.css";
import { Spinner } from "react-bootstrap";
import Image from "next/image";

export default function PokemonEntry({ name }: { name: string }) {
  const { data, isLoading } = usePokemon(name);

  return (
    <Link href={"/" + name}>
      <div className={styles.entry}>
        {isLoading && <Spinner animation="grow" />}
        {data && (
          <div className={styles.card}>
            <h1 className="text-center text-capitalize">{data.name}</h1>
            <Image
              src={data.sprites.other["official-artwork"].front_default}
              alt={"Pokemon: " + data.name}
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
