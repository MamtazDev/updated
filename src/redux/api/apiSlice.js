import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const localhost = "https://turkey-tm-server.onrender.com/api/v1";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: localhost }),
  tagTypes: ["category", "products", "store"],
  endpoints: () => ({}),
});
