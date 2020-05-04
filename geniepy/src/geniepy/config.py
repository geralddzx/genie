"""
GeniePy Configuration Module.

This module is intended to provide functions that interprets content from the
package configuration file and generate the corresponding python objects.
"""
from shutil import copyfile
import yaml
from pathlib import Path
from geniepy.errors import ConfigError

CONFIG_DIR = Path("~/.geniepy.d/").expanduser().resolve()
CONFIG_DIR.mkdir(parents=True, exist_ok=True)
TMP_DIR = CONFIG_DIR.joinpath("tmp").resolve()
TMP_DIR.mkdir(parents=True, exist_ok=True)

CONFIG_NAME = "config.yaml"
CONFIG_FILE = CONFIG_DIR.joinpath(CONFIG_NAME).resolve()
DEFAULT_CONFIG = Path(__file__).parent.joinpath(CONFIG_NAME).resolve()


# Check for config.yaml in geniepy dir. Otherwise, create default
if not CONFIG_FILE.exists():
    copyfile(DEFAULT_CONFIG, CONFIG_FILE)
    print(
        f"""Created default configuration. Please configure geniepy and
add your Google Big Query credentials. {str(CONFIG_FILE)}"""
    )


def read_yaml() -> dict:
    """Read yaml configuration file and return dict."""
    with open(CONFIG_FILE) as config_file:
        return yaml.load(config_file, Loader=yaml.FullLoader)


def get_projname() -> str:
    """Retrieve gbq project name from config file."""
    configdict = read_yaml()
    return configdict["gbq"]["proj"]


def get_dataset() -> str:
    """Retrive gbq dataset from config file."""
    configdict = read_yaml()
    return configdict["gbq"]["dataset"]


def get_chunksize() -> int:
    """Retrieve standard genie generators chunk size."""
    configdict = read_yaml()
    return configdict["chunksize"]


def get_credentials() -> str:
    """Get credentials file path from config."""
    configdict = read_yaml()
    credentials_file = Path(configdict["gbq"]["credentials"]).expanduser()
    credentials_path = Path.cwd().joinpath(credentials_file).resolve()
    if not credentials_path.exists():
        # TODO log error properly
        print(f"Invalid configuration file: {credentials_path}")
        raise ConfigError("Credentials path not found")
    return credentials_path
