import { useState } from "react";
import profile from "../../assets/images/profile.jpeg";
import { useAuth } from "@/contexts/AuthContext";


const ChangeProfile = () => {
  const {user} = useAuth();
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
    <div className="flex flex-col items-center">
      {imageUrl ? (
        <img
          src={user?.profileImg == null ? imageUrl as string : user.profileImg}
          alt="Image Preview"
          className="object-cover w-20 h-20 rounded-full"
        />
      ) : (
        <img
         src={profile}
          className="object-cover w-20 h-20 text-sm bg-white rounded-full"
        />
      )}
      <label
        htmlFor="img"
        className="px-4 py-2 rounded-lg cursor-pointer text-slate-700 font-primary hover:text-default"
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
  )
}

export default ChangeProfile