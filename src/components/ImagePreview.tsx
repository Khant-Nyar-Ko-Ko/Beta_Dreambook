/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useState } from "react";
import profile from "../assets/images/contact.jpeg";

interface ImagePreviewProps {
  profileImg: any;
  onProfileImgChange: (profileImg: any) => void; 
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  profileImg,
  onProfileImgChange,
}) => {
  const [imageUrl, setImageUrl] = useState<any>(profileImg);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        onProfileImgChange(file);
        setImageUrl(file);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      {imageUrl ? (
        <>
          <img
            src={URL.createObjectURL(imageUrl)}
            alt="Image Preview"
            className="object-cover w-20 h-20 rounded-full"
          />
          <label
            htmlFor="img"
            className="px-4 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-white font-primary hover:text-default"
          >
            Upload Photo
          </label>
          <input
            id="img"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </>
      ) : (
        <>
          <img
            src={profile}
            alt="Profile"
            className="object-cover w-20 h-20 text-sm bg-white rounded-full"
          />
          <label
            htmlFor="img"
            className="px-4 py-2 rounded-lg cursor-pointer text-slate-700 dark:text-white font-primary hover:text-default"
          >
            Upload Photo
          </label>
          <input
            id="img"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </>
      )}
    </div>
  );
};

export default ImagePreview;
