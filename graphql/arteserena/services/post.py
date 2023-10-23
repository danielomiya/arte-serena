from arteserena.api import db
from arteserena.models import Post, PostAsset, User


def get_post_by_id(post_id: int) -> Post | None:
    post = (
        db.session.query(Post)
        .join(PostAsset)
        .join(User)
        .filter(Post.id == post_id)
        .first()
    )
    return post
