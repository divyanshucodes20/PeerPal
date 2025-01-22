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
}
