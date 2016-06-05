from rest_framework import serializers

from authentication.serializers import AccountSerializer
from words.models import Word


class WordSerializer(serializers.ModelSerializer):
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Word

        fields = ('id', 'name', 'translation', 'comment', 'favorite', 'wordType', 'author', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(WordSerializer, self).get_validation_exclusions()

        return exclusions + ['author']
