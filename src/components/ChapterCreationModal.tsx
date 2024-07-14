import { useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";
import Toolbar from "./Toolbar";
import { Input } from "./ui/input";
import { useCreateChapter } from "@/hooks/useChapterApi";
import { Loader2 } from "lucide-react";

const ChapterCreationModal = ({ slug }: { slug: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { mutate: createBook , isPending } = useCreateChapter();

  const toggleModal = () => {
    console.log("isOpen before toggle:", isOpen);
    setIsOpen(!isOpen);
    console.log("isOpen after toggle:", !isOpen);
  };

  const handleSubmit = async () => {
    const data = {
      title,
      content,
      slug,
      priority: 1,
      status: true,
    };
    console.log('Submitting data:', data);
    createBook(data, {
      onSuccess: () => {
        console.log('Chapter created successfully');
        setIsOpen(false);
        window.location.reload();
      },
      onError: (error) => {
        console.error('Error creating chapter:', error);
      },
    });
  };

  return (
    <div className="my-5 ">
      <Button
        variant="contained"
        className="flex gap-2 mx-auto"
        onClick={toggleModal}
        startIcon={<FaPlus />}
      >
        Create New Chapter
      </Button>

      <Modal
        open={isOpen}
        onClose={toggleModal}
        aria-labelledby="create-new-chapter"
        aria-describedby="modal-description"
      >
        <Box
         className="bg-white dark:bg-darkMode1"
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
              className="font-semibold text-black font-primary dark:text-white"
              variant="h6"
              component="h2"
            >
              Creating A Chapter
            </Typography>
            <IconButton onClick={toggleModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box component="form" sx={{ mt: 2 }}>
            <div className="my-3 w-[350px]">
              <label htmlFor="title" className="text-black dark:text-white">Title</label>
              <Input id="title" className=" w-[200px]" variant="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="my-3 w-[350px]">
              <label htmlFor="content" className="text-black dark:text-white">Content</label>
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
               <Loader2
                className={
                  isPending ? "block animate-spin" : "hidden"
                }
              />
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ChapterCreationModal;
