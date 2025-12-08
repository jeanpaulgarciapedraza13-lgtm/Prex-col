from pathlib import Path
import os

# BASE_DIR → /Prex-col
BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = "cámbiame-antes-de-producción"

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    # Django apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Tus apps
    "apps.users",
    "apps.pedidos",
    "apps.tarifador",
    "apps.core",

    # DRF y cors
    "rest_framework",
    "corsheaders",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# 🔥 CORREGIDO: tu carpeta principal NO es config, es backend
ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# 🔥 CORREGIDO
WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# Base de datos SQLite temporal (puedes cambiarla luego)
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# Archivos estáticos
STATIC_URL = "/static/"
STATICFILES_DIRS = [BASE_DIR / "static"]

# Archivos multimedia
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
