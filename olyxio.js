const testimonialsData = async () => {
  await fetch("testimonials.json")
    .then((response) => response.json())
    .then((data) => {
      let testimonials = data["users"];
      testimonials.forEach((element) => {
        let parent = document.getElementsByClassName("sayings")[0];
        let div1 = document.createElement("div");
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
