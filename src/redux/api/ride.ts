import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllDestinationResponse, AllRidesResponse, AllSourcesResponse, DeleteRideRequest, MessageResponse, NewRideRequest, RideResponse, SearchRideRequest, SearchRidesResponse, UpdateRideRequest } from "../../types/api-types";
import { server } from "../../constants/config";


export const rideAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/ride/`,
  }),
  tagTypes: ["ride"],
  endpoints: (builder) => ({
    searchRideRequests: builder.query<
      SearchRidesResponse,
      SearchRideRequest
    >({
      query: ({ destination, search, sort,source, page,date,prizePerPerson }) => {
        let base = `all?search=${search}&page=${page}`;

        if (prizePerPerson) base += `&prizePerPerson=${prizePerPerson}`;
        if (sort) base += `&sort=${sort}`;
        if (source) base += `&source=${source}`;
        if (destination) base += `&destination=${destination}`;
        if (date) base += `&date=${date}`;
        return base;
      },
      providesTags: ["ride"],
    }),
    getAllSources: builder.query<AllSourcesResponse, void>({
      query: () => "source",
      providesTags: ["ride"],
    }),
    getAllDestinations: builder.query<AllDestinationResponse, void>({
      query: () => "destination",
      providesTags: ["ride"],
    }),
    rideDetails: builder.query<RideResponse, string>({
      query: (id) =>({
        url: `${id}`,
        credentials: "include",
      }),
      providesTags: ["ride"],
    }),

    allRidesOfUser: builder.query<AllRidesResponse, string>({
      query: ()=>({
        url:"my",
        credentials:"include"
      }),
      providesTags: ["ride"],
    }),

    allUserJoinedRides: builder.query<AllRidesResponse, string>({
      query: ()=>({
        url:"joined",
        credentials:"include"
      }),
      providesTags: ["ride"],
    }),

    newRide: builder.mutation<MessageResponse, NewRideRequest>({
      query: ({ formData}) => ({
        url: `new`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["ride"],
    }),

    updateRide: builder.mutation<MessageResponse, UpdateRideRequest>({
      query: ({ formData,id}) => ({
        url: `${id}`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["ride"],
    }),

    deleteRide: builder.mutation<MessageResponse, DeleteRideRequest>({
      query: ({ id }) => ({
        url: `${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ride"],
    }),
    joinRide: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `join/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["ride"],
    }),
  }),
});

export const {
  useSearchRideRequestsQuery,
  useRideDetailsQuery,
  useAllRidesOfUserQuery,
  useAllUserJoinedRidesQuery,
  useNewRideMutation,
  useUpdateRideMutation,
  useDeleteRideMutation,
  useJoinRideMutation,
  useLazyGetAllSourcesQuery,
  useLazyGetAllDestinationsQuery
} = rideAPI;