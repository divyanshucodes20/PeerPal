import { Goal, Learner, Project, Ride, Roommate, User } from "./types";

export type AllRidesResponse={
    rides: Ride[];
    success: boolean;
}
export type SearchRidesResponse=AllRidesResponse&{
    totalPage: number;
}
export type SearchRideRequest = {
    source: string;
    destination: string;
    prizePerPerson: number;
    date: string;
    page: number;
    search: string;
    sort: string;
  };
export type RideResponse = {
    success: boolean;
    ride: Ride;
};
export type CustomError = {
    status: number;
    data: {
      message: string;
      success: boolean;
    };
  };
  
  export type MessageResponse = {
    success: boolean;
    message: string;
  };
export type NewRideRequest = {
    formData: FormData;
}
export type UpdateRideRequest = {
    formData: FormData;
    id: string;
}
export type DeleteRideRequest = {
    id: string;
}
export type AllRoommatesResponse={
    roommates: Roommate[];
    success: boolean;
}
export type SearchRoommatesResponse=AllRoommatesResponse&{
  totalPage: number;
}
export type SearchRoommateRequest = {
  location: string;
  rent: number;
  page: number;
  search: string;
  sort: string;
};
export type RoommateResponse = {
  success: boolean;
  roommate: Roommate;
};
export type NewRoommateRequest = {
  formData: FormData;
}
export type UpdateRoommateRequest = {
  formData: FormData;
  id: string;
}
export type DeleteRoommateRequest = {
  id: string;
}
export type AllProjectsResponse={
  projects:Project[];
  success: boolean;
}
export type ProjectResponse = {
  success: boolean;
  project: Project;
};
export type NewProjectRequest = {
  formData: FormData;
}
export type UpdateProjectRequest = {
  formData: FormData;
  id: string;
}
export type DeleteProjectRequest = {
  id: string;
}
export type AddMemberProjectRequest = {
id: string;
members:User[];
}
export type RemoveMemberProjectRequest = {
id: string;
member:User;
};
export type ProjectSuggestionsResponse = {
  success: boolean;
  suggestions: string[];
}
export type UserOtherThanMembersResponse = {
  success: boolean;
  users: User[];
}
export type AllLearnersResponse={
  learners:Learner[];
  success: boolean;
}
export type SearchLearnersResponse=AllLearnersResponse&{
  totalPage: number;
}
export type SearchLearnerRequest = {
isProject: boolean;
  page: number;
  search: string;
  sort: string;
};
export type LearnerResponse = {
  success: boolean;
  learner: Learner;
};
export type NewLearnerRequest = {
  formData: FormData;
}
export type UpdateLearnerRequest = {
  formData: FormData;
  id: string;
}
export type DeleteLearnerRequest = {
  id: string;
}
export type LinkToExistingProjectRequest = {
  projectId: string;
  id: string;
}
export type NewGoalRequest={
  formData:FormData;
}
export type DeleteGoalRequest={
  id:string;
}
export type UpdateGoalRequest={
  formData:FormData;
  id:string
}
export type GetProjectGoalsRequest={
  id:string;
}
export type AllGoalsResponse={
  goals:Goal[];
  success:boolean;
}
export type GoalResponse={
  goal:Goal;
  success:boolean;
}
export type MarkGoalCompletedRequest={
  id:string;
  projectId:string;
}
export type AllLocationsResponse={
  locations:string[];
  success:boolean;
}
export type AllSourcesResponse={
  sources:string[];
  success:boolean;
}
export type AllDestinationResponse={
  destinations:string[];
  success:boolean;
}




