PROJECTS = {

    # AI / ML
    "Python": [
        "Student Performance Prediction",
        "AI Resume Analyzer",
        "Customer Churn Prediction"
    ],

    "Machine Learning": [
        "House Price Prediction",
        "Credit Card Fraud Detection",
        "Movie Recommendation System"
    ],

    "Deep Learning": [
        "Brain Tumor Classification using CNN",
        "Image Classification System",
        "Face Mask Detection"
    ],

    "TensorFlow": [
        "Handwritten Digit Recognition",
        "Object Detection System"
    ],

    "PyTorch": [
        "Medical Image Segmentation",
        "Image Caption Generator",
        "Neural Style Transfer"
    ],

    "Scikit-learn": [
        "Spam Email Classifier",
        "Customer Segmentation",
        "Loan Approval Prediction"
    ],

    "NumPy": [
        "Data Analysis Toolkit",
        "Scientific Calculator using NumPy"
    ],

    "Pandas": [
        "Sales Dashboard",
        "Data Cleaning Automation Tool"
    ],

    "Statistics": [
        "A/B Testing Analyzer",
        "Business Analytics Dashboard"
    ],

    "OpenCV": [
        "Face Recognition Attendance System",
        "Vehicle Detection System",
        "License Plate Recognition"
    ],

    "NLP": [
        "Fake News Detection",
        "Resume Screening AI",
        "Sentiment Analysis"
    ],

    # Web

    "React": [
        "Portfolio Website",
        "E-Commerce Website",
        "Netflix Clone"
    ],

    "FastAPI": [
        "AI Resume Analyzer API",
        "Student Management API"
    ],

    "Docker": [
        "Containerized ML Application"
    ],

    "LangGraph": [
        "CareerForge AI",
        "Multi-Agent Career Coach"
    ],
}


def get_projects(skills):

    projects = []

    for skill in skills:
        projects.extend(PROJECTS.get(skill, []))

    if not projects:
        projects = [
            "AI Resume Analyzer",
            "Career Recommendation System",
            "AI Interview Assistant"
        ]

    return list(dict.fromkeys(projects))