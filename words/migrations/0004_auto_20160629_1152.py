# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-29 09:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('words', '0003_auto_20160619_0759'),
    ]

    operations = [
        migrations.AlterField(
            model_name='word',
            name='comment',
            field=models.TextField(blank=True, null=True),
        ),
    ]