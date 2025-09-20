import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "./../../redux/slice/userSlice";
import { authAction } from "../../redux/slice/authSlice";

function UpdateAvatar({ setToggleModalAvatar }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);

  // delete auth/user/logout
  function deleteSession() {
    dispatch(authAction.resetAuthState());
    dispatch(userAction.deleteUserState());
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.warn("Please select an image first!", {
        position: "top-center",
        theme: "colored",
      });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await axios({
        method: "PATCH",
        url: `${import.meta.env.VITE_HOST_URL}/users/avatar`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authState.user.token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Avatar updated successfully!", {
          position: "top-center",
          theme: "colored",
        });
        // Update state user on Redux
        dispatch(userAction.getUserThunk(authState.user.token));
        setToggleModalAvatar(false);
      }
    } catch (error) {
      console.log(error);
      // if error bacuse unauthorized, delete all data session (expired token)
      if (error.status == 401) {
        deleteSession();
      }

      toast.error(
        error.response?.data?.message ||
          "Failed to update avatar. Please try again.",
        {
          position: "top-center",
          theme: "colored",
        },
      );
      console.error("Error updating avatar:", error);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-white p-6 shadow-lg md:p-8">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
          Update Profile Picture
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Select a new avatar to upload
        </p>
        <form
          onSubmit={handleUpload}
          className="mt-6 flex flex-col items-center gap-4"
        >
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-gray-300">
            <img
              className="h-full w-full object-cover"
              src={
                preview ||
                (userState.user.profile_path &&
                  `${import.meta.env.VITE_HOST_URL}/img/profile/${userState.user.profile_path}`) ||
                "/profile_default.jpg"
              }
              alt="Avatar Preview"
            />
          </div>
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-center text-white transition-colors hover:bg-blue-700"
          >
            Choose Image
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="flex w-full justify-center gap-4">
            <button
              type="button"
              onClick={() => setToggleModalAvatar(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              disabled={!selectedFile}
            >
              Upload Avatar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateAvatar;
