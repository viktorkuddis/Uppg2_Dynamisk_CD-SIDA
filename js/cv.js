console.log("hej");


const schoolCards_container = document.querySelector(".school-cards-container");
const experienceCard_container = document.querySelector(".experience-card-container");



getData();
async function getData() {
    //hämtar filen
    const res = await fetch("./cv.json");
    console.log(res);

    if (res.ok == true) {
        //konverterar från json till ett objekt
        const data = await res.json();
        console.log(data);

        //
        // R E N D E R A R   U T B I L D N I N G A R :
        //

        //för varje utbildning som finns....
        data.utbildningar.forEach(function (education) {
            // console.log(education);

            //kollar om utbildningen är pågående. Fyller isf variabeln educationStatusBlock med info om det.
            let educationStatusBlock = ""
            if (education.status == "Pågående") {
                educationStatusBlock = "<p>Pågående</p>"
            };

            //lägger till Html i schoolCards-containern baserat på varje utbildnings individuella information
            schoolCards_container.innerHTML += ` 
                    <div class="school">
                    <div class="school-icon ${education.icon}-icon"></div>
                    <div class="school-text">
                        <h3>${education.skola}</h3>
                        <p>${education.inriktning}</p>
                        ${educationStatusBlock}
                    </div>
                    </div>`;

        });


        //
        // R E N D E R A R   E R F A R E N H E T :
        // 


        data.arbetslivserfarenhet.forEach(function (experience) {
            // console.log(experience);

            //Skapar dynamiska delar för template strings
            const imgPrefix = experience.imgPrefix;
            const imgAltText = experience.imgAltText;

            // Skapar Card för arbetsplatsen
            const exCard = document.createElement("div")
            exCard.classList.add("experience-card");
            // console.log(exCard)

            // Skapar HeaddingElementet
            const headding = document.createElement("h3");
            headding.innerHTML =
                `
                <img class="logo-mobile" src="images/${imgPrefix}logo-mobile.jpg" alt="${imgAltText}">
                <img class="logo-desktop" src="images/${imgPrefix}logo-desktop.jpg" alt="${imgAltText}">
                `;
            // console.log(headding);


            //Lägger till headdingelementet i kortet samt ett P-element med beskrivning taget från json
            exCard.appendChild(headding);
            exCard.appendChild(document.createElement('p')).textContent = experience.beskrivning;
            // console.log(exCard);

            // Rendera Arbetsplatsen(kortet) ut på sidan:
            experienceCard_container.appendChild(exCard);

        })









    } else {
        console.error("fel vid inladdning av JSON: ", res.status, res.statusText);
    }


};



