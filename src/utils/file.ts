import axios, { type AxiosProgressEvent } from "axios";
import { z } from "zod";

export enum FolderEnum {
  PROFILE = "profile-picture",
  DOCUMENT = "document",
  PAYMENT_PROOF = "payment-proof",
}

export const zodFolderEnum = z.union([
  z.literal(FolderEnum.PROFILE),
  z.literal(FolderEnum.DOCUMENT),
  z.literal(FolderEnum.PAYMENT_PROOF),
])

export enum AllowableFileTypeEnum {
  PDF = "application/pdf",
  PNG = "image/png",
  JPEG = "image/jpeg",
  ZIP = "application/zip",
  PICTURES = "image/*"
}

export const zodAllowableFileTypeEnum = z.union([
  z.literal(AllowableFileTypeEnum.PDF),
  z.literal(AllowableFileTypeEnum.PNG),
  z.literal(AllowableFileTypeEnum.JPEG),
  z.literal(AllowableFileTypeEnum.ZIP),
  z.literal(AllowableFileTypeEnum.PICTURES)
])

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

  console.log(response)


  return response.data;
};
