import axios from 'axios';

export async function getCards(cardId: string) {
  let url = `${process.env.NEXT_PUBLIC_AI_URL}`;

  if (cardId) {
    url += encodeURIComponent(cardId);
  }

  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}