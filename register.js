let count = 1;

function registerPatient() {

    let name =
        document.getElementById("name").value;

    let age =
        document.getElementById("age").value;

    let phone =
        document.getElementById("phone").value;

    let email =
        document.getElementById("email").value;

    let appointmentDate =
        document.getElementById("appointmentDate").value;

    let appointmentTime =
        document.getElementById("appointmentTime").value;

    let department =
        document.getElementById("department").value;

    let patientID =
        "PAT" + count;

    let token =
        "A" + Math.floor(Math.random() * 1000);

    let patientData = {

        id: patientID,

        name: name,

        age: age,

        phone: phone,

        email: email,

        appointmentDate: appointmentDate,

        appointmentTime: appointmentTime,

        department: department,

        token: token,

        status: "Waiting"
    };


    // ================= SAVE TO FIREBASE =================

    db.collection("patients")
    .doc(patientID)
    .set(patientData)

    .then(() => {

        alert(

            "Patient Registered Successfully"
        );


        // ================= WHATSAPP MESSAGE =================

        fetch(

            "http://localhost:3000/send-whatsapp",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"
                },

                body: JSON.stringify({

                    phone: phone,

                    name: name,

                    department: department,

                    date: appointmentDate,

                    time: appointmentTime,

                    token: token
                })
            }
        )

        .then((response) => response.json())

        .then((data) => {

            console.log(

                "WhatsApp Sent",
                data
            );
        })

        .catch((error) => {

            console.log(error);
        });


        count++;

    })

    .catch((error) => {

        console.log(error);

    });
}

