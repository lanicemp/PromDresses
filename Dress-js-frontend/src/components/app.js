import Dress from "./dress.js";

export default class App {
  constructor() {
    console.log("app loaded, Im in app.js");
    // this.dresses = new Dresses();
    this.baseUrl = "http://localhost:3000/api/v1/dresses";
    //This is my ratings database
    this.ratingUrl = "http://localhost:3000/api/v1/ratings";
    //Created the new object of Dresses
    // TODO: When you remove the Dresses class, uncomment the line below
    this.dresses = [];
    this.load();
    this.fetchAndLoadDresses();
  }

  load() {
    console.log(`${Date.now()}: Calling initiBindingsAndEventListeners`);
    this.initiBindingsAndEventListeners();
    console.log(
      `${Date.now()}: Completed calling initiBindingsAndEventListeners`
    );

    console.log(`${Date.now()}: Loading dress ratings`);
    console.log(
      `${Date.now()}: WHEN WE REFACTOR, THIS WILL BE REPLACED BY CALLING THE LOADDRESSES METHOD`
    );
    console.log(`${Date.now()}: Completed lading dress ratings`);
  
  }

  initiBindingsAndEventListeners() {
    // Im assigning the variables from the HTML and use it for the differnt functions of the application
    this.addDressModal = document.getElementById("add-modal");
    this.startAddDressButton = document.querySelector("header button"); //To find the button in the header
    this.sortDresses = document.getElementById("sort-dresses");
    this.backdrop = document.getElementById("backdrop");
    this.dressesContainer = document.getElementById("new-dress-container");
    this.newDressName = document.getElementById("name");
    this.newDressSilhouette = document.getElementById("silhouette");
    this.newDressNeckline = document.getElementById("neckline");
    this.newDressImg = document.getElementById("image-url");
    this.newDressPrice = document.getElementById("price");
    this.newDressLength = document.getElementById("length");
    this.dressForm = document.getElementById("new-dress-form");
    this.dressContainer = document.getElementById("dress-container");
    this.viewDressModal = document.getElementById("view-dress-modal");

    //Added eventlisteners to the submit and click buttons
    this.dressForm.addEventListener("submit", this.createNewDress.bind(this));
    //This event listener submits the completed form to create a new dress
    this.dressContainer.addEventListener(
      "click",
      this.showDressModal.bind(this)
    );
    //This event listener shows a larger version on the selcted dress and its details.
    this.startAddDressButton.addEventListener(
      "click",
      this.createDressModal.bind(this)
    );
    this.sortDresses.addEventListener(
      "click",
      this.sortTheseDresses.bind(this)
    );
    //This event listener is associated with the add dress button which then displays the modal form card.
    this.backdrop.addEventListener("click", this.backdropClickHandler);
  }

