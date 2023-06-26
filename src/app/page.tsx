"use client";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";
import * as PokemonAPI from "@/network/pokemon-api";
import PokemonEntry from "@/components/PokemonEntry";
import { Button, Col, Row, Spinner } from "react-bootstrap";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageNumber = +(searchParams.get("page") ?? "1") || 1;
  const { data, isLoading } = useSWR(["pokemon-page", pageNumber], () =>
    PokemonAPI.getPokemonPage(pageNumber)
  );

  if (isLoading)
    return <Spinner animation="border" className="d-block m-auto" />;

  return (
    <>
      <h1 className="text-center mb-5">Gotta cache &apos;em all</h1>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-4 my-5">
        {data?.results.map((pokemonEntry) => (
          <Col key={pokemonEntry.name}>
            <PokemonEntry name={pokemonEntry.name} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-4">
        {data?.previous && (
          <Button
            onClick={() => void router.push("/" + "?page=" + (pageNumber - 1))}
          >
            Previous page
          </Button>
        )}
        {data?.next && (
          <Button
            onClick={() => void router.push("/" + "?page=" + (pageNumber + 1))}
          >
            Next page
          </Button>
        )}
      </div>
    </>
  );
}
