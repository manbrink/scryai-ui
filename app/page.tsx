"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "./components/withQueryClientProvider";

import CardSearch from "./CardSearch";
import CardList from "./CardList";
import Loading from "./components/Loading";

import { getCards } from "./queries";

const CardsPage = () => {
  const [cardId, setCardId] = useState("");

  // get the ai cards
  const { fetchStatus, isError, data } = useQuery({
    queryKey: ["cards", cardId],
    queryFn: () => getCards(cardId),
    retry: 5,
    enabled: cardId !== "",
  });

  if (isError) {
    return <div>Error</div>;
  } else {
    // console.log('page data', data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24">
      <h1 className="text-4xl font-bold mt-8">Scry AI</h1>
      <p className="text-xl mt-4 text-center">Search for a card by name to see similar cards.</p>
      <div className="relative mt-5 w-full">
        <CardSearch setCardId={setCardId} />
        {fetchStatus === "fetching" && <Loading />}
        {fetchStatus !== "fetching" && data && <CardList data={data} />}
      </div>   
    </main>
  )
}

export default withQueryClientProvider(CardsPage);