const gallery = document.getElementById("gallery");
console.log(gallery);
const container = document.getElementById("container");
console.log(container);
const card = document.getElementsByClassName("card");
console.log(card);
let employee;
//addUserToGallery(): To add random users to the gallery
function addUserToGallery(image, firstName, lastName, email, city, state) {

  const userCard = document.createElement("div");
  userCard.className = "card";
  gallery.appendChild(userCard);
  userCard.insertAdjacentHTML(
    `beforeend`,
    `   
      <div class="card-img-container">
         <img class="card-img" src="${image}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${firstName},${lastName}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city},${state}</p>
      </div>
    
  
    `
  );

}

//createModal(): To create more information /modal window of the selected user
function createModal(img,firstname,lastname,email, city, phone, address,birthday) 
{
  
  const  modalContainer= document.createElement("div");
  modalContainer.className = "modal-container";
  container.appendChild(modalContainer);
  const modal = document.createElement("div");
  modal.className = "modal";
  modalContainer.appendChild(modal);
  const closeButton = document.createElement("button");
  closeButton.className = "modal-close-btn";
  closeButton.type = "button";
  closeButton.id = "modal-close-btn";
  const X = document.createElement("strong");
  X.insertAdjacentHTML("beforeend", "X");
  closeButton.appendChild(X);
  modal.appendChild(closeButton);
  closeButton.addEventListener(
    "click",
    () => (modalContainer.style.display = "none")
  );
  modal.insertAdjacentHTML(
    `beforeend`,
    `
    
    <div class="modal-info-container">
        <img class="modal-img" src="${img}" alt="profile picture">
        <h3 id="name" class="modal-name cap">${firstname} ${lastname}</h3>
        <p class="modal-text">${email}</p>
        <p class="modal-text cap">${city}</p>
        <hr>
        <p class="modal-text">${phone}</p>
        <p class="modal-text">${address}</p>
        <p class="modal-text">Birthday: ${birthday}</p>
    </div>
`
  );
}

//openModel(): To display more detailed information about the user  on clicking on user name or image

function openModel() {
  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener("click", () => {
      let image = employee[i].picture.large;
      let firstName = employee[i].name.first;
      let lastName = employee[i].name.last;
      let email = employee[i].email;
      let city = employee[i].location.city;
      let phone = employee[i].cell;
      let address = `
        ${employee[i].location.street.number}
        ${employee[i].location.street.name}, 
        ${city}, 
        ${employee[i].location.state} 
        ${employee[i].location.postcode}
        `;
      let b=employee[i].dob.date;
      console.log(b);
      let dob = b.slice(0, 10); // <----- slice off time from dob
      console.log(dob)
      let splitstr = dob.split(""); //split to array
      let birthDate = `${splitstr[5]}${splitstr[6]}${splitstr[4]}${splitstr[8]}${splitstr[9]}${splitstr[7]}${splitstr[0]}${splitstr[1]}${splitstr[2]}${splitstr[3]}`; 
     
      createModal(image,firstName,lastName,email,city,phone,address,birthDate);
    });
  }
}


fetch("https://randomuser.me/api/?results=12&nat=us")
  .then((res) => res.json())
  .then((data) => {
    employee = data.results;
    console.log(employee);
    employee.map((result) => {
      let image = result.picture.large;
      let firstName = result.name.first;
      let lastName = result.name.last;
      let email = result.email;
      let city = result.location.city;
      let state = result.location.state;
      console.log("before add user to gallery function");
      addUserToGallery(image, firstName, lastName, email, city, state);
    });
  })
  .then(() => openModel())
  .then()
  .catch((err) => Error(err));
