import { FC } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface ProfilePhotoProps {
  src?: string; // URL of the profile photo
  alt?: string; // Alt text for the photo
  size?: "small" | "medium" | "large"; // Size of the profile photo
  onClick?: () => void; // Optional click handler
}

const ProfilePhoto: FC<ProfilePhotoProps> = ({
  src,
  alt = "Profile photo",
  size = "medium",
  onClick,
}) => {
  return (
    <div
      className={`${styles.profilePhoto} ${styles[size]}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className={styles.image}
        />
      ) : (
        <div className={styles.placeholder}>
          <span>{alt.charAt(0).toUpperCase()}</span>
        </div>
      )}
    </div>
  );
};

export default ProfilePhoto;
