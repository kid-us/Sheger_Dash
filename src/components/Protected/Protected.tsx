import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../services/request";

interface ProtectedProps {
  children: React.ReactNode;
}

export interface UserProps {
  id: number;
  username: string;
}

const Protected = ({ children }: ProtectedProps) => {
  const access_token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (access_token) {
      axios
        .get<UserProps>(`${baseUrl}admin/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch(() => {
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  return children;
};

export default Protected;
