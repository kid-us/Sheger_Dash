import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";

export interface PromoItem {
  id: number;
  discount: number;
  code: string;
}

export interface Promo {
  promo_codes: PromoItem[];
}

const usePromo = () => {
  const [promos, setPromos] = useState<PromoItem[]>([]);

  useEffect(() => {
    // Fetch Promos
    const fetchPromos = async () => {
      try {
        const response = await axios.get<Promo>(
          `${baseUrl}admin/get-promo-codes`,
          {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        setPromos(response.data.promo_codes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPromos();
  }, []);

  return {
    promos,
  };
};

export default usePromo;
