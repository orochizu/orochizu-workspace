import { IResolvers } from 'apollo-server-micro';

import mutations from './mutations';
import queries from './queries';

const resolvers: IResolvers[] = [...mutations, ...queries];

export default resolvers;
