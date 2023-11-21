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




const projectListContainer = document.querySelector(".project-list-container")

//text för status på inladdningen...
const dynamicText = document.createElement("h2");
dynamicText.classList = "statusMessage_projects";
projectListContainer.appendChild(dynamicText);

dynamicText.innerHTML = `
            <br>
            Laddar projekt . . .           
            <br><br><br>
            `;

// Ladda in Projekt från github
getData();

async function getData() {
    const res = await fetch("https://api.github.com/users/viktorkuddis/repos");
    console.log(res);
    if (res.ok) {

        dynamicText.innerHTML = "";

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

        //Rendera ut projekt i PORTFOLIO som kort!
        data.forEach(function (repo, i) {
            console.log(repo.name);
            console.log(repo.description);
            console.log(repo.created_at);
            // SKapar projektkort
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");

            // Skapar bildcontainer och hämtar bild
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("project-img-container");
            const img = document.createElement("img");
            img.setAttribute("src", `${repo.homepage}/images/og-image.jpg`);
            img.setAttribute("alt", "projekt");
            imgContainer.appendChild(img);

            // Skapar textkontainer och hämtar rubrik och beskrivning av projektet. Ersätter alla understreck i rubriken med mellanslag.
            const textcontainer = document.createElement("div");
            textcontainer.classList.add("card-text-container");
            textcontainer.appendChild(document.createElement("h2")).innerText = repo.name.replaceAll("_", " ");
            textcontainer.appendChild(document.createElement("p")).innerText = repo.description;

            //läggertill projektbild och projekttext i projektorter
            projectCard.appendChild(imgContainer);
            projectCard.appendChild(textcontainer);
            // console.log(projectCard);

            //rendera projektkortet ut på sidan
            projectListContainer.appendChild(projectCard);

            // MODAL
            // Adderar eventlyssnare som ska trigga modal(detta sätts för varje projektkort).
            projectCard.addEventListener("click", toggleModal);

            // Adderar eventlyssnare som fyller modalen med text baserat på det aktuella elementet:
            projectCard.addEventListener("click", function () {
                modalHeadding.textContent = repo.name.replaceAll("_", " ");
                modalText.textContent = repo.description;
                projectGitRepoLink.setAttribute("href", repo.html_url);
                projectGitPagesLink.setAttribute("href", repo.homepage);
            })

        });




    } else {

        let mess = await res.text();
        console.log(`Fel vid fetch. ${res.status} -  ${res.statusText} - ${mess}`)

        dynamicText.innerHTML = `
                    <br> 
                    Hoppsan!
                    <br> 
                    Något gick visst fel! 
                    <br><br>
                    ${res.status}
                    <br><br>
                    `;
    }

}