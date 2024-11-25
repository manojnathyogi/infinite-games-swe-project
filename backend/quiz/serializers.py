from rest_framework import serializers
from .models import Quiz, Question, Answer

class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = [
            "id",
            "answer_text",
            "is_right"
        ]

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "title",
            "answers",
        ]

    def create(self, validated_data):
        answers_data = validated_data.pop('answers', [])
        question = Question.objects.create(**validated_data)

        for answer_data in answers_data:
            Answer.objects.create(question=question, **answer_data)

        return question

    def update(self, instance, validated_data):
        instance.title = validated_data.get("title", instance.title)
        instance.save()

        # Update answers
        answers_data = validated_data.pop("answers", [])
        instance.answers.all().delete()  # Clear existing answers

        for answer_data in answers_data:
            Answer.objects.create(question=instance, **answer_data)

        return instance

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = [
            "id",
            "title",
            "created_at",
            "questions"
        ]

    def create(self, validated_data):
        questions_data = validated_data.pop('questions', [])
        quiz = Quiz.objects.create(**validated_data)

        for question_data in questions_data:
            answers_data = question_data.pop('answers', [])
            question = Question.objects.create(quiz=quiz, **question_data)

            for answer_data in answers_data:
                Answer.objects.create(question=question, **answer_data)

        return quiz

# from rest_framework import serializers
# from .models import Quiz, Question, Answer

# class QuizSerializer(serializers.ModelSerializer):

#     question_count = serializers.SerializerMethodField("get_question_count")

#     class Meta:
#         model= Quiz
#         fields = [
#             "id",
#             "title",
#             "created_at",
#             "question_count"
#         ]

#     def get_question_count(self, obj):
#         return obj.question_count

# class AnswerSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Answer
#         fields = [
#             "id",
#             "answer_text",
#             "is_right"
#         ]

# class QuestionSerializer(serializers.ModelSerializer):

#     quiz = QuizSerializer(read_only=True)
#     answers = AnswerSerializer(many=True)

#     class Meta:
#         model = Question
#         fields = [
#             "id",
#             "quiz",
#             "title",
#             "answers",
#         ]

#     def create(self, validated_data):
#         answers_data = validated_data.pop("answers", [])
#         question = Question.objects.create(**validated_data)

#         for answer_data in answers_data:
#             Answer.objects.create(question=question, **answer_data)

#         return question

#     def update(self, instance, validated_data):
        
#         instance.title = validated_data.pop("title", instance.title)
        
#         # Update the associated answers
#         answers_data = validated_data.pop("answers", [])
#         instance.answers.all().delete() # Deleting existing answers
#         for answer_data in answers_data:
#             Answer.objects.create(question=instance, **answer_data)

#         instance.save()

#         return instance
