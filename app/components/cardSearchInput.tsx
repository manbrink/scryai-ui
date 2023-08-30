"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "./withQueryClientProvider";

import Image from "next/image";

interface Card {
  id: string;
  name: string;
  setName: string;
  scryfallBorderCropUrl: string;
  scryfallArtCropUrl: string;
  scryfallId: string;
}

interface Props {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  setCardId: (cardId: string) => void;
}

async function getData(searchTerm: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/cards/${encodeURIComponent(
      searchTerm
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

const CardSearchInput = ({ searchTerm, setSearchTerm, setCardId }: Props) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInternalSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { isLoading, isError, data, fetchStatus } = useQuery({
    queryKey: ["cards", internalSearchTerm],
    queryFn: () => getData(internalSearchTerm),
    enabled: internalSearchTerm !== "",
  });

  const handleCardClick = (card: Card) => {
    setSearchTerm(`${card.name} (${card.setName})`);
    setCardId(card.scryfallId)

    setShowResults(false);
  };

  const handleSearchTermChange = (e: any) => {
    setSearchTerm(e.target.value);
    setCardId("")

    setShowResults(true);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          data-cy="featured-card"
          type="text"
          id="featuredCard"
          name="featuredCard"
          // className="border-white w-full rounded border bg-white-normal px-3 py-2 text-gray-dark"
          className="border-white w-full border-b bg-neutral-dark py-2 pl-10 pr-4 text-white-normal focus:outline-none"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search for cards"
        />
        {fetchStatus === "fetching" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="border-gray-900 h-5 w-5 animate-spin rounded-full border-b-2 text-gray-dark"></div>
          </div>
        )}
      </div>

      {data && showResults && (
        <div
          id="card-search-input-select"
          className="absolute z-10 max-h-[550px] w-full overflow-y-auto bg-neutral-darkest"
        >
          {data.data.map((card: Card) => (
            <div
              data-cy="card-search-input-select-option"
              id={card.id}
              key={card.id}
              className="duration-800 flex cursor-pointer items-center p-2 transition-colors hover:bg-neutral-medium"
              onClick={() => handleCardClick(card)}
            >
              <div className="relative h-[140px] w-[105px] overflow-hidden">
                <Image
                  src={card.scryfallBorderCropUrl}
                  alt={card.name}
                  fill={true}
                  sizes="(max-width: 105px) 100vw, (max-width: 105px) 50vw, 33vw"
                />
              </div>
              <div className="ml-2 text-white-normal">
                <div>{card.name}</div>
                <div className="text-sm opacity-70">{card.setName}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withQueryClientProvider(CardSearchInput);