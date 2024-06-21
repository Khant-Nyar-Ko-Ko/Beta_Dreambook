
import PersonalInfoSidebar from "@/components/personalinfo/PersonalInfoSidebar"
import { Outlet } from "react-router-dom"

const PersonalInfoLayout = () => {
  return (
    <div className="flex text-black bg-white dark:bg-darkMode1 dark:text-white">
        <PersonalInfoSidebar/>
        <Outlet/>
    </div>
  )
}

export default PersonalInfoLayout