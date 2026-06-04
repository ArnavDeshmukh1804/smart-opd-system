function loadAnalytics() {

    let total = 0;
    let waiting = 0;
    let completed = 0;

    db.collection("patients")
    .get()

    .then((snapshot) => {

        total = snapshot.size;

        snapshot.forEach((doc) => {

            let patient = doc.data();

            if(patient.status == "Waiting") {

                waiting++;
            }

            if(patient.status == "Lab Completed") {

                completed++;
            }
        });

        document.getElementById(
            "totalPatients"
        ).innerText = total;

        document.getElementById(
            "waitingPatients"
        ).innerText = waiting;

        document.getElementById(
            "completedPatients"
        ).innerText = completed;
    });
}

// AUTO LOAD ANALYTICS

if(document.getElementById("totalPatients")) {

    loadAnalytics();
}