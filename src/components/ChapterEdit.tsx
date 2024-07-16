// import { useParams } from "react-router-dom";
import SwitchButton from "./SwitchButton";
// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
//   } from "@/components/ui/accordion";
// import { useState } from "react";
// import ThreeDotMenu from "./ThreeDotMenu";

const ChapterEdit = () => {
    // const {id} = useParams();
    
    // const [openAccordions, setOpenAccordions] = useState<{
    //     [key: string]: boolean;
    //   }>({});
    
    //   const toggleAccordion = (id: string) => {
    //     setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
    //   };
  return (
    <div className="flex flex-col w-4/5 h-auto px-3 my-5 font-primary">
      {" "}
      <div className="flex items-center justify-between w-full pb-6 text-center border-b border-indigo-300/50 ">
        <h1 className="mx-5 text-3xl font-bold ">Chapters</h1>
        <SwitchButton />
      </div>
      <div className="flex flex-col items-center justify-start mx-auto text-center ">
      {/* <div
                className="w-[1000px] flex flex-col text-black dark:text-white max-h-[600px]"
              >
                <Accordion type="multiple" className="overflow-y-auto ">
                  <AccordionItem value="value">
                    <AccordionTrigger
                      className="border border-gray-200"
                      onClick={() => toggleAccordion(id)}
                    >
                      <div className="flex flex-col items-start w-full gap-1">
                        {openAccordions[id] ? (
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
              </div> */}
      </div>
    </div>
  );
};

export default ChapterEdit;
