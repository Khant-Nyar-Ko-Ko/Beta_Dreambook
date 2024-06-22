/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchRelatedBooks } from "@/hooks/useBookApi"
import Card from "./Card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RelatedBooks = ({bookId} : {bookId : any})=> {

    const {data : relatedBooks, isLoading} = useFetchRelatedBooks(bookId);

    if (isLoading || !relatedBooks) {
        return <div>Loading...</div>; // or a loading spinner
      }
    

  return (
    <div className="flex flex-col w-screen gap-3 overflow-y-auto border-l-2 border-slate-200 dark:border-slate-700 md:w-4/5">
        <p className="px-5 py-5 font-semibold text-black font-primary dark:text-white">Related Books</p>
        <div className="flex flex-col gap-5 mx-5 ">
        {relatedBooks.map(
            ({
              id,
              title,
              coverImg,
              category,
              user,
            }: {
              id: any;
              title: string;
              coverImg: string;
              category: any;
              user: any;
            }) => {
              return (
                <Card
                  key={id}
                  id={id}
                  title={title}
                  image={coverImg}
                  categorylogo={category?.icon}
                  categorytitle={category?.title}
                  author={user?.name}
                  authorprofile={user?.profileImg}
                />
              );
            }
          )}
        </div>
      </div>
  )
}

export default RelatedBooks