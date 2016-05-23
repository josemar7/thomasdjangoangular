
from django.conf.urls import url, patterns, include
from rest_framework import routers

from authentication.views import AccountViewSet
from thomas.views import IndexView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)

urlpatterns = patterns(
     '',
    # ... URLs
    url(r'^api/v1/', include(router.urls)),

    url('^.*$', IndexView.as_view(), name='index'),
)