import { Button } from "../ui/button"
import SortDropdown from "../tools/SortDropdown"
import SearchInput from "../additional/SearchInput"
import { useLibraryContext } from "@/contexts/LibraryContext"

const LibraryHeader = () => {
    const {
        searchInput,
        setSearchInput,
        sort,
        setSort,
        toggleDrawer
      } = useLibraryContext();
    

      const handleSearchInputChange = (value: string) => {
        setSearchInput(value);
      };

  return (
    <div className="flex items-center justify-between gap-3 mx-6 my-5 md:gap-0">
    <div className="z-10 flex items-center gap-5">
      <Button className="block w-32 h-8 text-xs md:hidden" onClick={toggleDrawer}>
        Select Category
      </Button>
      <SortDropdown sort={sort} setSort={setSort} />
    </div>
    <div>
      <SearchInput
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Search"
        ariaLabel="Search books"
      />
    </div>
  </div>
  )
}

export default LibraryHeader