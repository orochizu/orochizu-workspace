import { IResolvers } from 'graphql-tools';
import baseQuery from './_base';
import postQueries from './post';

const queries: IResolvers[] = [baseQuery, postQueries];

export default queries;
