import { storage } from 'firebase-admin';

import { v4 as uuid } from 'uuid';

import { withAuth } from '@orochizu-workspace/data-access/graphql/auth';
import { Upload, UploadedFile } from '@orochizu-workspace/types';
import mime from 'mime-types';
import { environment } from '@orochizu-workspace/environment';

interface Args {
  file: Promise<Upload>;
}

const uploadFile = async (_, args: Args): Promise<UploadedFile> => {
  const file = await args.file;

  const type = mime.lookup(file.filename) || '';
  const fileName = `${uuid()}.${mime.extensions[type][0]}`;

  file.createReadStream();

  const bucket = await storage().bucket(environment.firebase.bucket);
  const blob = bucket.file(fileName);

  const destination = blob.createWriteStream({
    resumable: true,
    contentType: type,
    predefinedAcl: 'publicRead',
  });

  return await new Promise<UploadedFile>((resolve) => {
    const stream = file.createReadStream().pipe(destination);

    stream.on('finish', async () => {
      await bucket.file(fileName).makePublic();

      resolve({
        ...file,
        url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
      });
    });
  });
};

export default withAuth(uploadFile);
