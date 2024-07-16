/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import profile from "../assets/images/contact.jpeg";

interface ImagePreviewProps {
  profileImg: any;
  onProfileImgChange: (profileImg: any) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ profileImg, onProfileImgChange }) => {
  const [imageUrl, setImageUrl] = useState<any>(profileImg);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        onProfileImgChange(file);
        setImageUrl(file);
      }
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={imageUrl ? URL.createObjectURL(imageUrl) : profile}
        alt="Profile"
        className="object-cover w-20 h-20 rounded-full cursor-pointer"
        onClick={handleImageClick}
      />
      <label
        htmlFor="img"
        className="px-4 py-2 text-white duration-300 rounded-lg cursor-pointer font-primary hover:text-default"
      >
        Upload Photo
      </label>
      <input
        id="img"
        className="hidden"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImagePreview;
