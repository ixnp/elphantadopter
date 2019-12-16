document.addEventListener("DOMContentLoaded", function() {
  const elephantsURL = "http://localhost:3000/elephants";
  const adoptionURL = "http://localhost:3000/adoption";
  let elephant = "";
  let currentIndex = 1;
  let adoptedElephants = [];
  fetchEl();
  fetchAdoptedElephants();

  function fetchEl() {
    return fetch(elephantsURL + `/${currentIndex}`)
      .then(res => res.json())
      .then(data => {
        elephant = data;
        currentElephant(data, currentIndex);
      });
  }
  function fetchAdoptedElephants() {
    return fetch(adoptionURL)
      .then(res => res.json())
      .then(data => {
        adoptedElephants = data;
        displayAllElephants(data);
      });
  }

  function postAdoptedElephant() {
    adoptedElephant = {
      elephantName: elephant.name,
      id: elephant.id
    };

    return fetch(adoptionURL, {
      method: "POST",
      body: JSON.stringify(adoptedElephant),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  function changeAdoptedElephantsName(id, newName) {
    return fetch(adoptionURL + `/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ elephantName: newName }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById("my-elephants").innerHTML = "";
        fetchAdoptedElephants();
      });
  }

  //Show Elephants
  function currentElephant(elephant) {
    document.querySelector("img").src = elephant.image;
    document.querySelector(".name").textContent = elephant.name;
    document.querySelector(".species").textContent = elephant.species;
    document.querySelector(".note").textContent = elephant.note;
  }
  //show Elephants on adoption List
  function displayAllElephants(arr) {
    console.log(arr);
    arr.map(elephant => displayAdoptedElephant(elephant.elephantName));
  }
  function displayAdoptedElephant(name) {
    let ul = document.getElementById("my-elephants");
    let li = document.createElement("li");
    li.textContent = name;
    ul.appendChild(li);
  }
  // On Click change Elephant
  document.querySelector(".next").addEventListener("click", function() {
    if (currentIndex <= 20) {
      currentIndex++;
      fetchEl();
    }
  });
  document.querySelector(".back").addEventListener("click", function() {
    if (currentIndex > 1) {
      currentIndex--;
      fetchEl();
    }
  });

  // On submit add Elephant to My Elephants
  document.querySelector(".adopt").addEventListener("click", function() {
    console.log("adopt");
    postAdoptedElephant();
    displayAdoptedElephant(elephant.name);
  });
  document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = e.target[0].value;
    let id = e.target[1].value;
    changeAdoptedElephantsName(id, name);
  });
});
