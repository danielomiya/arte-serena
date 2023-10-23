import sys

import click

import arteserena as arteserena_package


@click.group(
    context_settings={
        "max_content_width": 120,
    },
)
@click.option(
    "--debug/--no-debug",
    type=bool,
    is_flag=True,
    default=False,
    help="Enable debug logging.",
)
@click.version_option(
    version=arteserena_package.__version__,
    prog_name=arteserena_package.__package_name__,
)
@click.pass_context
def arteserena(ctx: click.Context, debug: bool) -> None:
    ctx.ensure_object(dict)
    ctx.obj["debug"] = debug


@arteserena.command()
def version() -> None:
    click.echo(f"ArteSerena CLI version: {arteserena_package.__version__}")
    click.echo(f"Python version: {sys.version}")


@arteserena.command()
@click.pass_context
def serve(ctx: click.Context) -> None:
    from arteserena.app import app

    app.run(debug=ctx.obj["debug"])


def main(**kwargs) -> None:
    # This wrapper prevents click from suppressing errors.
    try:
        sys.exit(arteserena(standalone_mode=False, **kwargs))
    except click.Abort:
        # Click already automatically prints an abort message, so we can just exit.
        sys.exit(1)
    except click.ClickException as error:
        error.show()
        sys.exit(1)
    except Exception as exc:
        # logger.debug("Error: %s", exc, exc_info=exc)
        click.secho(f"{exc}", fg="red")
        sys.exit(1)
