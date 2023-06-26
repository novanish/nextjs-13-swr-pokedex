"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button, Form, Spinner } from "react-bootstrap";
import { usePokemon } from "@/hooks/usePokemon";
import { setNickname } from "@/network/pokemon-api";

export default function PokemonPage() {
  const { pokemon } = useParams();
  const { data, isLoading, mutate } = usePokemon(pokemon);

  async function handleSubmitNickname(event: React.FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const nickname = formData.get("nickname")?.toString().trim();

    if (!data || !nickname) return;

    const update = await setNickname(data, nickname);
    // mutate(update, { revalidate: false });
    mutate(update);
  }

  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <p>
          <Link href="/" className="link-light">
            ← PokéDex
          </Link>
        </p>
        {isLoading && <Spinner animation="grow" />}
        {data === null && <p>Pokemon not found</p>}
        {data && (
          <>
            <h1 className="text-center text-capitalize">{data.name}</h1>
            <Image
              src={data.sprites.other["official-artwork"].front_default}
              alt={"Pokemon: " + data.name}
              width={400}
              height={400}
            />
            <div className="d-inline-block mt-2">
              <div>
                <strong>Types:</strong>{" "}
                {data.types.map((type) => type.type.name).join(", ")}
              </div>
              <div>
                <strong>Height:</strong> {data.height * 10} cm
              </div>
              <div>
                <strong>Weight:</strong> {data.weight / 10} kg
              </div>
            </div>
            <Form onSubmit={handleSubmitNickname} className="mt-4">
              <Form.Group controlId="data-nickname-input" className="mb-3">
                <Form.Label>Give this Pokemon a nickname</Form.Label>
                <Form.Control name="nickname" placeholder="E.g. Ferdinand" />
              </Form.Group>
              <Button type="submit">Set nickname</Button>
            </Form>
          </>
        )}
      </div>
    </>
  );
}
