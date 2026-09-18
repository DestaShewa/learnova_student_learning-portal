const subjects = [
    {
        id: "mathematics",
        name: "Mathematics",
        description:
            "Build your mathematical knowledge through algebra, equations, fractions and geometry."
    },
    {
        id: "science",
        name: "Science",
        description:
            "Understand important scientific concepts through simple and practical lessons."
    },
    {
        id: "english",
        name: "English",
        description:
            "Improve grammar, vocabulary, reading and communication skills."
    }
];

const lessons = [
    // =========================
    // MATHEMATICS
    // =========================

    {
        id: 1,
        subjectId: "mathematics",
        subject: "Mathematics",
        title: "Introduction to Algebra",
        description:
            "Learn variables, constants, expressions and basic algebraic ideas.",
        duration: "20 minutes",

        content: {
            introduction:
                "Algebra is a branch of mathematics that uses letters and symbols to represent unknown values.",

            explanation:
                "In algebra, a letter such as x can represent a number that we do not know yet. We use mathematical operations to work with these values.",

            examples: [
                "x + 5 = 10",
                "2x = 12",
                "3x + 2 = 14"
            ],

            keyPoints: [
                "A variable represents an unknown value.",
                "A constant is a fixed number.",
                "An expression can contain numbers, variables and operations.",
                "An equation shows that two expressions are equal."
            ]
        }
    },

    {
        id: 2,
        subjectId: "mathematics",
        subject: "Mathematics",
        title: "Linear Equations",
        description:
            "Learn how to understand and solve basic linear equations.",
        duration: "25 minutes",

        content: {
            introduction:
                "A linear equation is an equation where the variable has a power of one.",

            explanation:
                "To solve a linear equation, we perform operations that isolate the variable on one side of the equation.",

            examples: [
                "x + 4 = 10 → x = 6",
                "x - 3 = 7 → x = 10",
                "2x = 14 → x = 7"
            ],

            keyPoints: [
                "Keep both sides of an equation balanced.",
                "Use inverse operations to isolate the variable.",
                "Always check your answer in the original equation."
            ]
        }
    },

    {
        id: 3,
        subjectId: "mathematics",
        subject: "Mathematics",
        title: "Fractions",
        description:
            "Understand fractions and perform basic fraction operations.",
        duration: "20 minutes",

        content: {
            introduction:
                "A fraction represents a part of a whole.",

            explanation:
                "A fraction has a numerator on top and a denominator at the bottom. The denominator tells us how many equal parts the whole has, while the numerator tells us how many parts we have.",

            examples: [
                "1/2 means one out of two equal parts.",
                "3/4 means three out of four equal parts.",
                "1/4 + 1/4 = 2/4 = 1/2"
            ],

            keyPoints: [
                "The numerator is the top number.",
                "The denominator is the bottom number.",
                "Fractions can be simplified.",
                "Equivalent fractions represent the same value."
            ]
        }
    },

    {
        id: 4,
        subjectId: "mathematics",
        subject: "Mathematics",
        title: "Geometry Basics",
        description:
            "Learn basic shapes, angles, measurements and geometry concepts.",
        duration: "25 minutes",

        content: {
            introduction:
                "Geometry is the study of shapes, sizes, positions and properties of objects.",

            explanation:
                "Basic geometry includes points, lines, angles and different types of shapes such as triangles, rectangles and circles.",

            examples: [
                "A triangle has 3 sides.",
                "A rectangle has 4 sides and 4 right angles.",
                "A right angle measures 90°."
            ],

            keyPoints: [
                "A point represents an exact location.",
                "A line extends infinitely in both directions.",
                "Angles are measured in degrees.",
                "Different shapes have different properties."
            ]
        }
    },

    // =========================
    // SCIENCE
    // =========================

    {
        id: 5,
        subjectId: "science",
        subject: "Science",
        title: "Introduction to Biology",
        description:
            "Learn what biology is and why living things are studied.",
        duration: "20 minutes",

        content: {
            introduction:
                "Biology is the study of living organisms.",

            explanation:
                "Biologists study plants, animals, microorganisms and how living things interact with their environment.",

            examples: [
                "Plants are living organisms.",
                "Animals are living organisms.",
                "Cells are the basic units of life."
            ],

            keyPoints: [
                "Biology studies life.",
                "Living things have common characteristics.",
                "Cells are fundamental units of living organisms."
            ]
        }
    },

    {
        id: 6,
        subjectId: "science",
        subject: "Science",
        title: "Matter and Its States",
        description:
            "Understand solids, liquids and gases.",
        duration: "20 minutes",

        content: {
            introduction:
                "Matter is anything that has mass and occupies space.",

            explanation:
                "Matter commonly exists as solids, liquids and gases. These states have different properties.",

            examples: [
                "Ice is a solid.",
                "Water is a liquid.",
                "Water vapor is a gas."
            ],

            keyPoints: [
                "Solids have a fixed shape.",
                "Liquids take the shape of their container.",
                "Gases spread to fill their container."
            ]
        }
    },

    {
        id: 7,
        subjectId: "science",
        subject: "Science",
        title: "Energy",
        description:
            "Learn the basic concept of energy and common forms of energy.",
        duration: "20 minutes",

        content: {
            introduction:
                "Energy is the ability to cause change or do work.",

            explanation:
                "Energy exists in different forms including heat, light, electrical, chemical and mechanical energy.",

            examples: [
                "The Sun provides light and heat energy.",
                "A battery stores chemical energy.",
                "Moving objects have mechanical energy."
            ],

            keyPoints: [
                "Energy exists in different forms.",
                "Energy can be transferred.",
                "Energy is important for everyday activities."
            ]
        }
    },

    // =========================
    // ENGLISH
    // =========================

    {
        id: 8,
        subjectId: "english",
        subject: "English",
        title: "Parts of Speech",
        description:
            "Learn the basic parts of speech used in English.",
        duration: "20 minutes",

        content: {
            introduction:
                "Parts of speech describe the role words play in sentences.",

            explanation:
                "Common parts of speech include nouns, pronouns, verbs, adjectives, adverbs, prepositions and conjunctions.",

            examples: [
                "Noun: student",
                "Verb: learn",
                "Adjective: smart",
                "Adverb: quickly"
            ],

            keyPoints: [
                "Nouns name people, places, things or ideas.",
                "Verbs describe actions or states.",
                "Adjectives describe nouns.",
                "Adverbs commonly describe verbs."
            ]
        }
    },

    {
        id: 9,
        subjectId: "english",
        subject: "English",
        title: "Basic Grammar",
        description:
            "Learn basic sentence structure and grammar rules.",
        duration: "25 minutes",

        content: {
            introduction:
                "Grammar provides the rules we use to construct meaningful sentences.",

            explanation:
                "A basic English sentence often contains a subject and a verb. Good grammar helps us communicate clearly.",

            examples: [
                "The student reads.",
                "She studies mathematics.",
                "They play football."
            ],

            keyPoints: [
                "A sentence should communicate a complete idea.",
                "Subjects perform or experience actions.",
                "Verbs describe actions or states.",
                "Correct grammar improves communication."
            ]
        }
    },

    {
        id: 10,
        subjectId: "english",
        subject: "English",
        title: "Vocabulary Building",
        description:
            "Learn practical techniques for improving vocabulary.",
        duration: "20 minutes",

        content: {
            introduction:
                "Vocabulary is the collection of words that a person knows and uses.",

            explanation:
                "Reading, writing, listening and using new words in sentences are effective ways to develop vocabulary.",

            examples: [
                "Learn the meaning of a new word.",
                "Write the word in a sentence.",
                "Use the word when speaking or writing."
            ],

            keyPoints: [
                "Read regularly.",
                "Learn words in context.",
                "Practice using new vocabulary.",
                "Review previously learned words."
            ]
        }
    }
];

const quizQuestions = [
    {
        id: 1,
        question: "What is 2 + 3?",
        options: ["4", "5", "6"],
        answer: "5"
    },
    {
        id: 2,
        question: "What is 10 × 2?",
        options: ["10", "20", "30"],
        answer: "20"
    },
    {
        id: 3,
        question: "What is 15 ÷ 3?",
        options: ["3", "5", "6"],
        answer: "5"
    },
    {
        id: 4,
        question: "What is 7 × 4?",
        options: ["21", "28", "32"],
        answer: "28"
    },
    {
        id: 5,
        question: "What is 20 - 8?",
        options: ["10", "12", "14"],
        answer: "12"
    }
];