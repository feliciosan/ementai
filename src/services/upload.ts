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

    const result = await uploadBytes(
      storageRef,
      resizedImage as File,
      metadata
    );
    return result.metadata.fullPath;
  },
  getFileUrls: async (paths: string[]): Promise<string[]> => {
    const imagesPromises = paths.map(async (path) => {
      // const parts = fileUrl.split("/");
      // const oIndex = parts.indexOf("o");
      // const imagePath = parts.slice(oIndex + 1).join("/");
      // const decodedImagePath = decodeURIComponent(imagePath);
      const imageRef = ref(storage, path);
      const downloadURL = await getDownloadURL(imageRef);

      return downloadURL;
    });

    return await Promise.all(imagesPromises);
  },
  getFileUrl: async (path: string): Promise<string> => {
    const imageRef = ref(storage, path);
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  },
};

export default UploadService;
