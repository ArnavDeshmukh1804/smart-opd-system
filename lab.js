let currentLabPatient = null;

function loadLabPatient() {

    let id =
        document.getElementById("labPatientID").value;

    db.collection("patients")
    .doc(id)
    .get()

    .then((doc) => {

        if(doc.exists) {

            currentLabPatient = doc.data();

            document.getElementById(
                "labPatientDetails"
            ).innerHTML =

            `
            <h3>Patient Details</h3>

            <p><b>Name:</b> ${currentLabPatient.name}</p>

            <p><b>Age:</b> ${currentLabPatient.age}</p>

            <p><b>Phone:</b> ${currentLabPatient.phone}</p>
            <p><b>Department:</b> ${currentLabPatient.department}</p>

            <p><b>Token:</b> ${currentLabPatient.token}</p>

            <p><b>Status:</b> ${currentLabPatient.status}</p>

            <p><b>Diagnosis:</b> ${currentLabPatient.diagnosis || "Not Added"}</p>

            <p><b>Lab Report:</b> ${currentLabPatient.labReport || "Not Uploaded"}</p>
            `;

        }

        else {

            alert("Patient not found");

        }

    })

    .catch((error) => {

        console.log(error);

    });
}

function uploadLabReport() {

    if(currentLabPatient == null) {

        alert("Search patient first");
        return;
    }

    let report =
        document.getElementById("labReport").value;

    db.collection("patients")
    .doc(currentLabPatient.id)
    .update({

        labReport: report,
        status: "Lab Completed"

    })

    .then(() => {

        alert("Lab Report Uploaded");

        loadLabPatient();

    })

    .catch((error) => {

        console.log(error);

    });
}