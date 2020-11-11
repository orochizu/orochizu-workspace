import { gql } from '@apollo/client';
import { UploadedFile } from '@orochizu-workspace/types';

export interface UploadFile {
  uploadFile: UploadedFile;
}

export const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
      url
    }
  }
`;
