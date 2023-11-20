


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


        data.forEach(function (repo) {
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
            imgContainer.appendChild(img);

            // Skapar textkontainer och hämtar rubrik och beskrivning av projektet. Ersätter alla understreck i rubriken med mellanslag.
            const textcontainer = document.createElement("div");
            textcontainer.classList.add("card-text-container");
            textcontainer.appendChild(document.createElement("h2")).innerText = repo.name.replaceAll("_", " ");
            textcontainer.appendChild(document.createElement("p")).innerText = repo.description;



            //läggertill projektbild och projekttext i projektorter
            projectCard.appendChild(imgContainer);
            projectCard.appendChild(textcontainer);

            console.log(projectCard);

            //rendera projektkortet ut på sidan

            projectListContainer.appendChild(projectCard);

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

        ;

    }

}