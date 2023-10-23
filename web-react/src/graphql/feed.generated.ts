/* eslint-disable */
import * as Types from "../types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type GetUserFeedQueryVariables = Types.Exact<{
  offset?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  limit?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
}>;

export type GetUserFeedQuery = {
  __typename?: "Query";
  getUserFeed: {
    __typename?: "Feed";
    pageInfo: { __typename?: "PageInfo"; offset: number; limit: number };
    posts: Array<{
      __typename?: "Post";
      id: string;
      title: string;
      assets: Array<string>;
      author: {
        __typename?: "User";
        id: string;
        name: string;
        followingCount: number;
        followersCount: number;
      };
    }>;
  };
};

export const GetUserFeedDocument = gql`
  query getUserFeed($offset: Int, $limit: Int) {
    getUserFeed(offset: $offset, limit: $limit) {
      pageInfo {
        offset
        limit
      }
      posts {
        id
        title
        author {
          id
          name
          followingCount
          followersCount
        }
        assets
      }
    }
  }
`;

/**
 * __useGetUserFeedQuery__
 *
 * To run a query within a React component, call `useGetUserFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFeedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetUserFeedQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserFeedQuery,
    GetUserFeedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUserFeedQuery, GetUserFeedQueryVariables>(
    GetUserFeedDocument,
    options,
  );
}
export function useGetUserFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserFeedQuery,
    GetUserFeedQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUserFeedQuery, GetUserFeedQueryVariables>(
    GetUserFeedDocument,
    options,
  );
}
export type GetUserFeedQueryHookResult = ReturnType<typeof useGetUserFeedQuery>;
export type GetUserFeedLazyQueryHookResult = ReturnType<
  typeof useGetUserFeedLazyQuery
>;
export type GetUserFeedQueryResult = Apollo.QueryResult<
  GetUserFeedQuery,
  GetUserFeedQueryVariables
>;
