export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CreatePostInput = {
  assets: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type Feed = {
  __typename?: "Feed";
  pageInfo: PageInfo;
  posts: Array<Post>;
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  uploadImage: UploadImageResponse;
};

export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type MutationUploadImageArgs = {
  input: UploadImageInput;
};

export type PageInfo = {
  __typename?: "PageInfo";
  limit: Scalars["Int"]["output"];
  offset: Scalars["Int"]["output"];
};

export type Post = {
  __typename?: "Post";
  assets: Array<Scalars["String"]["output"]>;
  author: User;
  id: Scalars["ID"]["output"];
  title: Scalars["String"]["output"];
};

export type Query = {
  __typename?: "Query";
  getUserFeed: Feed;
  /** Fetch details associated with the authenticated user */
  me: User;
};

export type QueryGetUserFeedArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  offset?: InputMaybe<Scalars["Int"]["input"]>;
};

export type UploadImageInput = {
  fileName: Scalars["String"]["input"];
  fileType: Scalars["String"]["input"];
  sizeInBytes: Scalars["Int"]["input"];
};

export type UploadImageResponse = {
  __typename?: "UploadImageResponse";
  error?: Maybe<Scalars["String"]["output"]>;
  uploadUrl?: Maybe<Scalars["String"]["output"]>;
};

export type User = {
  __typename?: "User";
  bio?: Maybe<Scalars["String"]["output"]>;
  followersCount: Scalars["Int"]["output"];
  followingCount: Scalars["Int"]["output"];
  id: Scalars["ID"]["output"];
  imageUrl?: Maybe<Scalars["String"]["output"]>;
  isFollowing?: Maybe<Scalars["Boolean"]["output"]>;
  name: Scalars["String"]["output"];
};
