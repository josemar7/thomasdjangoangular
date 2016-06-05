#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "thomas.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)

else:
    print('configuration for the Python Console')
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "thomas.settings")
    import django
    django.setup()


