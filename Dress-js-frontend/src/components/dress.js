import Rating from './rating.js';

export default class Dress {
  constructor(dressJSON) {
    // console.log("Im in dress.js");
    this.id = dressJSON.id;
    this.name = dressJSON.name;
    this.silhouette = dressJSON.silhouette;
    this.neckline = dressJSON.neckline;
    this.length = dressJSON.length;
    this.color = dressJSON.color;
    this.img_url = dressJSON.img_url;
    this.ratingsUrlBase = "http://localhost:3000/api/v1/ratings/";
    this.ratings_url = `${this.ratingsUrlBase}/${this.id}`;
    this.price = dressJSON.price;
    this.ratings = dressJSON.ratings
      ? dressJSON.ratings.map((rating) => new Rating(rating))
      : [];
  }

  renderLi(isViewDressModal) {
    return `
        <li id="${this.id}" class="dress_card">
          <img class="dress_img" src="${this.img_url}">
          <div class = "dress_info"> 
            <h3>${this.name}<h3>
              <div class="stars-outer">
                <div class="stars-inner" ></div>
              </div>
              <span class="number-rating"></span>
              <br>
          </div>
          ${this.renderDressDetails(isViewDressModal, this)}
        </li>
      `;
  }

  renderDressDetails(isViewDressModal, dress) {
    if (!isViewDressModal) {
      return `<button> Dress Details and Comments </button>`;
    } else {
      return `
          <p> silhouette: ${dress.silhouette}
          <br> neckline: ${dress.neckline} 
          <br> length: ${dress.length}
          <br> price: $${dress.price}</p>
          <br>
          <h2> Rate This Dress </h2>
          <form id="new-rating-form">
            <label for="username "> User Name  </label>
            <input type="text" name="username" id="username" />
            <label for="rating ">Rating </label>
                      
            <select name="rating " id="rating" >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <label for="comment"> Comment </label>
            <input type="text" name="comment" id="comment" />
            <input type="submit" value="Save Rating" />
          </form>
       
          ${this.renderDressRatings(this.ratings)}
         
        `;
    }
  }

  renderDressRatings(ratings) {
    console.log("Im in Render Dress Ratings ");
    console.log(ratings.star_rating);
    let ratingsString = "";

    if (!ratings) return ratingsString;

    ratings.forEach((rating) => {
      // debugger
      ratingsString += `
          
          <div class= "rating-info rating-${rating.id}" id = "rating-info ">
          <hr>
          <p>User Name: ${rating.username}
          <br>Rating: ${rating.star_rating} 
          
          <div class="stars-outer ">
          
            <div class="stars-inner " style= "width: ${rating.starPercentage()}"   ></div>
          </div>
          <span class="number-rating "></span>
          
          <br>Comment: ${rating.comment}</p> 
          <input type="submit" value="Delete Rating" />
          </div>
          `;
    });
    return ratingsString;
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
      comment: userComment.value ? userComment.value : "",
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

        this.dresses.forEach((dress) => {
          console.log(typeof dress.id);
          console.log(typeof rating.dress_id);
          if (dress.id === rating.dress_id) {
            // dress.ratings.push(rating );
            dress.ratings.push(new Rating(rating));
            this.viewDressModal.innerHTML = dress.renderLi(true);
          }
        });

        username.value = " ";
        userRating.value = " ";
        userComment.value = " ";

        // this.viewDressModal.innerHTML = dress.renderLi(true);
        //  this.render();
        this.fetchAndLoadRatings();
      });

    // this.closeDressModal();
    console.log(rating);
  }
  fetchAndLoadRatings() {
    // const ratings = [];
    let rating = {
        'comment': 'Man this stubbed comment is amazing',
        'star_rating': 5,
        'dress_id': this.id ,
        'username': "test123"
      };
    this.ratings.push(new Rating(rating));

    /* TODO: Fix the api to use the dress id when getting ratings from thedatabase
    console.log("Im in Fetch and Load ratings ");
    fetch(this.ratingUrl)
      .then((res) => res.json())
      .then((allRatings) => {
        console.log(allRatings);
        console.log("im showing ratings above");
        this.dresses.forEach((dress) => {
          allRatings.forEach((rating) => {
            if (dress.id === rating.dress_id) {
              dress.ratings.push(new Rating(rating));
              //Created a new rating instance and stored in dress.ratings
              //populates the ratings at the bottom of page.
            }
          });
        });
      });*/
  }
  loadDressRating(dress){
    console.log("Im in loadDressRating in the dress class")
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
