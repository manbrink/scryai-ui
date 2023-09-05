"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import withQueryClientProvider from "./withQueryClientProvider";

import Image from "next/image";

interface Card {
  scryfall_id: string;
  name: string;
  set: string;
  border_crop_url: string;
}

interface Props {
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

const CardSearchInput = ({ setCardId }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
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
    setSearchTerm(card.name);
    setCardId(card.scryfall_id)

    setShowResults(false);
  };

  const handleSearchTermChange = (e: any) => {
    const newSearchTerm = e.target.value;
  
    if (newSearchTerm !== searchTerm) {
      setSearchTerm(newSearchTerm);
      setCardId("");
      setShowResults(true);
    }
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
              id={card.scryfall_id}
              key={card.scryfall_id}
              className="duration-800 flex cursor-pointer items-center p-2 transition-colors hover:bg-neutral-medium"
              onClick={() => handleCardClick(card)}
            >
              <div className="relative h-[140px] w-[105px] overflow-hidden">
                {card.border_crop_url && (
                  <Image
                    src={card.border_crop_url}
                    alt={card.name}
                    fill={true}
                    sizes="(max-width: 105px) 100vw, (max-width: 105px) 50vw, 33vw"
                  />
                )}
              </div>
              <div className="ml-2 text-white-normal">
                <div>{card.name}</div>
                <div className="text-sm opacity-70">{card.set}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default withQueryClientProvider(CardSearchInput);