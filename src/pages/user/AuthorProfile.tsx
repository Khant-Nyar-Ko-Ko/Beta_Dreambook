/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFetchBooks } from "@/hooks/useBookApi";
import { useParams } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";
import { FaPhoneVolume } from "react-icons/fa";
import Card from "@/components/tools/Card";
import BackButton from "@/components/tools/BackButton";

const AuthorProfile = () => {
  const { author } = useParams();
  const { data } = useFetchBooks(undefined, undefined, null, undefined, author);
  const books = data?.items;

  const authorPicture = data?.items[0].user?.profileImg;
  const authorName = data?.items[0].user?.name;
  const authorMail = data?.items[0].user?.email;
  const authorPhone = data?.items[0].user?.phone;

  return (
    <div className="flex flex-col items-start justify-start md:item-center dark:bg-darkMode3 bg-slate-200">
      <div className="flex flex-col items-start justify-start w-full gap-2 p-4 md:p-10 md:gap-5 md:flex-row bg-default dark:bg-darkMode1">
        <BackButton backPath="/home" />
        <div className="flex items-center justify-center w-full gap-5">
          <img
            src={authorPicture}
            className="w-24 h-24 rounded-full md:w-32 md:h-32 bg-slate-500"
            alt="author"
          />
          <div className="flex flex-col items-start justify-center w-full gap-1 md:items-start">
            <h3 className="text-xl text-white md:text-3xl font-primary">
              {authorName}
            </h3>
            <div className="flex flex-col justify-start gap-1 text-sm text-white md:flex-row md:text-base dark:text-slate-300">
              <span className="flex items-center gap-1">
                <BiLogoGmail />
                {authorMail}
              </span>
              <span className="flex items-center gap-1">
                <FaPhoneVolume />
                {authorPhone}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid justify-start w-full h-auto grid-flow-col gap-8 p-4 overflow-y-auto">
        {books?.map(
          ({
            id,
            title,
            coverImg,
            category,
            user,
            slug,
            favouriteCount,
            chapterNum,
          }: {
            id: any;
            title: string;
            coverImg: string;
            category: any;
            user: any;
            slug: string;
            favouriteCount: number;
            chapterNum: number;
          }) => {
            const { id: authorId } = user;

            return (
              <Card
                key={id}
                id={id}
                slug={slug}
                title={title}
                image={coverImg}
                categorylogo={category?.icon}
                categorytitle={category?.title}
                author={authorName}
                authorprofile={authorPicture}
                authorId={authorId}
                favouriteCount={favouriteCount}
                chapterNum={chapterNum}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
