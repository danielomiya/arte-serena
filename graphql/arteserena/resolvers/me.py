from ariadne import QueryType

from arteserena.services.user import get_authenticated_user_id, get_user_by_id

me_query = QueryType()


@me_query.field("me")
def get_me(*_):
    uid = get_authenticated_user_id()
    user = get_user_by_id(uid)

    return user.as_dict()


# @me_query.field("followers")
# def get_followers(ctx, *_) -> int:
#     user_id = ctx["id"]


# @me_query.field("following")
# def get_following(ctx, *_) -> int:
#     ...
