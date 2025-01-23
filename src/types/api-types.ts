import { Learner, Ride, Roommate } from "./types";

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
export type AllLearnersResponse={
  learners:Learner[];
  success: boolean;
}


