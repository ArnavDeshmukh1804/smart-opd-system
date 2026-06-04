function login() {

    let email =
        document.getElementById("email").value;

    let password =
        document.getElementById("password").value;

    firebase.auth()
    .signInWithEmailAndPassword(
        email,
        password
    )

    .then(() => {

        db.collection("users")
        .doc(email)
        .get()

        .then((doc) => {

            if(!doc.exists) {

                alert("User role not found");
                return;
            }

            let role = doc.data().role;

            if(role == "admin") {

                window.location.href =
                    "pages/dashboard.html";
            }

            else if(role == "doctor") {

                window.location.href =
                    "pages/doctor.html";
            }

            else if(role == "lab(incharge)") {

            window.location.href =
            "pages/lab.html";
            }
            else if(role.includes("lab")) {

             window.location.href =
             "pages/lab.html";
            }

            else {

                alert("Invalid Role");
            }
        });

    })

    .catch((error) => {

        alert(error.message);

    });
}
function logout() {

    firebase.auth().signOut()

    .then(() => {

        window.location.href =
            "../login.html";
    });
}
firebase.auth().onAuthStateChanged(function(user) {

    // CHECK IF CURRENT PAGE IS LOGIN

    let currentPage =
        window.location.pathname;

    let isLoginPage =
        currentPage.includes("login.html");

    // IF USER NOT LOGGED IN

    if(!user && !isLoginPage) {

        // IF PAGE INSIDE pages FOLDER

        if(currentPage.includes("/pages/")) {

            window.location.href =
                "../login.html";
        }

        // ROOT PAGES

        else {

            window.location.href =
                "login.html";
        }
    }
});