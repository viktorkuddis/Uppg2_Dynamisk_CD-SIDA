const themeBtn = document.getElementById("themeBtn");
const bodyTagg = document.querySelector("body");

//Hämtar info om sparat tema:
let theme = localStorage.getItem("theme_Cv-sida_2962");
//om dark, lägg till dark-klassen på hela bodyn
if (theme == "dark") bodyTagg.classList.add("dark_theme");


themeBtn.addEventListener("click", function () {
    console.log("themeknapp klickad");

    //om theme redan är inställt till dark så ta bort darkklassen och sätt theme till default.
    //Annars, tvärtom 
    if (theme == "dark") {
        bodyTagg.classList.remove("dark_theme");
        theme = "default";

    } else {
        bodyTagg.classList.add("dark_theme");
        theme = "dark";

    }

    //Skriv det nya värdet på theme till localStorage
    localStorage.setItem("theme_Cv-sida_2962", theme)
})

