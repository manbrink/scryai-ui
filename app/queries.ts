export async function getCards(searchTerm: string) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/cards`;

  if (searchTerm) {
    url += `/search/${encodeURIComponent(searchTerm)}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}