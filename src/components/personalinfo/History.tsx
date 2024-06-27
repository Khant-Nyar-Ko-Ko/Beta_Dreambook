import { Checkbox } from "@radix-ui/react-checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { RiFilter3Line } from "react-icons/ri";
import { Input } from "../ui/input";
import EmptyBookPage from "../EmptyBookPage";

const History = () => {
  return (
    <div className="flex flex-col w-4/5 h-full px-3 my-5">
      <div className="flex flex-col items-start justify-between w-full gap-2 md:flex-row md:items-center md:gap-5">
        <div className="flex items-center w-full gap-3 md:gap-5 md:w-auto">
          <div className="p-[7px] border rounded">
            <RiFilter3Line className="text-[16px] md:text-[24px]" />
          </div>
          <div className="px-1 py-2 border rounded md:px-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between gap-1 text-xs md:px-2 md:gap-5 md:text-sm">
                <p>Sort by default</p>
                <IoIosArrowDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Checkbox /> <p className="px-2">Sort by random</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox /> <p className="px-2">Sort by latest</p>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Checkbox /> <p className="px-2">Sort by A-Z</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="order-2 w-full mt-3 md:order-1 md:mt-0 md:w-auto">
          <div className="relative">
            <IoIosSearch
              className="absolute left-2 top-2 md:top-[10px] text-[16px] md:text-[24px]"
              color="gray"
            />
            <Input
              type="search"
              className="w-full pl-7 md:pl-12 md:w-auto"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
     <EmptyBookPage/>
    </div>
  )
}

export default History;