  /* TODO: When you remove the Dresses class, uncomment the load function
  loadDresses() {
    fetch(this.baseUrl)
      .then((res) => res.json())
      // corey: rename the temporary dresses variable to dressesResponse
      .then((dressesResponse) => {
        console.log(dressesResponse);
        dressesResponse.forEach((dress) => {
          // console.log(dresses)
          const Newdress = new Dress(dress);
          // Create fnction loadRating(dress)
          this.dresses.push(Newdress);
        });
      });
  }
  */
  fetchAndLoadDresses() {
    fetch(this.baseUrl)
      .then((res) => res.json())
      // corey: rename the temporary dresses variable to dressesResponse
      .then((dressesResponse) => {
        console.log(dressesResponse);
        dressesResponse.forEach((dress) => {
          // console.log(dress);
          const Newdress = new Dress(dress);
          Newdress.fetchAndLoadRatings();
          // Create fnction loadRating(dress)
          this.dresses.push(Newdress);
        });
        //I am retreiving  the data from the database and placing it in the dress object.
        console.log(this.dresses);
        // dress.fetchAndLoadRatings();
      })
      .then(() => {
        this.render();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    this.dressContainer.innerHTML = this.dresses
      //Im populating all the dresses in the dress container
      .map((dress) => dress.renderLi(false))
      .join("");
  }
  createNewDress(e) {
    e.preventDefault();
    console.log(this);

    //Im creating the object of dress that has six attributes.
    //Assingning the values I get from the form.
    const dress = {
      name: this.newDressName.value,
      silhouette: this.newDressSilhouette.value,
      neckline: this.newDressNeckline.value,
      img_url: this.newDressImg.value,
      price: this.newDressPrice.value,
      length: this.newDressLength.value,
    };
    //Im opening the database changing the object to a sting and
    //posting the data from the form in the database
    //Saving the new dress to the database
    fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dress),
    })
      .then((res) => res.json())
      //Turing turing the JSON string back into a JavaScript obj
      .then((dress) => {
        console.log("in create dress");
        console.log(dress);
        //Pushing the new dress into the array of dresses
        this.dresses.push(new Dress(dress));

        this.newDressName.value = " ";
        this.newDressSilhouette.value = " ";
        this.newDressNeckline.value = " ";
        this.newDressImg.value = " ";
        this.newDressPrice.value = " ";
        this.newDressLength.value = " ";
        this.render();
      });
    this.closeDressModal();
    console.log(dress);
  }
  showDressModal = (e) => {
    console.log("im in showDressModal");
    console.log(e);
    //This is assigning the dress_id and flitering to perform the rating.
    const dress_id = parseInt(e.target.parentElement.id);
    console.log(typeof dress_id);
    let dress = this.dresses.filter((dress) => dress.id === dress_id);
    console.log(dress);
    dress = dress[0];

    this.viewDressModal.innerHTML = dress.renderLi(true);

    //added this event listener to manage the ratings
    this.ratingForm = document.getElementById("new-rating-form");
    this.deleteRating = document.getElementById(`rating-info `);
    console.log(this.deleteRating);
    this.ratingForm.addEventListener("submit", this.createNewRating.bind(this));
    //  this.deleteRating.addEventListener("click", this.deleteThisRating.bind(this)); ;
    this.viewDressModal.classList.add("visible");
    this.toggleBackdrop();
   
  };

  createDressModal = () => {
    console.log("im in createDressModal");
    this.addDressModal.classList.add("visible");
    // this.backdrop.classList.add("visible");
    this.toggleBackdrop();
  };

  toggleBackdrop = () => {
    this.backdrop.classList.add("visible");
  };

  closeDressModal = () => {
    this.addDressModal.classList.remove("visible");
    this.viewDressModal.classList.remove("visible");
    //this.toggleBackdrop(this.backdrop);
                                                                                                                                                                         this.backdrop.classList.remove("visible");
  };

  backdropClickHandler = () => {
    this.closeDressModal();
  };

  sortTheseDresses() {
    console.log("im in sort these Dresses ");
    // collect the name values of the list of dresses then I want to order bu the first letter
    // of the names
    this.dresses.sort(function (a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
    this.render();
  }

  createNewRating(e) {
    e.preventDefault();
    console.log("in createNewRating");
    //Creating variables to support my ratings tracking. 
    const username = document.getElementById("username");
    const userRating = document.getElementById("rating");
    const userComment = document.getElementById("comment");
    const dress_id = parseInt(e.target.parentElement.id);

    // creating the object for rating with 4 attributes
    const rating = {
      dress_id: dress_id,
      username: username.value ? username.value : "anonymous",
      star_rating: userRating.options[userRating.selectedIndex].value,
      comment: userComment.value ? userComment.value : ""
    };
    
    fetch(this.ratingUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(rating),
    })
      .then((res) => res.json())

      .then((rating) => {
        console.log("in create new rating");
        console.log(typeof rating);
    
        this.dresses.forEach(dress => {
          console.log(typeof dress.id)
          console.log(typeof rating.dress_id)
          if (dress.id === rating.dress_id) {
            // dress.ratings.push(rating );
            dress.ratings.push(new Rating(rating))
            this.viewDressModal.innerHTML = dress.renderLi(true);
          }
        })
        
        username.value = ' ';
        userRating.value = ' ';
        userComment.value = ' ';

        // this.viewDressModal.innerHTML = dress.renderLi(true);
        //  this.render();
        this.fetchAndLoadRatings();
      });

    // this.closeDressModal();
    console.log(rating);
  }
  loadDressRating(dress){
    console.log(" Im in loading dress rating")
    // Fetch the rating for a specific dress from the API
    // GET http://localhost:3000/api/v1/ratings/{id}
    const ratingUrl = `${this.ratingUrl}/${dress.id}`;
    fetch(ratingUrl)
      // On response, grab the json
      .then(res => res.json())
      // Set the dress rating property based on the json result
      .then(rating => 
      {
      
      });
  }
}
