import { useState } from "react";
import dogAvatar from "../../assets/images/dog_avatar.png";

export const Image = ({ image, alt = "", className = "" }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  const src = error ? dogAvatar : image;

  return (
    <img className={className} src={src} alt={alt} onError={handleError} />
  );
};
