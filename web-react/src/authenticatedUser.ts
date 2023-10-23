import Cookies from "js-cookie";
import { Global } from "./conf";
import { useGetMeQuery } from "./graphql/auth.generated";

export function useGetAuthenticatedUser(skip?: boolean) {
  const userUrn = Cookies.get(Global.CLIENT_AUTH_COOKIE);
  const { data, error } = useGetMeQuery({
    skip: skip || !userUrn,
    fetchPolicy: "cache-and-network",
  });
  if (error) {
    console.error(
      `Could not fetch logged in user from cache. + ${error.message}`
    );
  }
  return data?.me;
}
