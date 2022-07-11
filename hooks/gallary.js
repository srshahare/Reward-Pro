import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const GalleryController = () => {
  const [image, setImage] = useState(null);

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        // aspect: [2, 2],
        quality: 0.5,
      });
      if (!result.cancelled) {
        setImage(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetImage = async () => {
    setImage(null)
  }

  return { openGallery, image, resetImage, setImage };
};

export default GalleryController;
