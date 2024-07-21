/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import ChapterCreationModal from "./ChapterCreationModal";
import { useGetChapter } from "@/hooks/useChapterApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ThreeDotMenu from "./ThreeDotMenu";
import { useState } from "react";
import DOMPurify from "dompurify";
import Loading from "./Loading/Loading";
import BookStatusButton from "./BookStatusButton";
import BookDetailMobile from "./BookDetailMobile";
import { useChapterContext } from "@/contexts/ChapterContext";
import EditChapter from "./bookdetails/EditChapter";

const Chapters: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { edit } = useChapterContext();

  const {
    data: chapters = [],
    error,
    isPending,
  } = useGetChapter({ slug: slug ?? "" });

  // const editChapterMutation = useUpdateChapter();

  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (isPending) {
    return (
      <div className=" flex justify-center items-center w-full h-[700]">
        <Loading variant="blue" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center my-[100px]">
        <h1 className="mt-3 text-2xl font-normal">Error Loading Chapters</h1>
        <p className="text-gray-400">
          There was an error fetching the chapters. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-auto bg-white md:w-4/5 font-primary dark:bg-darkMode1">
      <BookDetailMobile />
      <BookStatusButton text={"Chapters"} />
      <div className="flex flex-col items-center justify-start mx-auto overflow-y-auto text-center h-[600px]">
        {chapters.length > 0 ? (
          <>
            {chapters.map((chapter: any) => (
              <div
                key={chapter?.id}
                className=" flex flex-col text-black dark:text-white max-h-[600px]"
              >
                <Accordion
                  type="multiple"
                  className=" w-[350px] md:w-[1000px] overflow-y-auto "
                >
                  <AccordionItem
                    className="border border-gray-200"
                    value={chapter?.id}
                  >
                    <AccordionTrigger
                      className="w-full md:w-[1000px] flex justify-between"
                      onClick={() => toggleAccordion(chapter?.id)}
                    >
                      <div className="flex flex-col items-start gap-1">
                        {openAccordions[chapter?.id] ? (
                          <div className="flex items-center justify-between w-full">
                            <p className="pl-5 pr-1 text-sm text-start w-[900px]">
                              {chapter?.chapterNum} : {chapter?.title}
                            </p>
                            <ThreeDotMenu id={chapter.id} />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-between w-full h-16">
                            <div className="flex items-center justify-between h-10">
                              <p className="md:pl-5 md:pr-1 text-[12px] md:text-sm text-start w-[270px] md:w-[900px]">
                                {chapter?.chapterNum} : {chapter?.title}
                              </p>
                              <ThreeDotMenu id={chapter.id} />
                            </div>

                            <div className="flex items-start justify-start">
                              <p
                                className="text-sm text-start hidden md:block md:w-[800px]"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    `<span className = "text-black text-start dark:text-white">${chapter?.content.substring(
                                      0,
                                      140
                                    )} ...see more</span>`
                                  ),
                                }}
                              ></p>
                              <p
                                className="text-[12px] text-start md:hidden block"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    `<span className = "text-black dark:text-white">${chapter?.content.substring(
                                      0,
                                      35
                                    )} ...see more</span>`
                                  ),
                                }}
                              ></p>
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div
                        className="px-3 text-justify font-primary"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(chapter?.content),
                        }}
                      ></div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {edit.id === chapter.id && edit.status && (
                  <EditChapter
                    id={chapter?.id}
                    title={chapter.title}
                    content={chapter.content}
                    chapterNum={chapter?.chapterNum}
                  />
                )}
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center my-[100px]">
            <iframe
              src="https://lottie.host/embed/8866455b-434f-412d-863b-334f6c5c5724/EzyvqFxRUM.json"
              className="w-32 h-32 pt-10"
              title="Animation"
            ></iframe>
            <h1 className="mt-3 text-2xl font-normal text-black dark:text-white">
              Craft a Chapter
            </h1>
            <p className="text-gray-400">
              Could you please draft a comprehensive chapter for the book?
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-center ">
        {slug && <ChapterCreationModal slug={slug} />}
      </div>
    </div>
  );
};

export default Chapters;
