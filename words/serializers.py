from rest_framework import serializers

from authentication.serializers import AccountSerializer
from words.models import Word, WordType, Parameter


class WordSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Word

        fields = ('id', 'name', 'translation', 'comment', 'favorite', 'wordType', 'author', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')
        validators = []  # Remove a default "unique together" constraint.

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(WordSerializer, self).get_validation_exclusions()

        return exclusions + ['author']


class WordTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = WordType

        fields = ('id', 'description', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(WordTypeSerializer, self).get_validation_exclusions()

        return exclusions

class ParameterSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Parameter

        fields = ('id', 'name', 'value', 'author', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(ParameterSerializer, self).get_validation_exclusions()

        return exclusions
