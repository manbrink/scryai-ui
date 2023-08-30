import axios from 'axios';

export async function getCards(cardId: string) {
  let url = `${process.env.NEXT_PUBLIC_AI_URL}/cards/`;

  if (cardId) {
    url += encodeURIComponent(cardId);
  }

  try {
    const response = await axios.get(url);
    return JSON.parse(response.data);
  } catch (error) {
    // throw new Error(error.response ? error.response.statusText : "An error occurred");
  }
}
