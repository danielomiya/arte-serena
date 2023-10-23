/* eslint-disable */
import * as Types from "../types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {} as const;
export type UploadImageMutationVariables = Types.Exact<{
  input: Types.UploadImageInput;
}>;

export type UploadImageMutation = {
  __typename?: "Mutation";
  uploadImage: {
    __typename?: "UploadImageResponse";
    uploadUrl?: string | null;
    error?: string | null;
  };
};

export const UploadImageDocument = gql`
  mutation uploadImage($input: UploadImageInput!) {
    uploadImage(input: $input) {
      uploadUrl
      error
    }
  }
`;
export type UploadImageMutationFn = Apollo.MutationFunction<
  UploadImageMutation,
  UploadImageMutationVariables
>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadImageMutation,
    UploadImageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(
    UploadImageDocument,
    options,
  );
}
export type UploadImageMutationHookResult = ReturnType<
  typeof useUploadImageMutation
>;
export type UploadImageMutationResult =
  Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<
  UploadImageMutation,
  UploadImageMutationVariables
>;
