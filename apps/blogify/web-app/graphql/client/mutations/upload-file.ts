import { gql } from '@apollo/client';
import { UploadedFile } from '@orochizu-workspace/types';

export interface UploadFile {
  uploadFile: UploadedFile;
}

export interface UploadFileVariables {
  file: File;
}

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
