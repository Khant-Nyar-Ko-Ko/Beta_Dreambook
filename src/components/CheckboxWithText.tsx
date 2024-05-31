import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxWithText() {
  const LibCategoryData = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Digital Marketing",
    },
    {
      id: 3,
      title: "Personal Development",
    },
    {
      id: 4,
      title: "Technology",
    },
    {
      id: 5,
      title: "Time Management",
    },
    {
      id: 6,
      title: "Health",
    },
    {
      id: 7,
      title: "Content Marketing",
    },
    {
      id: 8,
      title: "Self-Management",
    },
    {
      id: 9,
      title: "Success",
    },
    {
      id: 10,
      title: "Productivity",
    },
    {
      id: 11,
      title: "Bussiness",
    },
  ];

  return (
    <div className="flex flex-col justify-center gap-5">
      {LibCategoryData.map(({ id, title }) => (
        <div className="flex space-x-2 items-top" key={id}>
          <Checkbox id={`checkbox-${id}`} />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={`checkbox-${id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {title}
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
