// ================= DOCTOR SECTION =================

let currentPatient = null;

function searchPatient() {

    let id = document.getElementById("searchID").value;

    db.collection("patients")
    .doc(id)
    .get()

    .then((doc) => {

        if(doc.exists) {

            currentPatient = doc.data();

            let user = firebase.auth().currentUser;

            db.collection("users")
            .doc(user.email)
            .get()

            .then((userDoc) => {

                let doctorDepartment =
                    userDoc.data().department;

                if(
                    currentPatient.department !=
                    doctorDepartment
                ) {

                    alert(
                        "Access Denied! Wrong Department"
                    );

                    document.getElementById(
                        "patientDetails"
                    ).innerHTML = "";

                    return;
                }

                document.getElementById(
                    "patientDetails"
                ).innerHTML =

                `
                <h3>Patient Details</h3>

                <p><b>Name:</b> ${currentPatient.name}</p>

                <p><b>Age:</b> ${currentPatient.age}</p>

                <p><b>Phone:</b> ${currentPatient.phone}</p>

                <p><b>Department:</b> ${currentPatient.department}</p>

                <p><b>Token:</b> ${currentPatient.token}</p>

                <p><b>Status:</b> ${currentPatient.status}</p>

                <p><b>Diagnosis:</b> ${currentPatient.diagnosis || "Not Added"}</p>

                <p><b>Lab Report:</b> ${currentPatient.labReport || "Not Uploaded"}</p>
                `;
            });
        }

        else {

            alert("Patient not found");
        }

    })

    .catch((error) => {

        console.log(error);

    });
}

function saveDiagnosis() {

    if(currentPatient == null) {

        alert("Search patient first");
        return;
    }

    let diagnosis =
        document.getElementById("diagnosis").value;

    db.collection("patients")
    .doc(currentPatient.id)
    .update({

        diagnosis: diagnosis,
        status: "Doctor Checked"

    })

    .then(() => {

        alert("Diagnosis Saved");

        searchPatient();

        if(typeof loadQueue === "function") {

            loadQueue();
        }

    })

    .catch((error) => {

        console.log(error);

    });
}

// ================= QR SCANNER =================

function onScanSuccess(decodedText) {

    document.getElementById("searchID").value =
        decodedText;

    searchPatient();
}

if(document.getElementById("reader")) {

    let html5QrcodeScanner = new Html5QrcodeScanner(

        "reader",

        {
            fps: 10,
            qrbox: 250
        }
    );

    html5QrcodeScanner.render(onScanSuccess);
}
// ================= DEPARTMENT FILTER =================

function loadDepartmentPatients() {

    let user = firebase.auth().currentUser;

    if(!user) return;

    db.collection("users")
    .doc(user.email)
    .get()

    .then((userDoc) => {

        let data = userDoc.data();

        console.log(data);

        let department = data["department"];

        console.log("Department =", department);
        console.log("Email:", user.email);
        console.log("Doc Exists:", userDoc.exists);
        console.log("Data:", userDoc.data());    

        document.getElementById(
            "doctorDepartment"
        ).innerText =
            department;

        db.collection("patients")
        .where(
            "department",
            "==",
            department
        )
        .get()

        .then((snapshot) => {

            let html = "";

            snapshot.forEach((doc) => {

                let patient =
                    doc.data();

                html += `

                <div style="
                    background:#f1f5f9;
                    padding:10px;
                    margin-top:10px;
                    border-radius:10px;
                ">

                    <p><b>ID:</b> ${patient.id}</p>

                    <p><b>Name:</b> ${patient.name}</p>

                    <p><b>Department:</b> ${patient.department}</p>

                    <p><b>Status:</b> ${patient.status}</p>

                </div>
                `;
            });

            if(html == "") {

                html =
                "<p>No Patients Found</p>";
            }

            document.getElementById(
                "departmentPatients"
            ).innerHTML = html;
        });
    });
}

firebase.auth().onAuthStateChanged((user) => {

    if(user) {

        loadDepartmentPatients();

        loadAppointments();
    }
});
// ================= APPOINTMENTS =================

function loadAppointments() {

    let user = firebase.auth().currentUser;

    if(!user) return;

    db.collection("users")
    .doc(user.email)
    .get()

    .then((userDoc) => {

        let department =
            userDoc.data().department;

        db.collection("patients")
        .where(
            "department",
            "==",
            department
        )
        .get()

        .then((snapshot) => {

            let html = "";

            let patients = [];

            snapshot.forEach((doc) => {

                patients.push(doc.data());
            });

            // SORT BY TIME

            patients.sort((a, b) => {

                return (
                    a.appointmentTime >
                    b.appointmentTime
                ) ? 1 : -1;
            });

            patients.forEach((patient) => {

                html += `

                <div style="
                    background:#eef2ff;
                    padding:10px;
                    margin-top:10px;
                    border-radius:10px;
                ">

                    <p>
                    <b>Time:</b>
                    ${patient.appointmentTime}
                    </p>

                    <p>
                    <b>Name:</b>
                    ${patient.name}
                    </p>

                    <p>
                    <b>Patient ID:</b>
                    ${patient.id}
                    </p>

                </div>
                `;
            });

            if(html == "") {

                html =
                "<p>No Appointments Found</p>";
            }

            document.getElementById(
                "appointmentList"
            ).innerHTML = html;
        });
    });
}