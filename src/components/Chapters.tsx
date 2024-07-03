/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useParams } from "react-router-dom";
import SwitchButton from "./SwitchButton";
import ChapterCreationModal from "./ChapterCreationModal";
import { useGetChapter } from "@/hooks/useChapterApi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ThreeDotMenu from "./ThreeDotMenu";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Loading from "./Loading";

const Chapters: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    data: chapters = [],
    error,
    refetch,
    isPending
  } = useGetChapter({ slug: slug ?? "" });
  const [openAccordions, setOpenAccordions] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    refetch;
  }, [chapters, refetch]);

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
    <div className="flex flex-col w-4/5 h-auto px-3 my-5 font-primary">
           <div className="flex items-center justify-between w-full pb-2 text-center border-b border-indigo-300/50">
        <h1 className="mx-5 text-3xl font-bold font-primary">Chapters</h1>
        <SwitchButton />
      </div>
      <div className="flex flex-col items-center justify-start mx-auto text-center ">
        {chapters.length > 0 ? (
          <>
            {chapters.map((chapter: any) => (
              <div
                key={chapter?.id}
                className="w-[1000px] flex flex-col text-black dark:text-white max-h-[600px]"
              >
                <Accordion type="multiple" className="overflow-y-auto ">
                  <AccordionItem value={chapter?.id}>
                    <AccordionTrigger
                      className="border border-gray-200"
                      onClick={() => toggleAccordion(chapter?.id)}
                    >
                      <div className="flex flex-col items-start w-full gap-1">
                        {openAccordions[chapter?.id] ? (
                          <div className="flex items-center justify-between w-full">
                            <p className="px-5 text-lg text-default">
                              {chapter?.chapterNum} : {chapter?.title}
                            </p>
                            <ThreeDotMenu id={chapter.id} />
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between w-full">
                              <p className="px-5 text-default">
                                {chapter?.chapterNum} : {chapter?.title}
                              </p>
                              <ThreeDotMenu id={chapter.id} />
                            </div>
                            <div className="flex">
                              <p
                                className="px-5 text-sm"
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(
                                    chapter?.content.substring(0, 160)
                                  ),
                                }}
                              ></p>
                              <p>......</p>
                            </div>
                          </>
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
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center my-[100px]">
            <iframe
              src="https://lottie.host/embed/8866455b-434f-412d-863b-334f6c5c5724/EzyvqFxRUM.json"
              className="w-32 h-32"
              title="Animation"
            ></iframe>
            <h1 className="mt-3 text-2xl font-normal">Craft a Chapter</h1>
            <p className="text-gray-400">
              Could you please draft a comprehensive chapter for the book?
            </p>
          </div>
        )}
        <div>{slug && <ChapterCreationModal slug={slug} />}</div>
      </div>
      <Outlet />
    </div>
  );
};

export default Chapters;
