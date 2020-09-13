class Dresses {
  constructor() {
    this.dresses = [];
    //This is my dresses database 
    this.baseUrl = "http://localhost:3000/api/v1/dresses";
    //This is my ratings database 
    this.ratingUrl = "http://localhost:3000/api/v1/ratings";
    // this.adapter = new DressesAdapter();
    this.initiBindingsAndEventListeners();
    this.fetchAndLoadDresses();
  }
  initiBindingsAndEventListeners() {
    // Im assigning the variables from the HTML 
    this.addDressModal = document.getElementById("add-modal");
    this.startAddDressButton = document.querySelector("header button");
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
    this.dressContainer.addEventListener("click",this.showDressModal.bind(this));
    this.startAddDressButton.addEventListener("click",this.createDressModal.bind(this));
    this.backdrop.addEventListener("click", this.backdropClickHandler);
  }

  toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
  };

  createDressModal = () => {
    console.log("im in createDressModal");
    this.addDressModal.classList.add("visible");
    this.toggleBackdrop();
  };

  closeDressModal = () => {
    this.addDressModal.classList.remove("visible");
    this.viewDressModal.classList.remove("visible");
    this.toggleBackdrop();
  };

  backdropClickHandler = () => {
    this.closeDressModal();
  };

  createNewDress(e) {
    e.preventDefault();
    console.log(this);
    
    //Im creating the object of dress that has six attributes. 
    const dress = {
      name: this.newDressName.value,
      silhouette: this.newDressSilhouette.value,
      neckline: this.newDressNeckline.value,
      img_url: this.newDressImg.value,
      price: this.newDressPrice.value,
      length: this.newDressLength.value,
    };
    //Im opening the database changing the object to a sting and posting the data from the form in the database 
    fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dress),
    })
      .then((res) => res.json())

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
// Javascript fetch function asynchronously pulls a resource from the specified url.
//  Meanwhile fetch returns a Promise. Promise helps with the asynchronous part and runs the 
// function passed into then (response => response.json()) once the resource is loaded with the fetched
//  resource as parameter. The fetched resource can be parsed using json() if it is JSON formatted.
// then also returns a Promise making it chainable.

  fetchAndLoadDresses() {
    fetch(this.baseUrl)
      .then((res) => res.json())
      .then((dresses) => {
        dresses.forEach((dress) => this.dresses.push(new Dress(dress)));
        console.log(this.dresses);
        this.fetchAndLoadRatings()
      })
      .then(() => {
        this.render();
      });
  }

  render() {
    this.dressContainer.innerHTML = this.dresses
      .map(dress =>dress.renderLi(false))
      .join("");
  }
  
  showDressModal = (e) => {
    console.log("im in showDressModal");
    console.log(e);
    const dress_id = parseInt(e.target.parentElement.id);
    console.log(typeof dress_id);
    let dress = this.dresses.filter((dress) => dress.id === dress_id);
    console.log(dress);
    dress = dress[0];

    this.viewDressModal.innerHTML = dress.renderLi(true);
   
    //added this event listener I believe that since this deals with the ratings it will be a 
    //good place to add the event listener for the ratings. 
    this.ratingForm = document.getElementById("new-rating-form");
    this.ratingForm.addEventListener("submit", this.createNewRating.bind(this));
    this.viewDressModal.classList.add("visible");
    this.toggleBackdrop();
    document.addEventListener('DOMContentLoaded', dress.getRatings);
  };

  createNewRating(e) {
    e.preventDefault();
    console.log("in createNewRating");
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
            dress.ratings.push(rating );

            this.viewDressModal.innerHTML = dress.renderLi(true);
          }
        })
        username.value = ' ';
        userRating.value = ' ';
        userComment.value = ' ';

        // this.viewDressModal.innerHTML = dress.renderLi(true);
        //  this.render();
        // this.fetchAndLoadRatings();
      });

    // this.closeDressModal();
    console.log(rating);
  }

  fetchAndLoadRatings() {
    // const ratings = [];
    console.log("Im in Fetch and Load ratings ")
    fetch(this.ratingUrl).then((res) => res.json())
      .then((allRatings) => {
        console.log(allRatings)
        console.log ('im showing ratings above')
        //  ratings.forEach((rating)=>this.ratings.push(new Rating(rating)))
        // dresses.forEach((rating) => this.allRatings.push(new Rating(rating)));
        this.dresses.forEach(dress => {
          allRatings.forEach(rating => {
          
            if (dress.id === rating.dress_id) {
              dress.ratings.push(rating);
              
            }
          })
        });
      });
  }
  
}
