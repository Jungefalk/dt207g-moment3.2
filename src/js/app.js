
/**
 * Åeranvänd JavaScript kod från moment 2.
 */


//Hämta id:n
let workExperienceEl = document.getElementById("work_experience");
let companyNameEl = document.getElementById("company_name");
let jobTitleEl = document.getElementById("job_title");
let locationEl = document.getElementById("location");
let startDateEl = document.getElementById("start_date")
let endDateEl = document.getElementById("end_date");
let descriptionEl = document.getElementById("description");
let buttonEl = document.getElementById("submitButton");
let errorMessageEl = document.getElementById("errorMessage");

//Händelselyssnare
window.addEventListener("load", init);
buttonEl.addEventListener("click", function (event) {
    event.preventDefault();
    postData();
});

//Init
function init() {

    getData();
};


//Hämta data och anropa funktion som läser ut till skärmen
async function getData() {

    try {
        const response = await fetch(`https://dt207g-moment3-1.onrender.com/work_experience`)
        if (!response.ok) {
            throw new Error("Fel vid anslutning: " + response.status);
        }

        //lagra data i variabel
        const data = await response.json();

        //Anropa funktion
        readData(data);

    } catch (error) {
        console.error("Ett fel uppstod " + error.message);
    }

}

//Läs ut data
function readData(data) {

    //loopa datan
    for (let i = 0; i < data.length; i++) {

        //Skapa nytt article elelemnt och läs ut i innerHTML
        let newArticleEl = document.createElement("article");
        newArticleEl.innerHTML = `<h3>Arbetsplats:</h3>
        <p>${data[i].company_name}</p>
        <h3>Jobbtitel:</h3>
        <p>${data[i].job_title}</p>
        <h3>Adress:</h3>
        <p>${data[i].location}</p>
        <h3>Startdatum:</h3>
        <p>${data[i].start_date}</p>
        <h3>Slutdatum:</h3>
        <p>${data[i].end_date}</p>
        <h3>Arbetsbeskrivning:</h3>
        <p>${data[i].description}</p>
        <button>Ta bort</button>
`;
        workExperienceEl.appendChild(newArticleEl);

        //Hämta knapp
        let deleteButtonEl = newArticleEl.querySelector("button")
        //Lagra id
        let workExperienceId = data[i]._id

        //Skicka med id vid klick på knapp till deteleData
        deleteButtonEl.addEventListener("click", function () {
            deleteData(workExperienceId)
        })
    };
};

//Posta data
async function postData() {

    //Töm felmeddelande
    errorMessageEl.innerHTML = "";

    //kontrollera att inputfälten inte är tomma

    if (companyNameEl.value === "" || jobTitleEl.value === "" || locationEl.value === "" || startDateEl.value === "" || endDateEl.value === "" || descriptionEl.value === "") {
        let errorMessage = document.createElement("p");
        let errorText = document.createTextNode("Du behöver fylla i samtliga fält");
        errorMessage.appendChild(errorText);
        errorMessageEl.appendChild(errorMessage);
    };

    //Lagra värden från inputfält
    let newExpreience = {
        company_name: companyNameEl.value,
        job_title: jobTitleEl.value,
        location: locationEl.value,
        start_date: startDateEl.value,
        end_date: endDateEl.value,
        description: descriptionEl.value
    };

    //Töm inputfält
    companyNameEl.value = "";
    jobTitleEl.value = "";
    locationEl.value = "";
    startDateEl.value = "";
    endDateEl.value = "";
    descriptionEl.value = "";


    //Postanrop
    try {
        const response = await fetch(`https://dt207g-moment3-1.onrender.com/work_experience`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newExpreience)
        });
        if (!response.ok) {
            throw new Error("Fel vid anslutning: " + response.status);
        }

        const result = await response.json();
        getData();



    } catch (error) {
        console.error("Det uppstod ett fel: " + error.message);
    };

};

//Ta bort data med DELETE anrop
async function deleteData(_id) {
    try {
        const response = await fetch(`https://dt207g-moment3-1.onrender.com/work_experience/${_id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error("Fel vid anslutning: " + response.status);
        }

        const result = await response.json();

        //Ladda om sidan
        location.reload();

    } catch (error) {
        console.error("Det uppstod ett fel: " + error.message)
    }

}