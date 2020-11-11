import { DocumentNode } from 'graphql';
import baseType from './_base';
import postType from './post';
import uploadType from './upload';

const typeDefs: DocumentNode[] = [baseType, postType, uploadType];

export default typeDefs;
