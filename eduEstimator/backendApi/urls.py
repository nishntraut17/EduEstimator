from django.urls import path
from backendApi.views import PredictCutoff, SaveDataView

urlpatterns = [
    path("predict/", PredictCutoff.as_view(), name="predict_cutoff"),
    path("save-data/", SaveDataView.as_view(), name="save_data"),
]
