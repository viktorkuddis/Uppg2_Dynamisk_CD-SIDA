console.log("hej")

getData();

async function getData() {
    const res = await fetch("https://api.github.com/users/viktorkuddis/repos");
    console.log(res);
    if (res.ok) {
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
            img.innerHTML = "Bildbildbild"
            imgContainer.appendChild(img);

            // Skapar textkontainer och hämtar rubrik och beskrivning av projektet.
            const textcontainer = document.createElement("div");
            textcontainer.classList.add("card-text-container");
            textcontainer.appendChild(document.createElement("h2")).innerText = repo.name;
            textcontainer.appendChild(document.createElement("p")).innerText = repo.description;



            //läggertill projektbild och projekttext i projektorter
            projectCard.appendChild(imgContainer);
            projectCard.appendChild(textcontainer);

            console.log(projectCard);

            //rendera projektkortet ut på sidan

            document.querySelector(".project-list-container").appendChild(projectCard);

        });






















    } else {
        console.log(`Fel vid fetch. ${res.status} ${res.statusText}`)
    }

}