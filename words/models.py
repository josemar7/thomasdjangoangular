from django.db import models

from authentication.models import Account


class WordType(models.Model):
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.content)

class Word(models.Model):
    name = models.CharField(null=False, max_length=100)
    translation = models.CharField(null=False, max_length=200)
    comment = models.TextField(null=True)
    favorite = models.BooleanField(default=True)
    wordType = models.ForeignKey(WordType)
    author = models.ForeignKey(Account)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.content)
