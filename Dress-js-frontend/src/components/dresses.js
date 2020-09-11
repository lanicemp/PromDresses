class Dresses {
  constructor() {
    this.dresses = [];
    //  this.rating = [];
    this.baseUrl = "http://localhost:3000/api/v1/dresses";
    this.ratingUrl = "http://localhost:3000/api/v1/ratings";
    // this.adapter = new DressesAdapter();
    this.initiBindingsAndEventListeners();
    this.fetchAndLoadDresses();
  }
  initiBindingsAndEventListeners() {
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

    this.dressForm.addEventListener("submit", this.createNewDress.bind(this));
    this.dressContainer.addEventListener(
      "click",
      this.showDressModal.bind(this)
    );
    this.startAddDressButton.addEventListener(
      "click",
      this.createDressModal.bind(this)
    );
    this.backdrop.addEventListener("click", this.backdropClickHandler);

    //  window.dressesContainer.addEventListener('click', this.handleClick.bind(this))
    // .getElementById('dress-container').addEventListener('click', this.handleClick.bind(this));
  }
  toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
  };

  createDressModal = () => {
    console.log("im in createDressModal");
    // function() {}
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
    // closeMovieDeletionModal();
  };

  createNewDress(e) {
    e.preventDefault();
    console.log(this);
    //  this.newDressSilhouette.value;
    const dress = {
      name: this.newDressName.value,
      silhouette: this.newDressSilhouette.value,
      neckline: this.newDressNeckline.value,
      img_url: this.newDressImg.value,
      price: this.newDressPrice.value,
      length: this.newDressLength.value,
    };
    fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dress),
    })
      .then((res) => res.json())

      // this.adapter
      //   .createDress(name, silhouette, neckline, img_url, price, length)
      .then((dress) => {
        console.log("in create dress");
        console.log(dress);
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
      //     ` <div class="gallery">
      //       <ul class="dress_card" id="${dress.id}">
      //       <div class = "dress_img"  >
      //       <img src ="${dress.img_url}" >
      //       </div>
      //       <div class = "dress_info"> 
      //       <h3>${dress.name}<h3>
      //       <td>
      //         <div class="stars-outer">
      //           <div class="stars-inner"></div>
      //         </div>
      //         <span class="number-rating"></span>
      //       </td>
      //       <br>
      //       <br>
      //       </div>
      //        <button> Dress Details and Comments </button>
             
            
      //       </ul>
      //       </div>
      //       `
      // )
      .join("");
  }
  
  showDressModal = (e) => {
    console.log("im in showDressModal");
      //  this.fetchAndLoadRatings();
 
    console.log(e);
    const dress_id = parseInt(e.target.parentElement.id);
    console.log(typeof dress_id);
    let dress = this.dresses.filter((dress) => dress.id === dress_id);
    console.log(dress);
    dress = dress[0];
  
    
    this.viewDressModal.innerHTML = dress.renderLi(true);
    // `<div class = "dress_img"  >
    //         <img src ="${dress.img_url}" >
    //         </div>
    //         <div class = "dress_info"> 
    //         <h2>${dress.name}<h2>
    //         <td>
    //           <div class="stars-outer">
    //             <div class="stars-inner"></div>
    //           </div>
    //           <span class="number-rating"></span>
    //         </td>
    //         <p> silhouette: ${dress.silhouette}
    //         <br> neckline: ${dress.neckline} 
    //         <br> length: ${dress.length}
    //         <br> price: $${dress.price}</p>
    //         <br>
    //         <h2> Rate This Dress </h2>

    //         <form id="new-rating-form">
    //           <label for="userName "> User Name  </label>
    //           <input type="text" name="userName" id="userName " />
    //           <label for="rating ">Rating </label>
                       
    //           <select name="rating " id="rating " >
    //             <option value="1">1</option>
    //             <option value="2">2</option>
    //             <option value="3">3</option>
    //             <option value="4">4</option>
    //             <option value="5">5</option>
    //           </select>

    //           <label for="comment"> Comment </label>
    //           <input type="text" name="comment" id="comment" />
    //           <input type="submit" value="Save Rating" />

    //         </form>
    //         <ul>
    //         ${ratings};
    //         </ul>
    //         </div>

    //         <br>
    //         `;
    this.ratingForm = document.getElementById("new-rating-form");
    this.ratingForm.addEventListener("submit", this.createNewRating.bind(this));
    
    this.viewDressModal.classList.add("visible");
    this.toggleBackdrop();
  };

  createNewRating(e) {
    e.preventDefault();
    console.log("in createNewRating");
    const userName = document.getElementById("userName");
    const userRating = document.getElementById("rating");
    const userComment = document.getElementById("comment");
    const dress_id = parseInt(e.target.parentElement.id);
    
    const rating = {
      dress_id: dress_id,
      user_name: userName.value ? userName.value : "anonymous",
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
        console.log("in create rating");
        console.log(rating);
        const newRating = new Rating(rating);
        this.dresses.forEach(dress => {
          if (dress.id === newRating.dress_id) {
            dress.ratings.push(newRating);
          }
        })
        userName.value = ' ';
        userRating.value = ' ';
        userComment.value = ' ';

        this.render();
      });
    this.closeDressModal();
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
