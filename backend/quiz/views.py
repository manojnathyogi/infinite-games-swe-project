from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Quiz, Question, Answer
from .serializers import QuizSerializer, QuestionSerializer, AnswerSerializer
from rest_framework.views import APIView
from django.http import Http404
from rest_framework.generics import ListAPIView

class ListCreateQuiz(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def create(self, request, *args, **kwargs):
        # Handling nested questions and answers in the request
        quiz_data = request.data
        questions_data = quiz_data.pop('questions', [])

        # Create the quiz object
        quiz = Quiz.objects.create(title=quiz_data.get('title'))

        # Create associated questions and answers
        for question_data in questions_data:
            answers_data = question_data.pop('answers', [])
            question = Question.objects.create(quiz=quiz, title=question_data.get('title'))

            for answer_data in answers_data:
                Answer.objects.create(question=question, answer_text=answer_data.get('answer_text'),
                                      is_right=answer_data.get('is_right'))

        serializer = self.get_serializer(quiz)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        quiz = self.get_object()
        quiz_data = request.data
        questions_data = quiz_data.pop('questions', [])

        # Update the quiz title
        quiz.title = quiz_data.get('title', quiz.title)
        quiz.save()

        # Delete existing questions and answers
        quiz.questions.all().delete()

        # Create associated questions and answers
        for question_data in questions_data:
            answers_data = question_data.pop('answers', [])
            question = Question.objects.create(quiz=quiz, title=question_data.get('title'))

            for answer_data in answers_data:
                Answer.objects.create(question=question, answer_text=answer_data.get('answer_text'),
                                      is_right=answer_data.get('is_right'))

        serializer = self.get_serializer(quiz)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RetriveUpdateDestroyQuiz(generics.RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    lookup_url_kwarg = "quiz_id"

class ListAllQuizzes(ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizQuestion(APIView):

    def get(self, request, format="None", **kwargs):
        question = Question.objects.filter(quiz_id=kwargs["quiz_id"])
        serializer = QuestionSerializer(question, many=True)

        return Response(serializer.data)

    def post(self, request, format=None, **kwargs):
        quiz = Quiz.objects.get(id=kwargs["quiz_id"])
        serializer = QuestionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(quiz=quiz)
            return Response(
                {"message": "Question created successfully", "data": serializer.data},
                status= status.HTTP_201_CREATED
            )

class QuizQuestionDetail(APIView):

    def get_object(self, pk):
        try:
            return Question.objects.get(id=pk)
        except Question.DoesNotExist:
            raise Http404
        
    def get(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question)
        return Response(serializer.data)
    
    def patch(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        question = self.get_object(pk)
        question.delete()
        return Response(
                {"message": "Question deleted successfully"},
                status= status.HTTP_204_NO_CONTENT
            )
        