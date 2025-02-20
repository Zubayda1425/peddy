// loading
const toggleLoading = (isLoading) => {
    const loading = document.getElementById('loading_spin');
    const peddy = id("peddy_container");
    if (isLoading) {
        loading.classList.remove('hidden');
        peddy.classList.add("hidden");
    }
    else {
        loading.classList.add('hidden');
        peddy.classList.remove("hidden");
    }
};


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

    // document.getElementById("sort_by_price").addEventListener("click", function () {
    //     toggleLoading(true);
    //     setTimeout(async () => {
    //         sortByPrice(data);
    //         toggleLoading(false);
    //     }, 1000);
    // });

    document.getElementById("sort_by_price").addEventListener("click", function () {


        sortByPrice(data);


    });
    addPet(data);
}
showAllPet();



// show categorized pets
const showCategorizedPet = (category) => {
    toggleLoading(true);
    setTimeout(async () => {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
        const dataJson = await res.json();
        const data = dataJson.data;
        toggleLoading(false);
        document.getElementById("sort_by_price").addEventListener("click", function () {
            sortByPrice(data);
        });
        addPet(data);
    }, 1000)


    // const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    // const dataJson = await res.json();
    // const data = dataJson.data;

    // document.getElementById("sort_by_price").addEventListener("click", function () {
    //     sortByPrice(data);
    // });
    // addPet(data);
}


