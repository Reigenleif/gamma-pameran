import axios, { type AxiosProgressEvent } from "axios";

export enum FolderEnum {
  PROFILE = "profile-picture",
  DOCUMENT = "document",
  PAYMENT_PROOF = "payment-proof",
}

export enum AllowableFileTypeEnum {
  PDF = "application/pdf",
  PNG = "image/png",
  JPEG = "image/jpeg",
  ZIP = "application/zip",
  PICTURES = "image/*",
  MP4 = "video/mp4"
}


export const uploadFile = async (
  url: string,
  file: File,
  type: AllowableFileTypeEnum,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const axiosInstance = axios.create();

  await axiosInstance.put<null>(url, file, {
    headers: {
      "Content-Type": type
    },
    onUploadProgress
  });
};

export const downloadFile = async (
  url: string,
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const axiosInstance = axios.create();

  const response = await axiosInstance.get<Blob>(url, {
    responseType: "blob",
    onDownloadProgress
  });

  return response.data;
};
