import { useState } from "react";

export const UsePhoto = () => {
  const [file, setFile] = useState();
  const [src, setSrc] = useState();
  const [loading, setLoading] = useState();

  //handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    if (reader && file) reader.readAsDataURL(file);
    setLoading(true);
    reader.onloadend = () => {
      setSrc(reader.result);
      setLoading(false);
    };
  };

  return {
    file,
    src,
    loading,
    onChange: handleImageChange,
  };
};
