export type signupDataType = {
    email : string,
    password : string,
    name: string | "",
    gender: string | null
};

export type signinDataType = {
    email : string,
    password : string,
    access_token? : string
}

export type categoryType = {
    map(arg0: ({ id, title, icon }: { id: number; title: string; icon: string; }) => import("react/jsx-runtime").JSX.Element): unknown;
    length: number;
    id: number,
    title : string,
    icon : string
}