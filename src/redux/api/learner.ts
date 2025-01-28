import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddMemberProjectRequest, AllLearnersResponse, DeleteLearnerRequest, LearnerResponse, LinkToExistingProjectRequest, MessageResponse, NewLearnerRequest, NewLearnerRequestResponse, RemoveMemberProjectRequest, SearchLearnerRequest, SearchLearnersResponse, UpdateLearnerRequest } from "../../types/api-types";
import {server} from "../../constants/config"

export const learnerAPI = createApi({
  reducerPath: "learnerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/learner/`,
  }),
  tagTypes: ["learner"],
  endpoints: (builder) => ({
    searchLearnerRequests: builder.query<
      SearchLearnersResponse,
      SearchLearnerRequest
    >({
      query: ({ isProject, search, sort, page, }) => {
        let base = `all?search=${search}&page=${page}`;
        if (isProject) base += `&isProject=${isProject}`;
        if (sort) base += `&sort=${sort}`;
        return base;
      },
      providesTags: ["learner"],
    }),

    learnerDetails: builder.query<LearnerResponse, string>({
      query: (id) =>({
        url: `${id}`,
        credentials: "include",
      }),
      providesTags: ["learner"],
    }),

    allLearnerRequestsOfUser: builder.query<AllLearnersResponse, string>({
      query: ()=>({
        url:"my",
        credentials:"include"
      }),
      providesTags: ["learner"],
    }),

    allUserJoinedLearnerRequests: builder.query<AllLearnersResponse, string>({
      query: ()=>({
        url:"joined",
        credentials:"include"
      }),
      providesTags: ["learner"],
    }),

    newLearnerRequest: builder.mutation<NewLearnerRequestResponse, NewLearnerRequest>({
      query: ({ formData}) => ({
        url: `new`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["learner"],
    }),

    updateLearnerRequest: builder.mutation<MessageResponse, UpdateLearnerRequest>({
      query: ({ formData,id}) => ({
        url: `${id}`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["learner"],
    }),

    deleteLearnerRequest: builder.mutation<MessageResponse, DeleteLearnerRequest>({
      query: ({ id }) => ({
        url: `${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["learner"],
    }),
    joinLearnerRequest: builder.mutation<MessageResponse, string>({
      query: (id) => ({
        url: `join/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["learner"],
    }),
    linkToExistingProject: builder.mutation<MessageResponse, LinkToExistingProjectRequest>({
        query: ({ id, projectId }) => ({
            url: `link/${id}`,
            method: "PUT",
            body:{projectId},
            credentials: "include",
        }),
        invalidatesTags: ["learner"],
    }),
    addMemberToLearnerRequest: builder.mutation<MessageResponse,AddMemberProjectRequest>({
      query: ({ id, membersId }) => ({
        url: `add/${id}`,
        method: "PUT",
        body:{membersId},
        credentials: "include",
      }),
      invalidatesTags: ["learner"],
    }),
    removeMemberFromLearnerRequest: builder.mutation<MessageResponse,RemoveMemberProjectRequest>({
      query: ({ id, member }) => ({
        url: `remove/${id}`,
        method: "PUT",
        body:{member},
        credentials: "include",
      }),
      invalidatesTags: ["learner"],
    }),
  }),
});

export const {
  useSearchLearnerRequestsQuery,
  useLearnerDetailsQuery,
  useAllLearnerRequestsOfUserQuery,
  useAllUserJoinedLearnerRequestsQuery,
  useNewLearnerRequestMutation,
  useUpdateLearnerRequestMutation,
  useDeleteLearnerRequestMutation,
  useJoinLearnerRequestMutation,
  useLinkToExistingProjectMutation,
  useAddMemberToLearnerRequestMutation,
  useRemoveMemberFromLearnerRequestMutation,
} = learnerAPI;