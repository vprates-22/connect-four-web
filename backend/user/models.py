from django.db import models
from django.core import validators
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
import re

from user.managers import C4UserManager

class C4User(AbstractUser):
    username = models.CharField(_("username"), max_length=32, null=False, validators=[validators.RegexValidator(re.compile('^[\w.@+-]+$'))])
    email = models.EmailField(_("email adress"), max_length=128, unique=True, null=False)

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"

    REQUIRED_FIELDS = ["username"]

    objects = C4UserManager()

    def __str__(self) -> str:
        return self.username