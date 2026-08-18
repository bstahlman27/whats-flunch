const genBtn = document.getElementById("genBtn");
const roller = document.getElementById("roller");
const title = document.getElementById("title")
const previousPlace = document.getElementById("previousPlace");
const selectedPlace = document.getElementById("selectedPlace");
const nextPlace = document.getElementById("nextPlace");
const selectionImage = document.getElementById("selectionImage");

const places = [
    {
        name: "Bojangles",
        image: "images/bojangles.png"
    },
    {
        name: "Chili's",
        image: "images/chilis.png"
    },
    {
        name: "Carver's",
        image: "images/culvers.png"
    },
    {
        name: "High Five",
        image: "images/fiveguys.png"
    },
    {
        name: "Zaxby's",
        image: "images/zaxbys.png"
    },
    {
        name: "Jersey Mike's",
        image: "images/jerseymikes.png"
    },
    {
        name: "Smithfield's",
        image: "images/smithfields.png"
    },
    {
        name: "Bdubs",
        image: "images/bdubs.png"
    },
    {
        name: "Mexican",
        image: "images/mexican.jpg"
    },
    {
        name: "Apex Diner",
        image: "images/apexdiner.png"
    },
    {
        name: "IHOP",
        image: "images/ihop.png"
    },
    {
        name: "McAlister's",
        image: "images/mcalisters.png"
    },
    {
        name: "Freddy's",
        image: "images/freddys.png"
    },
    {
        name: "Arby's",
        image: "images/arbys.jpeg"
    },
];

let isRolling = false;

function shufflePlaces() {
    const shuffled = [...places];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function getPlaceAt(list, index) {
    return list[(index + list.length) % list.length];
}

function showSlots(list, centerIndex) {
    previousPlace.textContent = getPlaceAt(list, centerIndex - 1).name;
    selectedPlace.textContent = getPlaceAt(list, centerIndex).name;
    nextPlace.textContent = getPlaceAt(list, centerIndex + 1).name;
}

function showSelectedImage(place) {
    selectionImage.src = place.image;
    selectionImage.alt = place.name;
    selectionImage.style.display = "block";
}

function rollLunch() {
    if (isRolling) {
        return;
    }

    isRolling = true;
    genBtn.disabled = true;
    genBtn.textContent = "Rolling...";
    title.textContent = "Today's lunch is...";
    roller.classList.remove("is-hidden");
    roller.classList.remove("is-settled");
    selectionImage.style.display = "none";

    const shuffled = shufflePlaces();
    const totalSteps = 28 + Math.floor(Math.random() * places.length);
    let step = 0;

    function rollStep() {
        showSlots(shuffled, step);

        if (step >= totalSteps) {
            const selected = getPlaceAt(shuffled, step);
            roller.classList.add("is-settled");
            showSelectedImage(selected);

            genBtn.disabled = false;
            genBtn.textContent = "No I want something else";
            isRolling = false;
            return;
        }

        step++;

        const progress = step / totalSteps;
        const delay = 45 + progress * progress * 260;
        setTimeout(rollStep, delay);
    }

    rollStep();
}

showSlots(places, 0);
genBtn.addEventListener("click", rollLunch);
