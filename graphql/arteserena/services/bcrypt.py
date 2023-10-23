from abc import ABCMeta, abstractmethod

import bcrypt


class PasswordService(metaclass=ABCMeta):
    @abstractmethod
    def hash_password(self, password: str, rounds: int = 10) -> str:
        ...

    @abstractmethod
    def compare_password(self, password: str, password_hash: str) -> bool:
        ...


class BcryptService(PasswordService):
    def __init__(self) -> None:
        super().__init__()

    def hash_password(self, password: str, rounds: int = 10) -> str:
        passwd = password.encode()
        hashed = bcrypt.hashpw(passwd, bcrypt.gensalt(rounds))
        return hashed.decode()

    def compare_password(self, password: str, password_hash: str) -> bool:
        passwd = password.encode()
        hashed = password_hash.encode()
        return bcrypt.checkpw(passwd, hashed)
