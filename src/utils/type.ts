export type signupDataType = {
    email : string,
    password : string,
};

export type signinDataType = {
    email : string,
    password : string,
}

export type userDataType = {
    phone?: string | "",
    bio: string | "",
    name: string | "",
    profileImg: string | "",
    gender: string | "",
}

export type User = {
    email : string,
    password : string,
    phone?: string | "",
    bio: string | "",
    name: string | "",
    profileImg: string | "",
    gender: string | "",
}

export type categoryType = {
    map(arg0: ({ id, title, icon }: { id: number; title: string; icon: string; }) => import("react/jsx-runtime").JSX.Element): unknown;
    length: number;
    id: number,
    title : string,
    icon : string
}


export type  Book = {
    title : string,
    description : string,
    slug : string,
    categoryId : number,
    userId : number,
    keywords : string[],
    coverImg : string,
    formData : FormData
}