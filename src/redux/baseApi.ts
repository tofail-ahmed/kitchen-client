import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi=createApi({
      reducerPath:"baseApi",
      baseQuery:fetchBaseQuery({
            baseUrl:"../../food.json"
      }),
      endpoints:()=>({}),
      tagTypes:["foods"]
})