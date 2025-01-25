import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GoalResponse,DeleteGoalRequest,NewGoalRequest,UpdateGoalRequest,AllGoalsResponse, MessageResponse,GetProjectGoalsRequest,MarkGoalCompletedRequest } from "../../types/api-types";
import { server } from "../../constants/config";


export const goalAPI = createApi({
  reducerPath: "goalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/goal/`,
  }),
  tagTypes: ["goal"],
  endpoints: (builder) => ({

    goalDetails: builder.query<GoalResponse,DeleteGoalRequest>({
      query: (id) =>({
        url: `${id}`,
        credentials: "include",
      }),
      providesTags: ["goal"],
    }),

    getAllUserAssignedGoals: builder.query<AllGoalsResponse,GetProjectGoalsRequest>({
      query: ({id})=>({
        url:`my/${id}`,
        credentials:"include"
      }),
      providesTags: ["goal"],
    }),

    getProjectGoals: builder.query<AllGoalsResponse, GetProjectGoalsRequest>({
      query: ({id})=>({
        url:`all/${id}`,
        credentials:"include"
      }),
      providesTags: ["goal"],
    }),
    getProjectCompletedGoals:builder.query<AllGoalsResponse,GetProjectGoalsRequest>({
      query:({id})=>({
        url:`completed/${id}`,
        credentials:"include"
      }),
      providesTags:["goal"]
    }),
    getProjectPendingGoals:builder.query<AllGoalsResponse,GetProjectGoalsRequest>({
      query:({id})=>({
        url:`pending/${id}`,
        credentials:"include"
      }),
      providesTags:["goal"]
    }),
    markGoalAsCompleted:builder.mutation<MessageResponse,MarkGoalCompletedRequest>({
      query:({id,projectId})=>({
        url:`done/${id}`,
        body:projectId,
        method:"PUT",
        credentials:"include"
      }),
      invalidatesTags: ["goal"],
    }),
    
    newGoal: builder.mutation<MessageResponse, NewGoalRequest>({
      query: ({ formData}) => ({
        url: "new",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["goal"],
    }),

    updateGoal: builder.mutation<MessageResponse, UpdateGoalRequest>({
      query: ({ formData,id}) => ({
        url: `${id}`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["goal"],
    }),

    deleteGoal: builder.mutation<MessageResponse, DeleteGoalRequest>({
      query: ({ id }) => ({
        url: `${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["goal"],
    }),
  }),
});

export const {useDeleteGoalMutation,useNewGoalMutation,useUpdateGoalMutation,useMarkGoalAsCompletedMutation,useGetAllUserAssignedGoalsQuery,useGetProjectCompletedGoalsQuery,useGetProjectGoalsQuery,useGetProjectPendingGoalsQuery,useGoalDetailsQuery}=goalAPI;

