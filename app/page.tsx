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
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
       <div className="relative mt-[60px] w-full">
        <CardSearch setCardId={setCardId} />
        {fetchStatus === "fetching" && <Loading />}
        {fetchStatus !== "fetching" && data && <CardList data={data} />}
       </div>   
    </main>
  )
}

export default withQueryClientProvider(CardsPage);