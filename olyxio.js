const testimonialsData = async () => {
  await fetch("testimonials.json")
    .then((response) => response.json())
    .then((data) => {
      const testimonials = data["users"];
      testimonials.forEach((element) => {
        const parent = document.getElementsByClassName("sayings")[0];
        const div1 = document.createElement("div");
        div1.setAttribute("class", "saying-block");
        div1.innerHTML = `
        <div class="saying-image">
            <img
            src="${element.image}"
            alt="jack"
            width="15%"
            />
            <div class="name">
            <h6>${element.name}</h6>
            <p>${element.title}</p>
            </div>
        </div>
        <div class="saying-content">
            <p>
            ${element.description}
            </p>
        </div>
    `;
        parent.appendChild(div1);
      });
    });
};
testimonialsData();

function openNav() {
  document.getElementById("sidenav").style.width = "350px";
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}

const navbarItems = async () => {
  await fetch("sidenav.json")
    .then((response) => response.json())
    .then((data) => {
      const menuItem = data["sidenav"];
      menuItem.forEach((element) => {
        const icon = document.createElement("i");
        // icon.setAttribute("id", "icon");
        icon.setAttribute("class", "fa fa-angle-down");
        const parent = document.getElementById("dropdown");
        if (element.subMenu) {
          const mainMenu = document.createElement("a");
          mainMenu.setAttribute("class", "dropbtn");
          mainMenu.setAttribute("onclick", "dropDown(this)");
          mainMenu.href = "#";
          mainMenu.innerHTML = `${element.mainMenu}`;
          parent.appendChild(mainMenu);
          mainMenu.appendChild(icon);
          const dropdownContent = document.createElement("div");
          dropdownContent.setAttribute("class", "dropdown-content");
          dropdownContent.style.display = "none";
          element.subMenu.forEach((item) => {
            const dropdownItems = document.createElement("a");
            dropdownItems.setAttribute("class", "dropdown-items");
            dropdownItems.innerHTML = `${item.name}`;
            dropdownItems.href = `${item.link}`;
            dropdownContent.appendChild(dropdownItems);
            parent.appendChild(dropdownContent);
          });
        } else {
          const mainMenuAnchor = document.createElement("a");
          mainMenuAnchor.setAttribute("class", "lastAnchor");
          mainMenuAnchor.innerHTML = `${element.mainMenu}`;
          mainMenuAnchor.href = `${element.link}`;
          parent.appendChild(mainMenuAnchor);
        }
      });
    });
};
navbarItems();
function dropDown(anchor) {
  anchor.classList.toggle("active");
  const dropDownContent = anchor.nextElementSibling;
  if (dropDownContent.style.display === "none") {
    dropDownContent.style.display = "block";
    anchor.style.color = "#e7a136";
  } else {
    dropDownContent.style.display = "none";
    anchor.style.color = "#797979";
  }
}

const regions = async () => {
  await fetch("locations.json")
    .then((response) => response.json())
    .then((data) => {
      const locations = data["location"];
      generateSubContinents(locations);
      continentAddress(data)
    });
};
regions();

function generateSubContinents(locations) {
  // const locations = data["location"];
  locations.forEach((element) => {
    const parent = document.querySelector(".region");
    const subContinent = document.createElement("a");
    subContinent.setAttribute("class", "region-heading");
    subContinent.innerHTML = `${element.region}`;
    subContinent.setAttribute("onclick","continentAddress(this)");
    subContinent.href = "#";
    parent.appendChild(subContinent);
  });
}

function continentAddress(data){
  console.log(data);
  const locations = data["location"];
  locations.forEach((element) => {
    const parent = document.querySelector(".contact-page-content");
    const subContinent = document.createElement("div");
    subContinent.setAttribute("class", `${element.region}`.toLowerCase());
    parent.appendChild(subContinent);
    const address = document.createElement("div");
    address.setAttribute("class", "address");
    subContinent.appendChild(address);
    element.place.forEach((item) => {
      const regionBox = document.createElement("div");
      regionBox.setAttribute("class", "region-box");
      address.appendChild(regionBox);
      const regionBoxName = document.createElement("h4");
      regionBoxName.innerHTML = `${item.name}`;
      regionBox.appendChild(regionBoxName);
      Object.keys(item.address).forEach((lines) => {
        const regionBoxLines = document.createElement("p");
        regionBoxLines.innerHTML = item.address[lines];
        regionBox.appendChild(regionBoxLines);
      });
      address.appendChild(regionBox);
    });
    // address.appendChild(regionBox);
  });
}