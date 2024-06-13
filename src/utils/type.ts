export type signupDataType = {
    email : string,
    password : string,
};

export type signinDataType = {
    email : string,
    password : string,
}

export type userDataType = {
    email : string,
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


export type  BookDataType = {
    id: number;
    title : string,
    coverImg : string,
    description : string,
    categoryId : string,
    status : string,
    keywords : string[],
}

export type LibraryBookCardProps = {
    books?: BookDataType[];
  }