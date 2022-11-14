import Router from "next/router";
import type { NextApiRequest } from "next";
import Cookies from "js-cookie";
import { API_URL } from "./api";
import axios from "axios";

interface IUser {
  id: string;
  username: string;
}

interface IData {
  user: {
    id: string;
    username: string;
  };
  jwt: string;
}

export const setToken = (data: IData, expires?: number) => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.set("id", data.user.id, { expires });
  Cookies.set("username", data.user.username, { expires });
  Cookies.set("jwt", data.jwt, { expires });

  if (Cookies.get("username")) {
    Router.reload();
  }
};

export const unsetToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  Cookies.remove("id");
  Cookies.remove("jwt");
  Cookies.remove("username");

  Router.reload();
};

export const getUserFromLocalCookie = async () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return await axios(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((data) => {
        return data.data.username;
      })
      .catch((error) => console.error(error));
  } else {
    return;
  }
};

export const getIdFromLocalCookie = async () => {
  const jwt = getTokenFromLocalCookie();
  if (jwt) {
    return await axios(`${API_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then((data) => {
      return data.data.id;
    });
  } else {
    return;
  }
};

export const getTokenFromLocalCookie = () => {
  return Cookies.get("jwt");
};

export const getTokenFromServerCookie = (req: NextApiRequest) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const jwtCookie = req.headers.cookie.split(";").find((c) => c.trim().startsWith("jwt="));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split("=")[1];
  return jwt;
};

export const getIdFromServerCookie = (req: NextApiRequest) => {
  if (!req.headers.cookie || "") {
    return undefined;
  }
  const idCookie = req.headers.cookie.split(";").find((c) => c.trim().startsWith("id="));
  if (!idCookie) {
    return undefined;
  }
  const id = idCookie.split("=")[1];
  return id;
};
