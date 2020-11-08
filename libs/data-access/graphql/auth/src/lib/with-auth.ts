import { AuthenticationError } from 'apollo-server-micro';
import { ResolverFn, ResolverParams } from '@orochizu-workspace/types';

function withAuth<TParent, TArgs, TResult>(
  resolver: ResolverFn<TResult, TArgs, TParent>
) {
  return (...params: ResolverParams<TArgs, TParent>) => {
    const [, , { state }] = params;

    if (!state.user) {
      throw new AuthenticationError('Unauthorized');
    }

    return resolver(...params);
  };
}

export default withAuth;
