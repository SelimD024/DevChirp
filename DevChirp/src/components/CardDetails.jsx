import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cardData } from "../Data/cardData"; // Aangepast importpad

function CardDetails() {
  const { community, id } = useParams(); // Haal het community-id en kaart-id op uit de URL-parameter
  const [card, setCard] = useState(null); // Huidige kaart

  useEffect(() => {
    // Zoek de kaart in de array op basis van het community-id en kaart-id
    const foundCard = cardData[community].find((card) => card.id === Number(id));

    // Stel de kaartgegevens in
    setCard(foundCard);
  }, [community, id]);

  // Rest van de code blijft hetzelfde
}

export default CardDetails;
