import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchRoommatesResponse, SearchRoommateRequest, RoommateResponse, AllRoommatesResponse, NewRoommateRequest, MessageResponse, UpdateRoommateRequest, DeleteRoommateRequest, AllLocationsResponse } from "../../types/api-types";
import {server} from "../../constants/config"

export const roommateAPI = createApi({
  reducerPath: "roommateAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/roommate/`,
  }),
  tagTypes: ["roommate"],
  endpoints: (builder) => ({
    searchRoommateRequests: builder.query<
      SearchRoommatesResponse,
      SearchRoommateRequest
    >({
      query: ({ search,sort,page,location,rent }) => {
        let base = `all?search=${search}&page=${page}`;

        if (location) base += `&location=${location}`;
        if (sort) base += `&sort=${sort}`;
        if (rent) base += `&rent=${rent}`;
        return base;
      },
      providesTags: ["roommate"],
    }),
    getAllLocations:builder.query<AllLocationsResponse,void>({
      query: () => `locations`,
      providesTags: ["roommate"],
    }),
    roommateDetails: builder.query<RoommateResponse, string>({
      query: (id) =>({
        url: `${id}`,
        credentials: "include",
      }),
      providesTags: ["roommate"],
    }),

    allRoommateRequestsOfUser: builder.query<AllRoommatesResponse, string>({
      query: ()=>({
        url:"my",
        credentials:"include"
      }),
      providesTags: ["roommate"],
    }),

    newRoommateRequest: builder.mutation<MessageResponse, NewRoommateRequest>({
      query: ({ formData}) => ({
        url: `new`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["roommate"],
    }),

    updateRoommate: builder.mutation<MessageResponse, UpdateRoommateRequest>({
      query: ({ formData,id}) => ({
        url: `${id}`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["roommate"],
    }),

    deleteRoommateRequest: builder.mutation<MessageResponse,DeleteRoommateRequest>({
      query: ({ id }) => ({
        url: `${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["roommate"],
    }),
    joinRoommateRequest: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `join/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["roommate"],
    }),
  }),
});

export const {
  useSearchRoommateRequestsQuery,
  useRoommateDetailsQuery,
  useAllRoommateRequestsOfUserQuery,
  useNewRoommateRequestMutation,
  useUpdateRoommateMutation,
  useDeleteRoommateRequestMutation,
  useJoinRoommateRequestMutation,
  useGetAllLocationsQuery
} = roommateAPI;