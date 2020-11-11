import { IResolvers } from 'graphql-tools';
import baseMutation from './_base';
import postMutations from './post';
import uploadMutation from './upload';

const mutations: IResolvers[] = [baseMutation, postMutations, uploadMutation];

export default mutations;
