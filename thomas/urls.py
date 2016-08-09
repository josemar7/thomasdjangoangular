# .. Imports
from django.conf.urls import patterns, url, include
from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView, CurrentUserView, CheckView
from tests.views import TestWordsViewSet
from thomas.views import IndexView
from words.views import WordViewSet, AccountWordsViewSet, WordTypeViewSet, ParameterViewSet

router = routers.SimpleRouter()

router.register(r'accounts', AccountViewSet)
router.register(r'words', WordViewSet)
router.register(r'wordsType', WordTypeViewSet)
router.register(r'parameter', ParameterViewSet)
router.register(r'tests', TestWordsViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'words', AccountWordsViewSet)

urlpatterns = patterns(
     '',
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/check/$', CheckView.as_view(), name='check'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^api/v1/auth/current/$', CurrentUserView.as_view(), name='current'),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url('^.*$', IndexView.as_view(), name='index'),

)

