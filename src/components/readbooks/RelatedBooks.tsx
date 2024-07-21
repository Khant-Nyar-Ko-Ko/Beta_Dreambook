/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchRelatedBooks } from "@/hooks/useBookApi";
import Card from "../tools/Card";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RelatedBooks = ({ slug }: { slug: string }) => {
  const { data: relatedBooks, isLoading } = useFetchRelatedBooks(slug);

  if (isLoading || !relatedBooks) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <div className="flex flex-col w-screen gap-3 overflow-y-auto border-l-2 border-slate-200 dark:border-slate-700 md:w-1/5">
      <p className="px-5 py-5 font-semibold text-black font-primary dark:text-white">
        Related Books
      </p>
      <div className="flex flex-col gap-5 mx-5 overflow-y-scroll h-[600px]">
        {relatedBooks.map(
          ({
            id,
            title,
            coverImg,
            category,
            user,
            slug,
          }: {
            id: any;
            title: string;
            coverImg: string;
            category: any;
            user: any;
            slug: string;
          }) => {
            return (
              <Card
                key={id}
                id={id}
                slug={slug}
                title={title}
                image={coverImg}
                categorylogo={category?.icon}
                categorytitle={category?.title}
                author={user?.name}
                authorprofile={user?.profileImg}
                authorId={user?.id}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default RelatedBooks;
