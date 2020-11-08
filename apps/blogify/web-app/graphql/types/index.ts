import { DocumentNode } from 'graphql';
import baseType from './_base';
import postType from './post';

const typeDefs: DocumentNode[] = [baseType, postType];

export default typeDefs;
