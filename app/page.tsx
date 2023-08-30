"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "./components/withQueryClientProvider";

import CardFilter from "./CardFilter";
import CardList from "./CardList";
import Loading from "./components/Loading";

import { getCards } from "./queries";

const CardsPage = () => {
  const [search, setSearch] = useState("");

  const { isLoading, isError, data } = useQuery({
    queryKey: ["cards", search],
    queryFn: () => getCards(search),
    retry: 5,
  });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div className="relative mt-[60px]">
        <CardFilter data={data?.data} search={search} setSearch={setSearch} />
        {isLoading ? <Loading /> : <CardList data={data.data} />}
      </div>   
    </main>
  )
}

export default withQueryClientProvider(CardsPage);