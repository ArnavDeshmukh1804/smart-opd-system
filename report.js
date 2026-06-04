function loadReport() {

    let id =
        document.getElementById(
            "reportPatientID"
        ).value;

    db.collection("patients")
    .doc(id)
    .get()

    .then((doc) => {

        if(doc.exists) {

            let patient = doc.data();

            document.getElementById(
                "reportContent"
            ).innerHTML =

            `
            <h2>Patient Details</h2>

            <p><b>Patient ID:</b> ${patient.id}</p>

            <p><b>Name:</b> ${patient.name}</p>

            <p><b>Age:</b> ${patient.age}</p>

            <p><b>Phone:</b> ${patient.phone}</p>
            <p><b>Department:</b> ${patient.department}</p>

            <p><b>Appointment Date:</b> ${patient.appointmentDate}</p>

            <p><b>Appointment Time:</b> ${patient.appointmentTime}</p>

            <p><b>Token:</b> ${patient.token}</p>

            <p><b>Status:</b> ${patient.status}</p>

            <hr>

            <h2>Doctor Diagnosis</h2>

            <p>
                ${patient.diagnosis || "No Diagnosis"}
            </p>

            <hr>

            <h2>Lab Report</h2>

            <p>
                ${patient.labReport || "No Lab Report"}
            </p>
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
function downloadPDF() {

    let id =
        document.getElementById(
            "reportPatientID"
        ).value;

    db.collection("patients")
    .doc(id)
    .get()

    .then((doc) => {

        if(!doc.exists) {

            alert("Patient not found");
            return;
        }

        let patient = doc.data();

        const { jsPDF } = window.jspdf;

        let pdf = new jsPDF();

        pdf.setFontSize(18);
        pdf.text(
            "SMART OPD SYSTEM",
            20,
            20
        );

        pdf.setFontSize(14);
        pdf.text(
            "Patient Medical Report",
            20,
            30
        );

        pdf.setFontSize(11);

        pdf.text(
            `Patient ID: ${patient.id}`,
            20,
            50
        );

        pdf.text(
            `Name: ${patient.name}`,
            20,
            60
        );

        pdf.text(
            `Age: ${patient.age}`,
            20,
            70
        );

        pdf.text(
            `Phone: ${patient.phone}`,
            20,
            80
        );

        pdf.text(
            `Department: ${patient.department}`,
            20,
            90
        );

        pdf.text(
            `Appointment Date: ${patient.appointmentDate}`,
            20,
            100
        );

        pdf.text(
            `Appointment Time: ${patient.appointmentTime}`,
            20,
            110
        );

        pdf.text(
            `Token: ${patient.token}`,
            20,
            120
        );

        pdf.text(
            `Status: ${patient.status}`,
            20,
            130
        );

        pdf.text(
            `Diagnosis: ${patient.diagnosis || "No Diagnosis"}`,
            20,
            150
        );

        pdf.text(
            `Lab Report: ${patient.labReport || "No Lab Report"}`,
            20,
            170
        );

        pdf.save(
            `${patient.id}_Report.pdf`
        );
    })

    .catch((error) => {

        console.log(error);

    });
}
function sendEmailReport() {

    let id =
        document.getElementById(
            "reportPatientID"
        ).value;

    db.collection("patients")
    .doc(id)
    .get()

    .then((doc) => {

        if(!doc.exists) {

            alert("Patient not found");
            return;
        }

        let patient = doc.data();

        emailjs.send(
            "service_0m3vk4c",
            "template_n3uwtjq",
            {

                to_email:
                    patient.email,

                patient_name:
                    patient.name,

                patient_id:
                    patient.id,

                department:
                    patient.department,

                diagnosis:
                    patient.diagnosis ||
                    "No Diagnosis",

                lab_report:
                    patient.labReport ||
                    "No Lab Report",

                appointment_date:
                    patient.appointmentDate,

                appointment_time:
                    patient.appointmentTime
            }
        )

        .then(() => {

            alert(
                "Email Sent Successfully!"
            );

        })

        .catch((error) => {

            console.log(error);

            alert(
                "Email Sending Failed"
            );
        });

    });
}