//sort by price 
const sortByPrice = (data) => {
    toggleLoading(true);
    setTimeout(() => {
        toggleLoading(false);
        let price = [];
        let sortedData = [];


        data.forEach(pet => {
            if (!price.includes(pet.price)) {
                price.push(pet.price);
            }
        });

        price.sort(function (a, b) {
            return b - a
        });


        price.forEach(petPrice => {
            data.forEach(pet => {
                if (pet.price === petPrice) {
                    sortedData.push(pet);
                }
            })
        })

        // p(sortedData);
        addPet(sortedData);
    }, 1000);
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
                                <img src="${pet?.image || ' Not Available'}" alt="">
                            </div>
    
                            <!-- Pet Information -->
                            <div>
                                <h1 class="text-text font-extrabold text-[2.5rem] md:text-[1.2rem] mbl:text-[1.7rem]">${pet?.pet_name || ' Not Available'}</h1>
    
                                <div
                                    class="flex flex-col gap-[0.3vw] my-[0.7vw] text-text_60 text-[2rem] mbl:text-[1.3rem] md:text-[1rem]">
                                    <div class="flex gap-[0.6vw]">
                                        <img class="w-[1.2vw]" src="images/Icon Image/Breed.svg" alt="">
                                        <p>Breed: <span>${pet?.breed || ' Not Available'}</span></p>
                                    </div>
                                    <div class="flex gap-[0.6vw]">
                                        <img class="w-[1.2vw]" src="images/Icon Image/Birth.svg" alt="">
                                        <p>Birth: <span>${pet?.date_of_birth || ' Not Available'}</span></p>
                                    </div>
                                    <div class="flex gap-[0.6vw]">
                                        <img class="w-[1.2vw]" src="images/Icon Image/Gender.svg" alt="">
                                        <p>Gender: <span>${pet?.gender || ' Not Available'}</span></p>
                                    </div>
                                    <div class="flex gap-[0.6vw]">
                                        <img class="w-[1.2vw]" src="images/Icon Image/Price.svg" alt="">
                                        <p>Price: <span>${pet?.price || ' 00'}</span>$</p>
                                    </div>
                                </div>
                            </div>
    
                            <!-- hr -->
                            <hr class="border border-text_10 my-[3vw] mbl:mb-[0.7vw]">
    
                            <!-- pet card buttons -->
                            <div class="flex justify-between">
                                <button class="peddyCard-button text-text_60 text-[3rem] hover:bg-theme hover:text-white hover:border-0  mbl:text-[1.2rem] " id="like" onclick="showThumbnail('${pet.image}')">
                                    <i class="fa-regular fa-thumbs-up"></i>
                                </button>
                                <button onclick="adoptionModal(${pet.petId})" class="peddyCard-button text-theme text-[2.5rem] font-bold hover:bg-theme hover:text-white hover:border-0  mbl:text-[1.2rem] " id="${pet.petId}" >  
                                    <p  >Adopt</p>
                                </button>
                                <button class="peddyCard-button text-theme text-[2.5rem] font-bold hover:bg-theme hover:text-white hover:border-0  mbl:text-[1.2rem] " id="details">
                                    <p onclick="showDetailModal('${pet.image}' , '${pet.pet_name}', '${pet.breed}', '${pet.date_of_birth}', '${pet.gender}', '${pet.price}', '${pet.vaccinated_status}')">Details</p>
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



//show thumbnail 
const showThumbnail = (petImage) => {
    p(petImage);
    const likedDiv = id("likedPet");

    likedDiv.classList.remove("hidden");

    const img = document.createElement("img");
    img.src = petImage;
    likedDiv.appendChild(img);
}



// _________________________________________________Modals________________________________________________________



// show details modal
const showDetailModal = (image, pet_name, breed, date_of_birth, gender, price, vaccinated_status) => {
    const pet_details = id("pet_details_modal");
    pet_details.classList.replace("hidden", "block");
    pet_details.innerHTML = `
            <!-- thumbnail -->
            <div class=" h-fit w-full">
                <img class="rounded-xl size-[100%]" src="${image}" alt="">
            </div>

            <!-- Pet Info -->
            <div class="">
                <h1 class="text-text mbl:text-[1.5rem] text-[2.5rem] py-[0.8vw] font-extrabold">${pet_name}</h1>

                <div class="text-text_70 grid grid-cols-2 text-[1.6rem] mbl:text-[1rem]">

                    <div class="detailsModal">
                        <img class="w-[1.2vw]" src="images/Icon Image/Breed.svg" alt="">
                        <p>Breed: <span>${breed || ' Not Available'}</span></p>
                    </div>
                    <div class="detailsModal">
                        <img class="w-[1.2vw]" src="images/Icon Image/Birth.svg" alt="">
                        <p>Birth: <span>${date_of_birth || ' Not Available'}</span></p>
                    </div>
                    <div class="detailsModal">
                        <img class="w-[1.2vw]" src="images/Icon Image/Gender.svg" alt="">
                        <p>Gender: <span>${gender || ' Not Available'}</span></p>
                    </div>
                    <div class="detailsModal">
                        <img class="w-[1.2vw]" src="images/Icon Image/Price.svg" alt="">
                        <p>Price: <span>${price || ' 00'}</span>$</p>
                    </div>

                    <div class="detailsModal">
                        <img class="w-[1.2vw]" src="images/Icon Image/Gender.svg" alt="">
                        <p>Vaccinated status: <span>${vaccinated_status || ' Not Available'}</span></p>
                    </div>
                </div>
            </div>

            <!-- hr -->
            <div class="py-[1vw]">
                <hr class="border border-text_10">
            </div>

            <!-- pet details -->
            <div class="pb-[1vw]">
                <h1 class="text-text font-bold pb-[1vw] text-[1.8rem] mbl:text-[1.2rem]">
                    Details Information
                </h1>
                <p class="text-text_70 text-[1.6rem] mbl:text-[1rem]">
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when
                    looking at its layout. The point of using is that it has a more-or-less normal distribution of
                    letters, as opposed to
                    using.
                </p>

            </div>

            <!-- cancel btn -->
            <button
                class="border-[0.2vw] border-theme_10 bg-theme_15 w-[100%] text-theme font-bold text-[1.8rem] mbl:text-[1.2rem] py-[0.7vw] rounded-xl"
                id="close_modal">
                Cancel
            </button>
    `;
    pet_details.showModal();
    document.getElementById("close_modal").addEventListener("click", () => {
        pet_details.close();
        pet_details.classList.replace("block", "hidden");
    });
};



// coundown modal
const adoptionModal = (idNum) => {

    const adoptionBtn = id(idNum); // alhamdulillah ___ a big achievement <3 

    const adoption = id("adoption_modal");
    adoption.classList.replace("hidden", "block");
    adoption.showModal();

    const three = id("three");
    const two = id("two");
    const one = id("one");



    // setTimeout(() => { timmer(three) }, 1000);

    three.classList.replace("hidden", "block");// 1: h// 2:h// 3:block//
    setTimeout(() => {
        // one.classList.replace("hidden");
        three.classList.replace("block", "hidden");
        two.classList.replace("hidden", "block");
    }, 1000);// 1: h// 2:block// 3:h//
    setTimeout(() => {
        one.classList.replace("hidden", "block");
        two.classList.replace("block", "hidden");

        setTimeout(() => {
            adoption.classList.replace("block", "hidden");
            adoption.close();
            three.classList.replace("hidden", "block");
            one.classList.replace("block", "hidden");

            p("dbfgvkbdfkgvbasdrhgb");

            p(adoptionBtn);
            // adoptionBtn.classList.add("pointer-events-none");
            // document.adoptionBtn.createAttribute("disabled");
            adoptionBtn.setAttribute("disabled", true);
            adoptionBtn.classList.replace("text-theme", "text-text_60");
            adoptionBtn.classList.replace("mbl:text-[1.2rem]", "mbl:text-[1rem]");
            adoptionBtn.classList.add("cursor-not-allowed");
            adoptionBtn.classList.remove("hover:bg-theme", "hover:text-white", "hover:border-0");
            adoptionBtn.innerText = `Adopted`;


        }, 1000);
    }, 2000);// 1:block// 2:h// 3:h//



}





