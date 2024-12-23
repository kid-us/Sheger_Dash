import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";

export interface Shoes {
  id: number;
  brand: string;
  category: string;
  main_picture: string;
  name: string;
  price: number;
  size_range: string;
  stock: string;
  uid: string;
  description: string;
}

export interface AllShoes {
  shoes: Shoes[];
}

const useStock = () => {
  const [stock, setStock] = useState<Shoes[]>([]);

  const access_token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch Brands
    const fetchStocks = async () => {
      try {
        const response = await axios.get<AllShoes>(
          `${baseUrl}store/get-shoes`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setStock(response.data.shoes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStocks();
  }, []);

  return {
    stock,
  };
};

export default useStock;
