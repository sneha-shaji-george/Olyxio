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
      localStorage.setItem("locationData", JSON.stringify(locations));
      generateSubContinents(locations);
    });
};

function generateSubContinents(locations) {
  locations.forEach((element) => {
    const parent = document.querySelector(".region");
    const subContinent = document.createElement("a");
    subContinent.setAttribute("class", "region-heading");
    subContinent.innerHTML = `${element.region}`;
    subContinent.setAttribute("onclick", "officeAddress(this.innerHTML)");
    subContinent.href = "#";
    parent.appendChild(subContinent);
  });
  defaultSouthAsia(locations);
}

function continentAddress(data) {
  const parent = document.querySelector(".contact-page-content");
  const subContinent = document.createElement("div");
  subContinent.setAttribute("class", `${data.region}`.toLowerCase());
  parent.replaceChildren(subContinent);
  const address = document.createElement("div");
  address.setAttribute("class", "address");
  address.setAttribute("onmouseout", "mouseout(this)");
  subContinent.appendChild(address);
  data.place.forEach((item) => {
    const regionBox = document.createElement("div");
    regionBox.setAttribute("class", "region-box");
    regionBox.setAttribute("onmouseover", "locationImageChange(this)");
    regionBox.setAttribute("data-officeimg", `${item.locationImage}`);
    address.appendChild(regionBox);
    const regionBoxName = document.createElement("h4");
    regionBoxName.innerHTML = `${item.name}`;
    regionBox.appendChild(regionBoxName);
    Object.keys(item.address).forEach((lines) => {
      const regionBoxLines = document.createElement("p");
      regionBoxLines.innerHTML = item.address[lines];
      regionBox.appendChild(regionBoxLines);
    });
    if (item.phoneNumber) {
      const phone = document.createElement("p");
      phone.innerHTML = `<i class="fa fa-phone"></i> ${item.phoneNumber}`;
      regionBox.appendChild(phone);
    }
    address.appendChild(regionBox);
  });
  const locationImage = document.createElement("div");
  locationImage.setAttribute("class", "location-img");
  data.place.forEach((item) => {
    if (data.place.indexOf(item) == 0) {
      const img = document.createElement("img");
      img.setAttribute("class", "image");
      img.src = `${item.locationImage}`;
      locationImage.appendChild(img);
      subContinent.appendChild(locationImage);
    }
  });
}

function officeAddress(data) {
  const location = JSON.parse(localStorage.getItem("locationData"));
  const continentData = location.find((loc) => loc.region === data);
  continentAddress(continentData);
}

function locationImageChange(regionTag) {
  const imgBox = document.querySelector(".location-img");
  const img = document.createElement("img");
  img.src = regionTag.dataset.officeimg;
  imgBox.replaceChildren(img);
}

function mouseout(region) {
  const imageBox = document.querySelector(".location-img");
  const boxes = region.querySelector(".region-box");
  const img = document.createElement("img");
  img.src = boxes.dataset.officeimg;
  imageBox.replaceChildren(img);
}

function defaultSouthAsia(data) {
  const continentData = data.find(
    (location) => location.region === "South Asia"
  );
  continentAddress(continentData);
}

window.onload = function () {
  regions();
};
