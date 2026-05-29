from django.urls import path

from .views import sale_list, create_sale


urlpatterns = [
    path('', sale_list),

    path('create/', create_sale),
]