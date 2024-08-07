import { IoIosArrowRoundBack } from "react-icons/io";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const BackButton = ({ backPath }: { backPath: string }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(backPath);
  };
  return (
    <div
      className="flex items-center justify-start cursor-pointer text-default"
      onClick={handleBack}
    >
      <IoIosArrowRoundBack size="30" />
      <Button variant="ghost" className="text-default">
        Back
      </Button>
    </div>
  );
};

export default BackButton;
