import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { Input } from "./ui/input";
import Toolbar from "./Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import { useGetChapter } from "@/hooks/useChapterApi";
import DeleteChapter from "./bookdetails/DeleteChapter";

const ThreeDotMenu = ({ id }: { id: number }) => {
  console.log(id);

  const { slug } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    data,
  } = useGetChapter({ slug: slug ?? "" });

  console.log(data);
  

  const toggleModal = () => {
    console.log("isOpen before toggle:", isOpen);
    setIsOpen(!isOpen);
    console.log("isOpen after toggle:", !isOpen);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleSubmit = async () => {
    const data = {
      title,
      content,
      slug,
      priority: 1,
      status: true,
    };
    console.log("Submitting data:", data);
    // updateBook(data);
  };
  return (
    <div className="relative ">
      <Button
        className="z-10 bg-white dark:bg-darkMode1 hover:bg-white hover:text-default"
        onClick={toggleDropdown}
      >
        <BsThreeDotsVertical />
      </Button>
      {dropdownOpen && (
        <div
          className="absolute top-0 z-10 w-48 border rounded-md shadow-md right-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div
            className="py-1 bg-white divide-y divide-gray-100 dark:bg-darkMode1 font-primary"
            role="none"
          >
            <Button
              onClick={toggleModal}
              className="block w-full px-4 py-2 text-sm rounded-none text-default hover:text-black hover:dark:text-white hover:bg-gray-100 hover:dark:bg-darkMode2"
              role="menuitem"
            >
              Edit
            </Button>
            <DeleteChapter id={id}/>
          </div>
        </div>
      )}
      <Modal
        open={isOpen}
        onClose={toggleModal}
        aria-labelledby="create-new-chapter"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              id="create-new-chapter"
              className="font-semibold font-primary"
              variant="h6"
              component="h2"
            >
              Edit The Chapter
            </Typography>
            <IconButton onClick={toggleModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box component="form" sx={{ mt: 2 }}>
            <div className="my-3 w-[350px]">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                variant="default"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="my-3 w-[350px]">
              <label htmlFor="content">Content</label>
              <Toolbar
                value={content}
                onChange={(value) => setContent(value)}
                isDisabled={false}
              />
            </div>
          </Box>
          <Box display="flex" justifyContent="right" mt={3}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ minWidth: "100px" }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ThreeDotMenu;
