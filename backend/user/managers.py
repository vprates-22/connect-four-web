from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

class C4UserManager(BaseUserManager):
    def create_user(self, username:str, email:str, password:str, **kwargs):
        if not email:
            raise ValueError(_("Missing Value: E-mail"))
        if not username:
            raise ValueError(_("Missing Value: Username"))
        
        email = self.normalize_email(email)
        user = self.model(email = email, username = username, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username:str, email:str, password:str, **kwargs):
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_active", True)
        kwargs.setdefault("is_superuser", True)

        if kwargs["is_staff"] is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if kwargs["is_superuser"] is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **kwargs)