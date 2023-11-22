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

        let cardIndexCounder = 0; // Anger vilket kort i domen jag ska skicka in information i. Uppdateras i slutet på ifsatsen. dvs om information lyckats renderas. Annars görs nytt försök med samma kort fast med nästa repo från apit

        //Rendera ut innehåll i korten:
        for (let i = 0; i <= data.length; i++) {
            //om mitt repos topic innehåller "to-cv-sida" så tillåts det repot att renderas ut på sidan.
            /* ((i!)topics kan sättas via repositoiets Githubsida under inställningar, kugghjulet "Edit repository details".)  */
            if (data[i].topics.includes("to-cv-sida")) {
                const projectCard = document.getElementById(`projectCard-${cardIndexCounder}`);
                const projectHeadding = document.getElementById(`projectHeadding-${cardIndexCounder}`);
                const projectBtn = document.getElementById(`projectBtn-${cardIndexCounder}`)

                projectCard.setAttribute("src", `${data[i].homepage}/images/og-image.jpg`);
                projectCard.setAttribute("alt", "");
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
                });

                cardIndexCounder++;

            }

        }




    } else {

        let mess = await res.text();
        console.log(`Fel vid fetch. ${res.status} -  ${res.statusText} - ${mess}`)

        dynamicText.innerHTML = `<p>Hoppsan! Gick inte att ladda in senaste projekten. ${res.status}</p>`;
    }

}