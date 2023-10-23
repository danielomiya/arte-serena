from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="ARTESERENA_")

    secret_key: str
    assets_bucket: str
    sqlalchemy_database_uri: str = "sqlite:///arteserena.db"


settings = Settings()
