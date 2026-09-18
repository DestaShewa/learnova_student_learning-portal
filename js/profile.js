document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProfile();

        setupProfileForm();

    }
);


/* =========================
   PROFILE STORAGE KEY
========================= */

const PROFILE_KEY =
    "learnovaStudentProfile";


/* =========================
   GET PROFILE
========================= */

function getProfile() {

    try {

        const data =
            localStorage.getItem(
                PROFILE_KEY
            );

        if (!data) {

            return {
                name: "",
                grade: "",
                email: "",
                goal: ""
            };
        }

        const profile =
            JSON.parse(data);

        return {
            name: profile.name || "",
            grade: profile.grade || "",
            email: profile.email || "",
            goal: profile.goal || ""
        };

    } catch (error) {

        console.error(
            "Could not load profile:",
            error
        );

        return {
            name: "",
            grade: "",
            email: "",
            goal: ""
        };
    }
}


/* =========================
   SAVE PROFILE
========================= */

function saveProfile(
    profile
) {

    try {

        localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify(profile)
        );

        return true;

    } catch (error) {

        console.error(
            "Could not save profile:",
            error
        );

        return false;
    }
}


/* =========================
   LOAD PROFILE
========================= */

function loadProfile() {

    const profile =
        getProfile();


    /* FORM */

    const nameInput =
        document.querySelector(
            "#student-name"
        );

    const gradeInput =
        document.querySelector(
            "#student-grade"
        );

    const emailInput =
        document.querySelector(
            "#student-email"
        );

    const goalInput =
        document.querySelector(
            "#student-goal"
        );


    if (nameInput) {

        nameInput.value =
            profile.name;
    }

    if (gradeInput) {

        gradeInput.value =
            profile.grade;
    }

    if (emailInput) {

        emailInput.value =
            profile.email;
    }

    if (goalInput) {

        goalInput.value =
            profile.goal;
    }


    /* DISPLAY */

    updateProfileDisplay(
        profile
    );
}


/* =========================
   PROFILE FORM
========================= */

function setupProfileForm() {

    const form =
        document.querySelector(
            "#profile-form"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        handleProfileSubmit
    );
}


/* =========================
   SUBMIT PROFILE
========================= */

function handleProfileSubmit(
    event
) {

    event.preventDefault();


    const name =
        document.querySelector(
            "#student-name"
        ).value.trim();


    const grade =
        document.querySelector(
            "#student-grade"
        ).value;


    const email =
        document.querySelector(
            "#student-email"
        ).value.trim();


    const goal =
        document.querySelector(
            "#student-goal"
        ).value.trim();


    if (!name) {

        showProfileMessage(
            "Please enter your name.",
            true
        );

        return;
    }


    if (!grade) {

        showProfileMessage(
            "Please select your grade.",
            true
        );

        return;
    }


    const profile = {

        name,
        grade,
        email,
        goal

    };


    const saved =
        saveProfile(
            profile
        );


    if (!saved) {

        showProfileMessage(
            "Could not save your profile.",
            true
        );

        return;
    }


    updateProfileDisplay(
        profile
    );


    showProfileMessage(
        "Profile saved successfully! ✓",
        false
    );
}


/* =========================
   DISPLAY PROFILE
========================= */

function updateProfileDisplay(
    profile
) {

    const nameElement =
        document.querySelector(
            "#profile-name"
        );


    const gradeElement =
        document.querySelector(
            "#profile-grade"
        );


    const emailElement =
        document.querySelector(
            "#profile-email"
        );


    const goalElement =
        document.querySelector(
            "#profile-goal"
        );


    if (nameElement) {

        nameElement.textContent =
            profile.name ||
            "Student";
    }


    if (gradeElement) {

        gradeElement.textContent =
            profile.grade ||
            "Grade not set";
    }


    if (emailElement) {

        emailElement.textContent =
            profile.email ||
            "Email not set";
    }


    if (goalElement) {

        goalElement.textContent =
            profile.goal ||
            "Learning goal not set";
    }
}


/* =========================
   MESSAGE
========================= */

function showProfileMessage(
    message,
    isError
) {

    const messageElement =
        document.querySelector(
            "#profile-message"
        );

    if (!messageElement) {
        return;
    }


    messageElement.textContent =
        message;


    messageElement.className =
        isError
            ? "profile-error"
            : "profile-success";
}