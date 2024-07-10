import { AllowableFileTypeEnum } from "../file";


export const extensionContentTypeConverter = (extension: string): AllowableFileTypeEnum => {
    switch (extension) {
        case "pdf":
            return AllowableFileTypeEnum.PDF;
        case "png":
            return AllowableFileTypeEnum.PNG;
        case "jpeg":
            return AllowableFileTypeEnum.JPEG;
        case "jpg":
            return AllowableFileTypeEnum.JPEG;
        case "zip":
            return AllowableFileTypeEnum.ZIP;
        case "mp4":
            return AllowableFileTypeEnum.MP4;
        default:
            return AllowableFileTypeEnum.PICTURES;
    }
}