function loadQueue() {

    db.collection("patients")
    .where("status", "==", "Waiting")
    .get()

    .then((snapshot) => {

        let html = "";

        snapshot.forEach((doc) => {

            let patient = doc.data();

            html += `

            <div style="
                background:#f1f5f9;
                padding:10px;
                margin-top:10px;
                border-radius:10px;
            ">

                <p><b>Token:</b> ${patient.token}</p>

                <p><b>Name:</b> ${patient.name}</p>

                <p><b>Status:</b> ${patient.status}</p>

            </div>
            `;
        });

        if(html == "") {

            html = "<p>No Waiting Patients</p>";
        }

        document.getElementById(
            "queueList"
        ).innerHTML = html;
    });
}
if(document.getElementById("queueList")) {

    loadQueue();
}