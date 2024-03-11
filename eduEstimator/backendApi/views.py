# views.py
import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression


class PredictCutoff(APIView):
    def __init__(self):
        super().__init__()
        self.college_models = {}
        self.flag = False

    def train_models(self, gender, category, branch, home_university):
        file_name = ""
        if self.flag == False:
            file_name = (
                f"assets/{gender}_{category}_{branch}_{home_university}_Home.csv"
            )
        else:
            file_name = (
                f"assets/{gender}_{category}_{branch}_{home_university}_Other.csv"
            )
        df = pd.read_csv(file_name)
        college_models = {}

        # Split the data by college
        for college in df["College"].unique():
            college_df = df[df["College"] == college].drop(columns=["College"])
            X_train, X_test, y_train, y_test = train_test_split(
                college_df[["Year"]],
                college_df["Cutoff"],
                test_size=0.2,
                random_state=42,
            )
            model = LinearRegression()
            model.fit(X_train, y_train)
            college_models[college] = model

        return college_models

    def post(self, request):
        marks = float(request.data.get("marks"))
        gender = request.data.get("gender")
        branch = request.data.get("branch")
        category = request.data.get("category")
        home_university = request.data.get("home_university")
        predictions = {}

        genders = ["General", "Female"] if gender == "Female" else ["General"]
        categories = ["Open", category] if category != "Open" else ["Open"]

        alluniversities = ["MU", "SPPU", "RTMNU"]
        other_universities = [uni for uni in alluniversities if uni != home_university]

        if not all([marks, gender, category, branch, home_university]):
            return Response(
                {
                    "error": "All parameters (marks, gender, category, branch, home_university) must be specified."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        valid_categories = ["OPEN", "OBC", "ST", "SC", "NT1", "NT2", "NT3", "VJ"]
        valid_branches = [
            "Computer",
            "IT",
            "Civil",
            "Electrical",
            "Mechanical",
            "ENTC",
            "Instrumentation",
            "AIDS",
            "Chemical",
        ]
        valid_universities = ["RTMNU", "MU", "SPPU"]

        if category not in valid_categories:
            return Response(
                {"error": "Invalid category specified."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if branch not in valid_branches:
            return Response(
                {"error": "Invalid branch specified."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if home_university not in valid_universities:
            return Response(
                {"error": "Invalid Home University specified."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # for colleges in home universities:
        for gender in genders:
            for category in categories:
                # Train models if not already trained for the given gender, category, branch, and home_university
                self.college_models[(gender, category, branch, home_university)] = (
                    self.train_models(gender, category, branch, home_university)
                )

                # Select models based on gender, category, branch, and home_university
                college_models = self.college_models[
                    (gender, category, branch, home_university)
                ]

                for college, model in college_models.items():
                    current_year = np.array([[4]])  # Assuming current year is 4
                    predicted_cutoff = model.predict(current_year)
                    if college in predictions:
                        if predicted_cutoff < predictions[college]:
                            predictions[college] = predicted_cutoff[0]
                    else:
                        predictions[college] = predicted_cutoff[0]

        # self.flag = True
        # for uni in other_universities:
        #     for gender in genders:
        #         for category in categories:
        #             # Train models if not already trained for the given gender, category, branch, and home_university
        #             self.college_models[(gender, category, branch, uni)] = (
        #                 self.train_models(gender, category, branch, uni)
        #             )

        #             # Select models based on gender, category, branch, and home_university
        #             college_models = self.college_models[
        #                 (gender, category, branch, uni)
        #             ]

        #             for college, model in college_models.items():
        #                 current_year = np.array([[4]])  # Assuming current year is 4
        #                 predicted_cutoff = model.predict(current_year)
        #                 if college in predictions:
        #                     if predicted_cutoff < predictions[college]:
        #                         predictions[college] = predicted_cutoff[0]
        #                 else:
        #                     predictions[college] = predicted_cutoff[0]

        # Check which colleges the user can get admission into
        eligible_colleges = [
            college for college, cutoff in predictions.items() if marks >= cutoff
        ]

        # Prepare response data
        response_data = {
            "marks": marks,
            "predictions": predictions,
            "eligible_colleges": eligible_colleges,
        }

        return Response(response_data, status=status.HTTP_200_OK)


class SaveDataView(APIView):

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        if request.method == "POST":
            # Extract the values of Gender, Category, Branch, University, and University_Type
            gender = request.data.get("Gender")
            category = request.data.get("Category")
            branch = request.data.get("Branch")
            university = request.data.get("University")
            university_type = request.data.get("University_Type")
            college = request.data.get("College")
            year = request.data.get("Year")
            cutoff = request.data.get("Cutoff")

            data_string = ",".join([college, year, cutoff]) + "\n"

            # Determine the file path based on the gender, category, branch, university, and university type
            file_path = f"assets/{gender}_{category}_{branch}_{university}_{university_type}.csv"

            header_string = "College,Year,Cutoff"
            content_to_append = data_string
            if not os.path.exists(file_path):
                content_to_append = f"{header_string}\n{data_string}"
            try:
                with open(file_path, "a") as file:
                    file.write(content_to_append)
                    print("Data appended to file successfully")
                    return JsonResponse(
                        {"message": "Data appended to file successfully"}
                    )
            except Exception as e:
                print("Error appending to file:", e)
                return JsonResponse({"error": "Error appending to file"}, status=500)

        return JsonResponse({"error": "Invalid request method"}, status=405)
