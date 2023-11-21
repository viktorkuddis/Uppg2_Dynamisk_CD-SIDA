/* 
 Denna filen innehåller api call för att hämta githubrepon och rendera ut det på sidan. Samt även den färdiga modal - lösningen.
 */




// - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - -
// MODAL START

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
const modalHeadding = document.getElementById("modalHeadding");
const modalText = document.getElementById("modalText");
const projectGitRepoLink = document.querySelector(".projectGitRepoLink");
const projectGitPagesLink = document.querySelector(".projectGitPagesLink");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

// MODAL END
// - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - -




//text för status på inladdningen...
const dynamicText = document.getElementById("dynamicText");
dynamicText.innerHTML = "Laddar senaste projekt ... ";


// Ladda in Projekt från github
getData();

async function getData() {
    const res = await fetch("https://api.github.com/users/viktorkuddis/repos");
    console.log(res);
    if (res.ok) {

        dynamicText.innerHTML = "Senaste projekt";

        const data = await res.json();

        //Sorterar arrayen efter när projektet skapades eftersom json kommer i bokstavsordning:
        data.sort(function (a, b) {
            if (a.created_at > b.created_at) {
                return -1;
            } else if (a.created_at < b.created_at) {
                return 1;
            } else {
                return 0;
            }
        });
        console.log(data);

        //Rendera ut innehåll i korte,:
        for (let i = 0; i < 4; i++) {
            const projectCard = document.getElementById(`projectCard-${i}`);
            const projectHeadding = document.getElementById(`projectHeadding-${i}`);
            const projectBtn = document.getElementById(`projectBtn-${i}`)

            projectCard.setAttribute("src", `${data[i].homepage}/images/og-image.jpg`);
            projectHeadding.textContent = data[i].name.replaceAll("_", " ");

            // MODAL
            // Adderar eventlyssnare som ska trigga modal(detta sätts för varje projektkort).
            projectBtn.addEventListener("click", toggleModal);

            // Adderar eventlyssnare som fyller modalen med text baserat på det aktuella elementet:
            projectBtn.addEventListener("click", function () {
                modalHeadding.textContent = data[i].name.replaceAll("_", " ");
                modalText.textContent = data[i].description;
                projectGitRepoLink.setAttribute("href", data[i].html_url);
                projectGitPagesLink.setAttribute("href", data[i].homepage);
            })

        }




    } else {

        let mess = await res.text();
        console.log(`Fel vid fetch. ${res.status} -  ${res.statusText} - ${mess}`)

        dynamicText.innerHTML = `<p>Hoppsan! Gick inteatt ladda in senaste projekten. ${res.status}</p>`;
    }

}