let displayExperience;
displayExperience = "Experience";

function changeButtonToClicked(id, id2) {
    let elem1 = document.getElementById(id);
    let elem2 = document.getElementById(id2);

    if (elem1.classList.contains("text-primary-emphasis")) {

        elem1.classList.add("text-secondary-emphasis");
        elem1.classList.add("bg-secondary-subtle");
        elem1.classList.add("border-secondary-subtle")

        elem1.classList.remove("text-primary-emphasis");
        elem1.classList.remove("bg-primary-subtle");
        elem1.classList.remove("border-primary-subtle");

        elem2.classList.add("text-primary-emphasis");
        elem2.classList.add("bg-primary-subtle");
        elem2.classList.add("border-primary-subtle");


        elem2.classList.remove("text-secondary-emphasis");
        elem2.classList.remove("bg-secondary-subtle");
        elem2.classList.remove("border-secondary-subtle");

        displayExperience = elem1.innerHTML;
    }
    let elem_exp_history = document.getElementById("div-experience-history");
    let elem_hist_history = document.getElementById("div-education-history");

    if (displayExperience.trim()=="Experience"){
        elem_exp_history.style.display = "";
        elem_hist_history.style.display = "none";
    }
    else{
        elem_exp_history.style.display = "none";
        elem_hist_history.style.display = "";
    }
}