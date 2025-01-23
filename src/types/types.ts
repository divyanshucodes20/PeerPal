export type User={
    name:string;
    email:string;
    password:string;
    _id:string;
    otp:number;
    isVerified:boolean;
    avatar:string;
}

export type Ride={
    source: string;
    destination: string;
    date: string;
    seats:number;
    description:string;
    prizePerPerson:number;
    creator:User;
    contactNumber:number;
    members:User[];
    _id:string;
}
export type Roommate={
    location: string;
    description: string;
    creator: User;
    rent: number;
    contactNumber: number;
    _id: string;
}
export type Learner={
    title: string;
    description: string;
    creator: User;
    teamSize: number;
    contactNumber: number;
    members: User[];
    _id: string;
    isProject: boolean;
}
export type Project={
    name: string;
    creator: User;
    type:["group"|"personal"];
    members: User[];
    teamSize: number;
    groupChat: string;
    learnerId:Learner;
    _id: string;
    goals:Goal[];
}
export type Goal={
    project:Project;
    title:string;
    description:string;
    assignedTo:User[];
    _id:string;
    completed:boolean;
}
