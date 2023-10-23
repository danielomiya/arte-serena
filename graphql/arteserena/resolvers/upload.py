import os
import re
import typing as t
from datetime import timedelta
from uuid import uuid4

from ariadne import MutationType
from google.cloud import storage

from arteserena.conf import settings
from arteserena.services.user import get_authenticated_user_id


class UploadImageInput(t.TypedDict):
    file_name: str
    file_type: str
    size_in_bytes: int


storage_client = storage.Client()
upload_mutation = MutationType()


@upload_mutation.field("uploadImage")
def upload_image(_, info, input: UploadImageInput) -> dict[str, t.Any]:
    accepted_type = r"^(image|video)\/.+"

    if not re.match(accepted_type, input["file_type"]):
        return {"error": "filetype not accepted"}

    _, ext = os.path.splitext(input["file_name"])
    bucket = storage_client.bucket(settings.assets_bucket)

    blob = bucket.blob(
        f"users/{get_authenticated_user_id() or 'unknown'}/static/{uuid4()}{ext}"
    )

    signed_url = blob.generate_signed_url(
        version="v4",
        expiration=timedelta(hours=1),
        method="PUT",
        content_type=input["file_type"],
    )

    return {
        "upload_url": signed_url,
    }
