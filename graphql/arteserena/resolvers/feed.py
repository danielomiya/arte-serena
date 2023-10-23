import typing as t

from ariadne import MutationType, QueryType

from arteserena.api import db
from arteserena.models import Post, PostAsset, User
from arteserena.services.post import get_post_by_id
from arteserena.services.user import get_authenticated_user_id

post_mutation = MutationType()
post_query = QueryType()


class CreatePostInput(t.TypedDict):
    title: str
    asset_urls: list[str]


@post_mutation.field("createPost")
def create_post(_, info, input: CreatePostInput):
    uid = get_authenticated_user_id()
    post = Post(title=input["title"], author_id=uid)
    post.assets = [
        PostAsset(index=idx, asset_url=asset_url)
        for idx, asset_url in enumerate(input["assets"])
    ]

    db.session.add(post)
    db.session.commit()

    return get_post_by_id(post.id).as_dict()


@post_query.field("getUserFeed")
def get_user_feed(_, info, offset: int | None, limit: int | None):
    offset = offset or 0
    limit = limit or 25

    posts = (
        db.session.query(Post)
        .join(PostAsset)
        .join(User)
        .offset(offset)
        .limit(limit)
    )

    return {
        "page_info": {
            "offset": offset,
            "limit": limit,
        },
        "posts": [p.as_dict() for p in posts],
    }
