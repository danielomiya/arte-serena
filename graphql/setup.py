from typing import Any

import setuptools

package_metadata: dict[str, Any] = {}
with open("./src/arteserena/__init__.py") as fp:
    exec(fp.read(), package_metadata)  # nosec


base_requirements: set[str] = {
    "ariadne>=0.20.1,<0.21",
    "bcrypt>=4.0.1,<4.1",
    "click>=8.1.7,<8.2",
    "Flask>=3.0.0,<3.1",
    "Flask-Cors>=4.0.0,<4.1",
    "Flask-Session>=0.5.0,<0.6",
    "Flask-SQLAlchemy>=3.1.1,<3.2",
    "SQLAlchemy>=2.0.22,<2.1",
}

dev_requirements: set[str] = {
    *base_requirements,
    "bandit",
    "black",
    "flake8",
    "isort",
}

entry_points: dict[str, list[str]] = {
    "console_scripts": ["arteserena = arteserena.entrypoint:main"]
}

setuptools.setup(
    name=package_metadata["__package_name__"],
    version=package_metadata["__version__"],
    description="ArteSerena GraphQL Server",
    classifiers=[
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.11",
        "Topic :: Software Development",
    ],
    zip_safe=False,
    python_requires=">=3.11",
    package_dir={"": "src"},
    packages=setuptools.find_namespace_packages(where="./src"),
    package_data={
        "arteserena": ["schema.graphql"],
    },
    entry_points=entry_points,
    install_requires=list(base_requirements),
    extras_require={
        "base": list(base_requirements),
        "dev": list(dev_requirements),
    },
)
