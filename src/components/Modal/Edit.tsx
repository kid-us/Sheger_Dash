import { useEffect } from "react";
import axios from "axios";
import baseUrl from "../../services/request";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import useBrands from "../../hooks/useBrands";
import useCategories from "../../hooks/useCategories";

const schema = z.object({
  description: z.string().min(10, {
    message: "Description required and must be grater than 10 chars.",
  }),
  price: z.string().min(1, {
    message: "Price required.",
  }),
  quantity: z.string().min(1, {
    message: "Quantity required.",
  }),
  category: z.string().min(1, {
    message: "Categories required.",
  }),
  brand: z.string().min(1, {
    message: "Brand required.",
  }),
  sizeStart: z.string().min(1, {
    message: "Start size required.",
  }),
  sizeEnd: z.string().min(1, {
    message: "End size required.",
  }),
  name: z
    .string()
    .min(4, { message: "Name required and must be greater than 4 chars.." }),
});

type FormData = z.infer<typeof schema>;
const Edit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  return (
    <>
      <div className="fixed"></div>
    </>
  );
};

export default Edit;
