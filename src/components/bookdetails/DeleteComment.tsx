import { Box, Modal, Typography } from "@mui/material";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useDeleteComment } from "@/hooks/useCommentApi";
import Loading from "../Loading";

const DeleteComment = ({ id }: { id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

//   const { mutate: deleteComment } = useDeleteComment();
const deleteCommentMutation = useDeleteComment();

useEffect(() => {
  console.log(deleteCommentMutation.status);
  console.log(deleteCommentMutation.error);
  
  
},[deleteCommentMutation])

const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    deleteCommentMutation.mutate(id)   
    // console.log(deleteCommentMutation.status);
  };

  useEffect(() => {
    if(deleteCommentMutation.isSuccess) {
    //   toggleModal();
    } 
  },[deleteCommentMutation.isSuccess])

  return (
    <div>
      {" "}
      <Button
        variant="white"
        onClick={toggleModal}
        className="block w-full px-4 py-2 text-sm text-red-500 rounded-none hover:text-black hover:bg-gray-100"
        role="menuitem"
      >
        Delete
      </Button>
      <Modal open={isModalOpen}>
        <Box
          className="p-8 text-sm bg-white rounded-md shadow-md dark:bg-darkMode2"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
          }}
        >
          <Typography
            variant="h6"
            className="mb-8 text-center text-black font-primary dark:text-white"
          >
            Are you sure you want to delete this book?
          </Typography>
          <div className="flex justify-center gap-5 mt-8">
            <Button
              variant="destructive"
              className="text-white bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
                {deleteCommentMutation.isPending ? <Loading/> : "Delete"}
            </Button>
            <Button
              variant="outline"
              className="text-gray-600 border-gray-600 hover:bg-gray-600 hover:text-white"
              onClick={toggleModal}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteComment;
