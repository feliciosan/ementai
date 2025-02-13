import Resizer from "react-image-file-resizer";

export interface IResizeOptions {
  width: number;
  height: number;
}

export const resizeFile = (
  file: File,
  options?: IResizeOptions
): Promise<File> => {
  return new Promise((resolve, reject) => {
    try {
      Resizer.imageFileResizer(
        file,
        options?.width ?? 864,
        options?.height ?? 864,
        "WEBP",
        100,
        0,
        (uri) => resolve(uri as File),
        "file"
      );
    } catch (error) {
      reject(error);
    }
  });
};
