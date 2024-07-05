/* eslint-disable @typescript-eslint/no-explicit-any */
export type signupDataType = {
  email: string;
  password: string;
};

export type signinDataType = {
  email: string;
  password: string;
};

export type userDataType = {
  email?: string;
  phone?: string | "";
  bio: string | "";
  name: string | "";
  profileImg: string | "";
  gender: string | "";
  password?: string
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
    }) => any
  ): any;
  length: number;
  id: number;
  title: string;
  icon: string;
  priority: string;
  filter: (callbackfn: (value: categoryType, index: number, array: categoryType[]) => boolean) => categoryType[];
  find(
    callbackfn: (value: any, index: number, array: any[]) => boolean,
    thisArg?: any
  ): any;
};

export type  BookDataType = {
    bookId?: null;
    id?: number;
    title : string,
    coverImg : File | string,
    description : string,
    categoryId : string,
    status : string,
    keywords : string[],
    slug?: string
}

export type LibraryBookCardProps = {
    books?: BookDataType[];
  }

  export type CategoryContextType = {
    selectedCategories: any[] | null;  
    setCategory: (categoryId: any[] | null) => void;
  };

  export type ChapterProgressType = {
    slug: string,
    chapterProgress: number,
  }