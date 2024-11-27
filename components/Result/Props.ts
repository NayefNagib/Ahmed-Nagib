import { fileDetails } from "../../app/(tabs)/Type";

export interface Resultprops {
  Answer?: string;
  Question?: string;
  fileDetails?: fileDetails;
  HandleReset: Function;

  LoadAnswer: boolean;
  FileError: boolean;
}

