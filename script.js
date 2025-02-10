
// _________________________________________________style________________________________________________________

// toggle menu
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("w-[50vw]");
}
// _________________________________________________basic need________________________________________________________


// print function
const p = data => {
    console.log(data);
}

//select element By Id
const id = data => {
    return document.getElementById(data);
}



// _________________________________________________Peddy Category________________________________________________________



// fetch pet category
const petCatagory = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
    const dataJson = await res.json();
    const data = dataJson.categories;
    // p(data);
    data.forEach(category => {
        createCategory(category)
    });
}


// adding pet category 
const createCategory = (categoryData) => {
    const categoryContainer = id("adoption_category");
    const categoryButton = document.createElement("div");
    // categoryButton.classList.add("adoption-btn");
    categoryButton.innerHTML = `
        <button class="adoption-btn" onclick="showCategorizedPet('${categoryData.category}')">
            <img class="w-[50%] md:w-[37%]" src="${categoryData.category_icon}" alt="">
            <p>${categoryData.category}</p>
        </button>
    `;
    categoryContainer.appendChild(categoryButton);
}

petCatagory();




// _________________________________________________Show all Peddy________________________________________________________





// show all pets
const showAllPet = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
    const dataJson = await res.json();
    const data = dataJson.pets;
    addPet(data);
}
showAllPet();



// show categorized pets
const showCategorizedPet = async (category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const dataJson = await res.json();
    const data = dataJson.data;
    addPet(data);
}



// adding pets 
const addPet = (petData) => {
    const petContainer = id("pet_container");
    const error = id("error_msg");

    if (Object.values(petContainer.classList).includes("hidden")) {
        petContainer.classList.remove("hidden");
    }

    if (!Object.values(error.classList).includes("hidden")) {
        error.classList.add("hidden");
    }

    petContainer.innerHTML = " ";

    if (petData.length !== 0) {
        petData.forEach(pet => {
            // p(pet);
            const petDetails = document.createElement("div");
            petDetails.classList.add("border", "border-text_10", "rounded-xl", "flex-1", "p-[1.2vw]");
            petDetails.innerHTML = `
                            <!-- thumbnail -->
                            <div class="mb-[1.2vw]">
                                <img src="${pet.image}" alt="">
                            </div>
    
                            <!-- Pet Information -->
                            <div>
                                <h1 class="text-text font-extrabold text-[2.5rem] md:text-[1.2rem] mbl:text-[1.7rem]">${pet.pet_name}</h1>
    
                                <div
                                    class="flex flex-col gap-[0.3vw] my-[0.7vw] text-text_60 text-[2rem] mbl:text-[1.3rem] md:text-[1rem]">
                                    <div class="flex gap-[0.6vw]">
                                        <img class="w-[1.2vw]" src="images/Icon Image/Breed.svg" alt="">
                                        <p>Breed: <span>${pet.breed}</span></p>
                                    </div>
                                    <div class="flex gap-[0.6vw]">
                                        <img class="w-[1.2vw]" src="images/Icon Image/Birth.svg" alt="">
                                        <p>Birth: <span>${pet.date_of_birth}</span></p>
                                    </div>
                                    <div class="flex gap-[0.6vw]">
                                        <img class="w-[1.2vw]" src="images/Icon Image/Gender.svg" alt="">
                                        <p>Gender: <span>${pet.gender}</span></p>
                                    </div>
                                    <div class="flex gap-[0.6vw]">
                                        <img class="w-[1.2vw]" src="images/Icon Image/Price.svg" alt="">
                                        <p>Price: <span>${pet.price}</span>$</p>
                                    </div>
                                </div>
                            </div>
    
                            <!-- hr -->
                            <hr class="border border-text_10 my-[3vw] mbl:mb-[0.7vw]">
    
                            <!-- pet card buttons -->
                            <div class="flex justify-between">
                                <button class="peddyCard-button text-text_60 text-[3rem]">
                                    <i class="fa-regular fa-thumbs-up"></i>
                                </button>
                                <button class="peddyCard-button text-theme text-[2.5rem] font-bold">
                                    <p>Adopt</p>
                                </button>
                                <button class="peddyCard-button text-theme text-[2.5rem] font-bold">
                                    <p>Details</p>
                                </button>
                            </div>
            `;
            petContainer.appendChild(petDetails);
        });
    }

    else {
        petContainer.classList.add("hidden");
        error.classList.remove("hidden");
    }
}

// showAllPet();