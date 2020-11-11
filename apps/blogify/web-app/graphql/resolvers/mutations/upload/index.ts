import { IResolvers } from 'graphql-tools';
import uploadFile from './upload-file';

const uploadMutation: IResolvers = {
  Mutation: {
    uploadFile,
  },
};

export default uploadMutation;
