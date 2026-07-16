print("Loaded project_recommender.py")
print("******** USING NEW PROJECT RECOMMENDER ********")
PROJECTS = {

    "TensorFlow": [

        {
            "title": "Brain Tumor Classification",
            "description": "Build a CNN-based medical image classification system using transfer learning and Grad-CAM visualization.",
            "difficulty": "Intermediate",
            "duration": "3 Weeks",
            "career_value": "★★★★★",
            "category": "Computer Vision",
            "tech_stack": [
                "Python",
                "TensorFlow",
                "OpenCV",
                "Grad-CAM"
            ]
        },

        {
            "title": "Face Mask Detection",
            "description": "Develop a real-time face mask detection system using deep learning.",
            "difficulty": "Beginner",
            "duration": "2 Weeks",
            "career_value": "★★★★☆",
            "category": "Computer Vision",
            "tech_stack": [
                "Python",
                "TensorFlow",
                "OpenCV"
            ]
        }

    ],

    "PyTorch": [

        {
            "title": "Medical Image Segmentation",
            "description": "Segment organs or tumors using U-Net and PyTorch.",
            "difficulty": "Advanced",
            "duration": "4 Weeks",
            "career_value": "★★★★★",
            "category": "Medical AI",
            "tech_stack": [
                "Python",
                "PyTorch",
                "U-Net"
            ]
        },

        {
            "title": "Image Caption Generator",
            "description": "Generate captions for images using CNN and LSTM.",
            "difficulty": "Advanced",
            "duration": "3 Weeks",
            "career_value": "★★★★★",
            "category": "Deep Learning",
            "tech_stack": [
                "Python",
                "PyTorch",
                "NLP"
            ]
        }

    ],

    "OpenCV": [

        {
            "title": "Face Recognition Attendance System",
            "description": "Automate attendance using facial recognition.",
            "difficulty": "Intermediate",
            "duration": "2 Weeks",
            "career_value": "★★★★☆",
            "category": "Computer Vision",
            "tech_stack": [
                "Python",
                "OpenCV",
                "FaceNet"
            ]
        }

    ],

    "React": [

        {
            "title": "AI Resume Analyzer",
            "description": "Build a modern AI-powered resume analysis platform.",
            "difficulty": "Intermediate",
            "duration": "3 Weeks",
            "career_value": "★★★★★",
            "category": "Full Stack AI",
            "tech_stack": [
                "React",
                "FastAPI",
                "LLM"
            ]
        }

    ],

}

import inspect

def get_projects(skills):

    print("===== get_projects CALLED =====")
    print("File:", inspect.getfile(get_projects))
    print("Skills:", skills)

    recommendations = []

    for skill in skills:
        print(f"Checking skill: {skill}")
        print("Found:", PROJECTS.get(skill, []))
        recommendations.extend(PROJECTS.get(skill, []))

    print("FINAL RECOMMENDATIONS:")
    print(recommendations)
    print("==============================")

    if not recommendations:
        recommendations = [
            {
                "title": "AI Resume Analyzer",
                "description": "Build an AI-powered resume analysis platform.",
                "difficulty": "Intermediate",
                "duration": "3 Weeks",
                "career_value": "★★★★★",
                "category": "Generative AI",
                "tech_stack": [
                    "React",
                    "FastAPI",
                    "LLM"
                ]
            }
        ]

    return recommendations