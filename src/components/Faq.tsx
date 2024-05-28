import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";

const Faq = () => {
  return (
    <div className=" mx-10 md:mx-[130px] ">
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Dream Book?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern. Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What do in  Dream Book?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern. Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is Toe Tet?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern. Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default Faq