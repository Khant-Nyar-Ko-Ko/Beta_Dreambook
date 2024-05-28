
import PersonalInfoSidebar from "@/components/personalinfo/PersonalInfoSidebar"
import { Outlet } from "react-router-dom"

const PersonalInfoLayout = () => {
  return (
    <div className="flex ">
        <PersonalInfoSidebar/>
        <Outlet/>
    </div>
  )
}

export default PersonalInfoLayout