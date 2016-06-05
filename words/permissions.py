from rest_framework import permissions


class IsAuthorOfWord(permissions.BasePermission):
    def has_object_permission(self, request, view, word):
        if request.user:
            return word.author == request.user
        return False
