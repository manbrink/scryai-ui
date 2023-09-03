import Image from "next/image";

interface Card {
  id: string;
  name: string;
  image_uri: string;
  similarity_score: number;
}

interface CardListProps {
  data: Card[];
}

const CardList = ({ data }: CardListProps) => {
  return (
    <main className="container mx-auto">
      {(data.length > 0 && (
        <div className="grid justify-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {data.map((card: Card) => (
            <div
              data-cy={`deckListItem${card.name}`}
              key={card.id}
            >
              <div className="w-[285px] rounded bg-white-normal shadow-lg">
                <div className="relative h-[356.25px] w-[285px] overflow-hidden">
                  {card.image_uri && (
                    <Image
                      src={card.image_uri}
                      alt={card.name}
                      fill={true}
                      className="rounded-t"
                      sizes="(max-width: 285px) 100vw, (max-width: 285px) 50vw, 33vw"
                      // style={{ objectFit: "cover" }}
                    />
                  )}
                </div>

                <div className="p-4 bg-neutral-medium rounded-b">
                  <h2 className="text-l text-white-normal">{card.name}</h2>
                  <p className="text-sm text-white-normal opacity-70">
                    Similarity: <b>{card.similarity_score}</b>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )) || (
        <div className="flex h-64 items-center justify-center text-white-normal">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              No cards found. Try a different search.
            </h2>
          </div>
        </div>
      )}
    </main>
  );
};

export default CardList;