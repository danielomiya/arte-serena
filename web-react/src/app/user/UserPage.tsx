import { useParams, Navigate } from "react-router-dom";
import { PageRoutes } from "../../conf/Global";
import { useGetAuthenticatedUser } from "../../authenticatedUser";

export const UserPage = () => {
  const { userId } = useParams();

  if (!!userId) {
    const authenticatedUser = useGetAuthenticatedUser();
    return (
      <Navigate to={`${PageRoutes.USER}/${authenticatedUser?.id}`} replace />
    );
  }

  return (
    <div>
      User <>{userId}</>
    </div>
  );
};
