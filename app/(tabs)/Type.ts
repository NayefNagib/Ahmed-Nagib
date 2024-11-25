export interface fileDetails{
    uri:string
    FileName:string,
    FileType:string,

}


interface metadataT {
  attachments: attachmentT[];
} 

interface attachmentT {
  id: string;
  size: number;
  name: string;
  mime_type: string;
  file_token_size: number;
}

interface FileResT {
  status: string;
  upload_url: string;
  file_id: string;
}
export interface historyDataT {
  FileName: string;
  FileType: string;
  Text: string;
  Answer: string;
  question: string;
  creationTime:Date
}