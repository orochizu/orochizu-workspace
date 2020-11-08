import { GraphQLResolveInfo } from 'graphql';
import { ServerContext } from './server-context';

export type ResolverParams<TArgs = never, TParent = never> = [
  TParent,
  TArgs,
  ServerContext,
  GraphQLResolveInfo
];

export type ResolverFn<TResult, TArgs = never, TParent = never> = (
  parent: TParent,
  args: TArgs,
  context: ServerContext,
  info?: GraphQLResolveInfo
) => TResult | Promise<TResult>;
