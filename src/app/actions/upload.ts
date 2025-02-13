import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { randomBytes } from "crypto";
import { storage } from "@/config/firebase";
import { IResizeOptions, resizeFile } from "@/utils/upload";

const UploadService = {
  async uploadFile(
    file: File,
    bucketPath: string,
    resizeOptions?: IResizeOptions
  ): Promise<string> {
    const resizedImage = await resizeFile(file, resizeOptions);

    if (!resizedImage) return "";

    const uniqueHash = randomBytes(16).toString("hex");
    const storageRef = ref(storage, `${bucketPath}/${uniqueHash}-${file.name}`);
    const metadata = {
      contentType: file.type,
    };

    await uploadBytes(storageRef, resizedImage as File, metadata);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  },
  getFileUrls: async (paths: string[]): Promise<string[]> => {
    const imagesPromises = paths.map(async (fileUrl) => {
      const parts = fileUrl.split("/");
      const oIndex = parts.indexOf("o");
      const imagePath = parts.slice(oIndex + 1).join("/");
      const decodedImagePath = decodeURIComponent(imagePath);
      const imageRef = ref(storage, decodedImagePath.split("?alt")[0]);
      const downloadURL = await getDownloadURL(imageRef);

      return downloadURL;
    });

    return await Promise.all(imagesPromises);
  },
};

export default UploadService;
