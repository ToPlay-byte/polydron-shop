from django.urls import path

from rest_framework.routers import format_suffix_patterns
from rest_framework_simplejwt.views import TokenRefreshView

from .views import AuthenticationAPIView,  GetCSRFToken, IsAccountExisctsAPIView, ProfileModelViewSet


app_name = 'account'

urlpatterns = [ 
    path('token', AuthenticationAPIView.as_view()),
    path('token/refresh', TokenRefreshView.as_view()),
    path('csrftoken', GetCSRFToken.as_view()),
    path('user/is-exists', IsAccountExisctsAPIView.as_view())
]


profile =  ProfileModelViewSet.as_view({
    'post': 'create',
    'put': 'update'
})


urlpatterns +=  format_suffix_patterns([
    path('profile', profile)
])

