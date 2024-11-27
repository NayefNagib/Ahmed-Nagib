import { fileDetails } from "../app/(tabs)/Type";
import { ocrspaceAPIKey } from "./API";

export const extractText = (file: fileDetails ) =>
  new Promise(async (resolve, reject) => {
    try {
      const formData: any = new FormData();
      formData.append("apikey", ocrspaceAPIKey);
      formData.append("file", {
        uri: file.uri,
        type: file.FileType,
        name: file.FileName,
      });

      const response = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();  
      resolve(result.ParsedResults[0].ParsedText);
    } catch (error) {
      reject("Error extracting text:" + error);
    }
  });
 
 