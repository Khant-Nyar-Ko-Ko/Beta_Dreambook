export type signupDataType = {
  email: string;
  password: string;
};

export type signinDataType = {
  email: string;
  password: string;
};

export type userDataType = {
  email: string;
  phone?: string | "";
  bio: string | "";
  name: string | "";
  profileImg: string | "";
  gender: string | "";
};

export type User = {
  email: string;
  password: string;
  phone?: string | "";
  bio: string | "";
  name: string | "";
  profileImg: string | "";
  gender: string | "";
};

export type categoryType = {
  map(
    arg0: ({
      id,
      title,
      icon,
      priority,
    }: {
      id: number;
      title: string;
      icon: string;
      priority: string;
    }) => import("react/jsx-runtime").JSX.Element
  ): any;
  length: number;
  id: number;
  title: string;
  icon: string;
  priority: string;
};

<<<<<<< HEAD
export type  BookDataType = {
    id?: number;
    title : string,
    coverImg : File | string,
    description : string,
    categoryId : string,
    status : string,
    keywords : string[],
}

export type LibraryBookCardProps = {
    books?: BookDataType[];
  }
=======
export type BookDataType = {
  title: string;
  coverImg: File | string;
  description: string;
  categoryId: string;
  status: string;
  keywords: string[];
};

export type BookResponseType = BookDataType & {
  id: number;
  slug: string;
};
>>>>>>> 99a3ad8 (commit)
