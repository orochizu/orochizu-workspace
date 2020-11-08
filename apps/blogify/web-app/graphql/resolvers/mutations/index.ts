import { IResolvers } from 'graphql-tools';
import baseMutation from './_base';
import postMutations from './post';

const mutations: IResolvers[] = [baseMutation, postMutations];

export default mutations;
