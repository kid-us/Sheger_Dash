import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../services/request";

export interface CategoryItem {
  id: number;
  category_names: string;
}

export interface Category {
  categories: CategoryItem[];
}

const useCategories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  const access_token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch Brands
    const fetchBrands = async () => {
      try {
        const response = await axios.get<Category>(
          `${baseUrl}store/get-categories`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBrands();
  }, []);

  return {
    categories,
  };
};

export default useCategories;
