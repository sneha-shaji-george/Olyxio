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
