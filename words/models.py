from django.db import models
from six import with_metaclass

from authentication.models import Account

class UpperCharField(with_metaclass(models.SubfieldBase, models.CharField)):
    def __init__(self, *args, **kwargs):
        self.is_uppercase = kwargs.pop('uppercase', False)
        super(UpperCharField, self).__init__(*args, **kwargs)

    def get_prep_value(self, value):
        value = super(UpperCharField, self).get_prep_value(value)
        if self.is_uppercase:
            return value.upper()

        return value

class WordType(models.Model):
    description = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.content)

class Word(models.Model):
    name = UpperCharField(null=False, max_length=100, uppercase=True)
    translation = UpperCharField(null=False, max_length=200, uppercase=True)
    comment = models.TextField(null=True, blank=True)
    favorite = models.BooleanField(default=True)
    wordType = models.ForeignKey(WordType)
    author = models.ForeignKey(Account)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.content)

    class Meta:
        unique_together = ('name', 'author')


class Parameter(models.Model):
    name = models.TextField()
    value = models.TextField()
    author = models.ForeignKey(Account)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{0}'.format(self.content)
