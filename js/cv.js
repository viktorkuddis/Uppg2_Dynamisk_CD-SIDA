console.log("hej");


const schoolCards_container = document.querySelector(".school-cards-container");



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
        // R E N D E R A R   U T B I L D N I N G A R:
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

    } else {
        console.error("fel vid inladdning av JSON: ", res.status, res.statusText);
    }






};



