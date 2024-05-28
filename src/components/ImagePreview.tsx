import React, { useState } from "react";
import contact from "../assets/images/defaultcontact.jpeg";

const ImagePreview = () => {
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex gap-3">
      {imageUrl ? (
        <img
          src={imageUrl as string}
          alt="Image Preview"
          className="object-cover w-20 h-20 rounded-full"
        />
      ) : (
        <img
         src={contact}
          className="object-cover w-20 h-20 text-sm bg-white rounded-full"
        />
      )}
      <label
        htmlFor="img"
        className="px-4 py-2 mt-5 text-white rounded-lg cursor-pointer font-primary hover:text-default"
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
    </div>
  );
};

export default ImagePreview;
