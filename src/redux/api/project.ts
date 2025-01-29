import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AddMemberProjectRequest, AllProjectsResponse, DeleteProjectRequest, MessageResponse, NewProjectRequest, OtherMembersResponse, ProjectResponse, ProjectSuggestionsResponse, RemoveMemberProjectRequest, UpdateProjectRequest} from "../../types/api-types";
import {server} from "../../constants/config"


export const projectAPI = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/project/`,
  }),
  tagTypes: ["project"],
  endpoints: (builder) => ({

    projectDetails: builder.query<ProjectResponse, string>({
      query: (id) =>({
        url: `${id}`,
        credentials: "include",
      }),
      providesTags: ["project"],
    }),

    allProjectsOfUser: builder.query<AllProjectsResponse, string>({
      query: ()=>({
        url:"my",
        credentials:"include"
      }),
      providesTags: ["project"],
    }),

    allUserJoinedProjects: builder.query<AllProjectsResponse, string>({
      query: ()=>({
        url:"joined",
        credentials:"include"
      }),
      providesTags: ["project"],
    }),

    newProject: builder.mutation<MessageResponse, NewProjectRequest>({
      query: ({ formData}) => ({
        url: `new`,
        method: "POST",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["project"],
    }),

    updateProject: builder.mutation<MessageResponse, UpdateProjectRequest>({
      query: ({ formData,id}) => ({
        url: `${id}`,
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
      invalidatesTags: ["project"],
    }),

    deleteProject: builder.mutation<MessageResponse, DeleteProjectRequest>({
      query: ({ id }) => ({
        url: `${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["project"],
    }),
    getProjectSuggestions: builder.query<ProjectSuggestionsResponse, string>({
        query: (id) => ({
            url: `suggestions/${id}`,
            credentials: "include",
        }),
        providesTags: ["project"],
    }),
    addMemberToProject: builder.mutation<MessageResponse,AddMemberProjectRequest>({
        query: ({id,membersId}) => ({
            url: `add/${id}`,
            method: "PUT",
            body:{membersId},
            credentials: "include",
        }),
        invalidatesTags: ["project"],
    }),
    removeMemberFromProject: builder.mutation<MessageResponse,RemoveMemberProjectRequest>({
        query: ({id,member}) => ({
            url: `remove/${id}`,
            method: "PUT",
            body:{member},
            credentials: "include",
        }),
        invalidatesTags: ["project"],
    }),
    getFriendsOtherThanProjectMembers: builder.query<OtherMembersResponse, string>({
          query: (id) => ({
            url: `other-members/${id}`,
            credentials: "include",
          }),
          providesTags: ["project"],
        }),
        leaveProject: builder.mutation<MessageResponse, string>({
          query: (id) => ({
            url: `leave/${id}`,
            method: "PUT",
            credentials: "include",
          }),
          invalidatesTags: ["project"],
        }),
  }),
});

export const {
  useProjectDetailsQuery,
  useNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectSuggestionsQuery,
  useAddMemberToProjectMutation,
  useRemoveMemberFromProjectMutation,
  useLazyGetFriendsOtherThanProjectMembersQuery,
  useAllProjectsOfUserQuery,
  useAllUserJoinedProjectsQuery,
  useLeaveProjectMutation
} = projectAPI;