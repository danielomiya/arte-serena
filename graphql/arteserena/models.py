import typing as t
from datetime import datetime

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from arteserena.api import db


class BaseModel(db.Model):
    __abstract__ = True

    def as_dict(self) -> dict[str, t.Any]:
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class User(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255))
    password_hash: Mapped[str] = mapped_column(String(60))
    bio: Mapped[str | None] = mapped_column(String(511))

    posts: Mapped[list["Post"]] = relationship(back_populates="author")
    # likes: Mapped[list["Like"]] = relationship(back_populates="user")
    # saved_items: Mapped[list["PostSaved"]] = relationship(back_populates="user")


class UserFollow(BaseModel):
    follower_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"), primary_key=True
    )
    following_id: Mapped[int] = mapped_column(
        ForeignKey("user.id"), primary_key=True
    )


class Post(BaseModel):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(2047))
    posted_at: Mapped[datetime] = mapped_column(server_default=func.now())

    author_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    author: Mapped[User] = relationship(back_populates="posts")
    assets: Mapped[list["PostAsset"]] = relationship(back_populates="post")


class PostAsset(BaseModel):
    post_id: Mapped[int] = mapped_column(
        ForeignKey("post.id"), primary_key=True
    )
    index: Mapped[int] = mapped_column(autoincrement=False, primary_key=True)
    asset_url: Mapped[str] = mapped_column(String(255))
    post: Mapped[Post] = relationship(back_populates="assets")

    def as_dict(self):
        return self.asset_url


# class PostComment(BaseModel):
#     id: Mapped[int] = mapped_column(primary_key=True)
#     content: Mapped[str] = mapped_column(String(2047))


# class Like(BaseModel):
#     post_id: Mapped[int] = mapped_column(primary_key=True)
#     user_id: Mapped[int] = mapped_column(primary_key=True)

#     post: Mapped[Post] = relationship(back_populates="likes")
#     user: Mapped[User] = relationship(back_populates="likes")


# class PostSaved(BaseModel):
#     post_id: Mapped[int] = mapped_column(primary_key=True)
#     user_id: Mapped[int] = mapped_column(primary_key=True)

#     user: Mapped[User] = relationship(back_populates="saved_items")
