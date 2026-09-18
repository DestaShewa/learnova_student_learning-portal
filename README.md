# 🎓 Learnova — Student Learning Portal

Learnova is a frontend MVP for a student learning platform designed to help students **discover subjects, study lessons, take quizzes, and track their learning progress**.

The project is built with **HTML, CSS, and Vanilla JavaScript**, with browser `localStorage` used to persist student progress.

> **Project Status:** MVP — Frontend Complete
> **Current Focus:** Learning experience, UI/UX, JavaScript architecture, and frontend functionality
> **Future:** Backend API, database, authentication, teacher/admin features, and AI-powered learning

---

## 📌 Table of Contents

* [Overview](#-overview)
* [Problem](#-problem)
* [Solution](#-solution)
* [MVP Features](#-mvp-features)
* [User Flow](#-user-flow)
* [Project Architecture](#-project-architecture)
* [Tech Stack](#-tech-stack)
* [Project Structure](#-project-structure)
* [Data Architecture](#-data-architecture)
* [Local Storage](#-local-storage)
* [Getting Started](#-getting-started)
* [Testing](#-testing)
* [MVP Scope](#-mvp-scope)
* [Current Limitations](#-current-limitations)
* [Future Roadmap](#-future-roadmap)
* [Learning Objectives](#-learning-objectives)
* [Project Goals](#-project-goals)
* [Author](#-author)
* [License](#-license)

---

# 📖 Overview

**Learnova** is a student-focused learning portal MVP.

The application provides a simple learning workflow:

```text
Student
   │
   ▼
Dashboard
   │
   ├── Subjects
   │      │
   │      ▼
   │    Lessons
   │      │
   │      ▼
   │   Lesson Content
   │      │
   │      ▼
   │ Mark Complete
   │
   ├── Quiz
   │      │
   │      ▼
   │    Score
   │
   └── Progress
          │
          ▼
      Learning Statistics
```

The goal of this MVP is to validate the **core student learning experience** before introducing backend infrastructure.

---

# 🎯 Problem

Many students need a simple way to:

* Find learning materials
* Organize lessons by subject
* Study lessons independently
* Test their understanding
* Track their learning progress

Traditional learning resources can make it difficult for students to clearly understand:

> **What should I learn? → What have I completed? → How am I progressing?**

Learnova addresses this problem with a simple centralized learning interface.

---

# 💡 Solution

Learnova provides students with a structured learning experience where they can:

1. View available subjects
2. Explore lessons
3. Search and filter lessons
4. Open individual lesson content
5. Mark lessons as completed
6. Take quizzes
7. View quiz results
8. Track overall progress
9. Manage a basic student profile
10. Continue learning from their dashboard

---

# 🚀 MVP Features

## 1. 🏠 Student Dashboard

The dashboard provides a quick overview of the student's learning activity.

### Includes

* Student welcome section
* Lessons completed
* Overall learning progress
* Latest quiz score
* Quiz attempts
* Continue Learning section
* Subject progress
* Quick navigation actions

---

## 2. 📚 Subjects

Students can browse available subjects.

### Current Subjects

* Mathematics
* Science
* English

Each subject includes:

* Subject name
* Description
* Number of lessons
* Link to related lessons

---

## 3. 📖 Lessons

Students can explore available lessons.

### Features

* Lesson listing
* Lesson title
* Subject
* Description
* Duration
* Completion status
* Open Lesson action
* Review completed lessons

---

## 4. 🔎 Lesson Search

Students can search lessons using keywords.

Search supports:

* Lesson title
* Lesson description
* Subject name

Example:

```text
Search: algebra
```

The system dynamically displays matching lessons.

---

## 5. 🏷️ Subject Filtering

Lessons can be filtered by subject.

Example:

```text
All Subjects
    │
    ├── Mathematics
    ├── Science
    └── English
```

Subject pages can also directly open filtered lesson views using URL parameters.

Example:

```text
lessons.html?subject=mathematics
```

---

## 6. 📄 Individual Lesson Pages

Each lesson has its own dedicated page.

A lesson contains:

* Introduction
* Explanation
* Examples
* Key points
* Subject
* Duration
* Completion status

Example lesson structure:

```text
Lesson
 │
 ├── Introduction
 ├── Explanation
 ├── Examples
 ├── Key Points
 └── Mark Complete
```

---

## 7. ✅ Lesson Completion

Students can mark lessons as completed.

Completed lessons are stored in browser `localStorage`.

The application then updates:

* Dashboard
* Progress page
* Lesson status
* Subject progress

---

## 8. 🧠 Quiz System

Learnova includes a basic interactive quiz.

### Features

* Multiple-choice questions
* Answer validation
* Score calculation
* Percentage calculation
* Quiz completion tracking
* Attempt tracking
* Correct answer tracking

Example:

```text
Question
   │
   ▼
Select Answer
   │
   ▼
Submit Quiz
   │
   ▼
Calculate Score
   │
   ▼
Save Result
```

---

## 9. 📊 Progress Tracking

Students can monitor their learning progress.

Progress includes:

* Completed lessons
* Total lessons
* Overall percentage
* Subject progress
* Quiz score
* Quiz attempts
* Correct answers

Example:

```text
Overall Progress
████████████░░░░ 75%

Mathematics
██████████████░░ 85%

Science
██████████░░░░░░ 60%

English
████████████░░░░ 75%
```

---

## 10. 👤 Student Profile

Students can create a basic local profile.

Profile information includes:

* Name
* Grade
* Email
* Learning goal

Profile information is stored locally in the browser.

---

## 11. 🌙 Dark Mode

Learnova supports light and dark themes.

The selected theme is saved in `localStorage`, allowing the preference to persist between page visits.

---

## 12. 📱 Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

Responsive styles are organized separately in:

```text
css/responsive.css
```

---

## 13. ♿ Accessibility Basics

The project includes basic accessibility practices such as:

* Semantic HTML
* Navigation labels
* Form labels
* `aria-current`
* `aria-live`
* Accessible buttons
* Keyboard-friendly controls
* Descriptive page metadata

---

# 🔄 User Flow

The main student journey is:

```text
                    Learnova
                       │
                       ▼
                   Dashboard
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Subjects      Lessons       Quiz
          │            │             │
          ▼            ▼             ▼
   Select Subject   Search/Filter   Questions
          │            │             │
          └───────► Lesson ◄─────────┘
                       │
                       ▼
                 Study Content
                       │
                       ▼
                 Mark Complete
                       │
                       ▼
                    Progress
```

---

# 🏗️ Project Architecture

The project follows a simple frontend architecture:

```text
Learnova
│
├── Presentation
│   ├── HTML
│   └── CSS
│
├── Application Logic
│   └── JavaScript
│
├── Data
│   └── data.js
│
└── Persistence
    └── Browser localStorage
```

### Application Flow

```text
HTML
 │
 ▼
JavaScript
 │
 ├── Read Data
 ├── Render UI
 ├── Handle User Actions
 ├── Calculate Progress
 └── Save State
       │
       ▼
   localStorage
```

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose                             |
| ---------- | ----------------------------------- |
| HTML5      | Page structure and semantic markup  |
| CSS3       | Styling and responsive design       |
| JavaScript | Application logic and interactivity |

## Browser APIs

| API             | Purpose                           |
| --------------- | --------------------------------- |
| LocalStorage    | Persist student data and progress |
| URLSearchParams | Handle URL-based lesson filtering |
| DOM API         | Dynamic UI rendering              |

## Development Tools

| Tool            | Purpose               |
| --------------- | --------------------- |
| Git             | Version control       |
| GitHub          | Source code hosting   |
| VS Code         | Development           |
| Chrome DevTools | Debugging and testing |

---

# 📁 Project Structure

```text
learnova/
│
├── index.html
│
├── pages/
│   ├── subjects.html
│   ├── lessons.html
│   ├── lesson.html
│   ├── quiz.html
│   ├── progress.html
│   └── profile.html
│
├── css/
│   ├── style.css
│   └── responsive.css
│
├── js/
│   ├── main.js
│   ├── data.js
│   ├── dashboard.js
│   ├── subjects.js
│   ├── lessons.js
│   ├── lesson.js
│   ├── quiz.js
│   ├── progress.js
│   └── profile.js
│
├── assets/
│   ├── images/
│   └── icons/
│
├── README.md
│
└── .gitignore
```

---

# 🧩 JavaScript Architecture

JavaScript functionality is separated by responsibility.

```text
js/
│
├── main.js
│      └── Global application functionality
│
├── data.js
│      └── Subjects, lessons and quiz data
│
├── dashboard.js
│      └── Student dashboard
│
├── subjects.js
│      └── Subject rendering
│
├── lessons.js
│      └── Lesson listing/search/filtering
│
├── lesson.js
│      └── Individual lesson page
│
├── quiz.js
│      └── Quiz logic and scoring
│
├── progress.js
│      └── Progress calculations
│
└── profile.js
       └── Student profile management
```

This structure keeps different application responsibilities separated instead of placing all logic inside one JavaScript file.

---

# 🗂️ Data Architecture

Learnova uses structured JavaScript objects as its temporary data source.

```text
subjects
    │
    ├── id
    ├── name
    └── description
          │
          ▼
lessons
    │
    ├── id
    ├── subjectId
    ├── subject
    ├── title
    ├── description
    ├── duration
    └── content
          │
          ├── introduction
          ├── explanation
          ├── examples
          └── keyPoints
```

### Current Content

The MVP currently contains:

```text
Mathematics
 ├── Introduction to Algebra
 ├── Linear Equations
 ├── Fractions
 └── Geometry Basics

Science
 ├── Introduction to Biology
 ├── Matter and Its States
 └── Energy

English
 ├── Parts of Speech
 ├── Basic Grammar
 └── Vocabulary Building
```

**Total:** 10 lessons

---

# 💾 Local Storage

Because the current version is frontend-only, browser `localStorage` is used for persistence.

### Stored Data

```text
learnovaCompletedLessons
learnovaQuizScore
learnovaQuizLastScore
learnovaQuizCompleted
learnovaQuizAttempts
learnovaQuizCorrectAnswers
learnovaQuizTotalQuestions
learnovaStudentProfile
learnovaTheme
```

### Example

Completed lessons:

```javascript
[
    1,
    3,
    5
]
```

This means the student has completed lessons with IDs:

```text
1
3
5
```

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/learnova.git
```

---

## 2. Enter the Project

```bash
cd learnova
```

---

## 3. Open the Project

Because Learnova is currently a static frontend application, no backend server is required.

You can open:

```text
index.html
```

directly in a browser.

For a better development experience, you can use a local development server such as **VS Code Live Server**.

---

# 🧪 Testing

Before considering the MVP complete, test the complete student flow.

## Dashboard

* [ ] Dashboard loads correctly
* [ ] Student information appears
* [ ] Lesson statistics are correct
* [ ] Quiz statistics are correct
* [ ] Continue Learning works
* [ ] Subject progress is correct

## Subjects

* [ ] All subjects appear
* [ ] Lesson counts are correct
* [ ] View Lessons works
* [ ] Subject filtering works

## Lessons

* [ ] All lessons appear
* [ ] Search works
* [ ] Subject filter works
* [ ] Result count updates
* [ ] Open Lesson works
* [ ] Completed lessons display correctly

## Lesson

* [ ] Correct lesson loads
* [ ] Content displays correctly
* [ ] Examples display correctly
* [ ] Key points display correctly
* [ ] Mark Complete works
* [ ] Completion persists after refresh

## Quiz

* [ ] Questions load
* [ ] Answers can be selected
* [ ] Empty answers are validated
* [ ] Score is calculated correctly
* [ ] Results are saved

## Progress

* [ ] Overall progress is correct
* [ ] Subject progress is correct
* [ ] Quiz statistics are correct
* [ ] Reset functionality works

## Profile

* [ ] Profile form works
* [ ] Data is saved
* [ ] Data persists after refresh

## UI

* [ ] Dark mode works
* [ ] Responsive layout works
* [ ] Navigation works
* [ ] No broken links
* [ ] No JavaScript console errors

---

# 📦 MVP Scope

The current MVP intentionally focuses on the **core learning experience**.

### Included

```text
✅ Student Dashboard
✅ Subjects
✅ Lessons
✅ Real Lesson Content
✅ Search
✅ Subject Filtering
✅ Individual Lesson Pages
✅ Lesson Completion
✅ Quiz
✅ Quiz Scoring
✅ Progress Tracking
✅ Student Profile
✅ LocalStorage
✅ Dark Mode
✅ Responsive Design
✅ Basic Accessibility
```

### Not Included Yet

```text
❌ Backend API
❌ PostgreSQL Database
❌ User Authentication
❌ Cloud Database
❌ Teacher Accounts
❌ Admin Dashboard
❌ Real-time Features
❌ Payments
❌ Notifications
❌ AI Tutor
❌ AI Recommendations
```

These features are intentionally outside the current frontend MVP scope.

---

# ⚠️ Current Limitations

The current version is a **frontend MVP**, so it has several limitations.

### 1. Local Data

Lessons are currently stored inside JavaScript rather than a database.

```text
data.js
   ↓
Browser
```

### 2. Local Progress

Student progress is stored only in the browser.

Clearing browser storage will remove the saved progress.

### 3. No Authentication

There are currently no real student accounts.

### 4. No Backend

There is no API server or server-side business logic yet.

### 5. Static Educational Content

Lesson content is currently manually defined in `data.js`.

---

# 🗺️ Future Roadmap

Learnova will evolve from a frontend MVP into a full-stack education platform.

## Phase 1 — Frontend MVP

```text
HTML
CSS
JavaScript
LocalStorage
        │
        ▼
     COMPLETE
```

Current phase.

---

## Phase 2 — Backend

Introduce:

```text
Frontend
    │
    ▼
REST API
    │
    ▼
Backend
    │
    ▼
PostgreSQL
```

Planned technologies may include:

* Node.js
* Express.js
* PostgreSQL
* REST API
* Authentication
* Authorization

---

## Phase 3 — Real Student Accounts

Replace local-only profiles with real accounts.

```text
Student
   │
   ▼
Register / Login
   │
   ▼
Authentication
   │
   ▼
Student Account
   │
   ▼
Personal Progress
```

---

## Phase 4 — Teacher Features

Potential teacher capabilities:

* Create lessons
* Edit lessons
* Delete lessons
* Create quizzes
* View student progress
* Manage subjects
* Manage learning materials

---

## Phase 5 — Admin Features

Potential administrator capabilities:

* User management
* Teacher management
* Subject management
* Content moderation
* Platform statistics
* System configuration

---

## Phase 6 — AI-Powered Learning

AI will eventually become part of the learning experience.

Potential features:

```text
                 AI Learning System
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
    AI Tutor        AI Feedback       AI Recommendations
        │                │                │
        └────────────────┼────────────────┘
                         ▼
                  Personalized Learning
```

Potential capabilities:

* AI tutor
* Personalized explanations
* Question generation
* Quiz generation
* Learning recommendations
* Student performance analysis
* Personalized study plans
* RAG-based educational assistant
* AI learning agents

---

# 🎯 Long-Term Vision

Learnova is intended to grow from a simple learning portal into an intelligent education platform.

The long-term direction is:

```text
Education
    ×
Technology
    ×
AI
    │
    ▼
Intelligent Learning Platform
```

The platform can eventually connect:

```text
Students
   │
   ├── Lessons
   ├── Quizzes
   ├── Progress
   ├── Teachers
   └── AI Learning Support
```

---

# 🧠 Learning Objectives

This project is also designed as a practical software-engineering project.

Through Learnova, the following concepts are practiced:

### Frontend Development

* Semantic HTML
* CSS architecture
* Responsive design
* Component-like UI organization
* Forms
* Navigation
* Accessibility

### JavaScript

* Variables and functions
* Arrays and objects
* Array methods
* DOM manipulation
* Events
* Conditional logic
* URL parameters
* Error handling
* LocalStorage
* Modular code organization

### Software Engineering

* Separation of concerns
* Data modeling
* Feature organization
* Reusable functions
* Error handling
* Maintainable project structure
* Testing
* Git version control
* Documentation

---

# 🏆 Project Goals

The main goal of Learnova MVP is not to build a huge application.

The goal is to demonstrate the ability to:

```text
Understand a Problem
        ↓
Design a Solution
        ↓
Build an MVP
        ↓
Organize the Code
        ↓
Test the Application
        ↓
Document the Project
        ↓
Deploy It
        ↓
Improve It Iteratively
```

This project establishes the foundation for the next stage:

```text
Frontend MVP
      ↓
Backend
      ↓
Database
      ↓
Authentication
      ↓
Full-Stack Application
      ↓
System Engineering
      ↓
AI Integration
      ↓
AI Agent System
```

---

# 📈 Project Status

| Area                 | Status     |
| -------------------- | ---------- |
| UI Design            | ✅ Complete |
| Responsive Design    | ✅ Complete |
| Subjects             | ✅ Complete |
| Lessons              | ✅ Complete |
| Lesson Content       | ✅ Complete |
| Search               | ✅ Complete |
| Filtering            | ✅ Complete |
| Quiz                 | ✅ Complete |
| Progress Tracking    | ✅ Complete |
| Student Profile      | ✅ Complete |
| Dashboard            | ✅ Complete |
| Local Persistence    | ✅ Complete |
| Accessibility Basics | ✅ Complete |
| Backend              | ⏳ Planned  |
| Database             | ⏳ Planned  |
| Authentication       | ⏳ Planned  |
| Teacher System       | ⏳ Planned  |
| Admin System         | ⏳ Planned  |
| AI Features          | ⏳ Planned  |

---

# 👨‍💻 Author

**Desta Shewa**

Computer Science Graduate
Software Engineering / Full-Stack Development / AI Systems

---

# 📄 License

This project is currently intended as a learning and portfolio project.

A formal open-source license can be added when the project is prepared for public contribution and distribution.

---

# ⭐ Final Note

Learnova MVP represents the first stage of a larger education technology project.

The current priority is to build a **small, functional, understandable, and maintainable product** rather than adding unnecessary features.

The next major milestone is to transform the frontend MVP into a real full-stack application with:

```text
Frontend
   +
Backend
   +
Database
   +
Authentication
   +
Production Deployment
   +
AI
```

**Learnova — Learn. Practice. Progress.**
