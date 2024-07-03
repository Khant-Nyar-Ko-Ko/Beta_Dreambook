import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Faq = () => {
  const [openAccordions, setOpenAccordions] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleAccordion = (key: number) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const data = [
    {
      id: 1,
      question: "What is Dream Book?",
      answer:
        "Dream Book follows a freemium model, allowing users to access a selection of free courses upon account creation. For premium courses and exclusive content, pricing varies depending on the course and instructor. Users can purchase courses individually or opt for subscription plans for unlimited access to premium content.",
    },
    {
      id: 2,
      question: " How much does it cost to access books on Dream Book?",
      answer:
        "Dream Book follows a freemium model, allowing users to access a selection of free courses upon account creation. For premium courses and exclusive content, pricing varies depending on the course and instructor. Users can purchase courses individually or opt for subscription plans for unlimited access to premium content.",
    },
    {
      id: 3,
      question: " How do I get started with Dream Book?",
      answer:
        "Dream Book follows a freemium model, allowing users to access a selection of free courses upon account creation. For premium courses and exclusive content, pricing varies depending on the course and instructor. Users can purchase courses individually or opt for subscription plans for unlimited access to premium content.",
    },
  ];

  return (
    <div className="mx-10 md:mx-[130px] text-black dark:text-white">
      <Accordion type="multiple">
        {data?.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id.toString()}
            className="border border-gray-700"
          >
            <AccordionTrigger
              className="flex"
              onClick={() => toggleAccordion(item.id)}
            >
              <div className="flex items-center gap-1 w-[1100px] px-3">
                <AiOutlineQuestionCircle />
                <p>{item.question}</p>
              </div>
              {openAccordions[item.id] ? (
                <ChevronUp className="w-4 h-4 transition-transform duration-200 shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform duration-200 shrink-0" />
              )}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
