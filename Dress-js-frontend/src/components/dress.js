class Dress {
    constructor(dressJSON) {
      console.log("Im in dress.js");
      this.id = dressJSON.id;
      this.name = dressJSON.name;
      this.silhouette = dressJSON.silhouette;
      this.neckline = dressJSON.neckline;
      this.length = dressJSON.length;
      this.color = dressJSON.color;
      this.img_url = dressJSON.img_url;
      
      this.price = dressJSON.price;
      this.ratings = dressJSON.ratings ? dressJSON.ratings : []
    }
    
    renderLi(isViewDressModal) {
      return `
        <li id="${this.id}" class="dress_card">
          <img class="dress_img" src="${this.img_url}">
          <div class = "dress_info"> 
            <h3>${this.name}<h3>
              <div class="stars-outer">
                <div class="stars-inner"></div>
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
          ${console.log("calling this.ratings")}
          ${console.log(this.ratings)}
         
          ${this.renderDressRatings(this.ratings)}
          
        `}
        // ${this.getRatings(this.ratings)};
      }

      getRatings(ratings) {
        console.log(ratings)
        console.log(  ratings[6].star_rating)
        console.log(ratings[6].dress_id)
        //This is hard coded but I thinks that I some how have to use the target value. 
        // But we are able to get a percentage for the rating 

        // A for loop will be neccessary so that for each rating of the ratings we want to use the starrating
        // to fing the percentage
         console.log( "im in rating.get ratings")

         let starrating = ratings[6].star_rating
         const starsTotal = 5 
         console.log(starsTotal)

      //    //  console.log(ratings)
      //    for (let rating in ratings) {
      //      // Get percentage
      // const starPercentage = (ratings[rating] / starsTotal) * 100;
           const starPercentage = (starrating / starsTotal) * 100;
           console.log(starPercentage);
    
      //      // Round to nearest 10
      //      const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
    
      //      // Set width of stars-inner to percentage
      //      document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
      document.querySelector(`.rating .stars-inner`).style.width = starPercentage;
      //      // Add number rating
           document.querySelector(`.rating-${rating.id} .number-rating`).innerHTML = rating;
    
      //      this.renderDressRatings(this.ratings)
      //    }
      this.renderDressRatings(this.ratings)
       } 

    renderDressRatings(ratings) {
      console.log("Im in Render Dress Ratings ")
      console.log(ratings)
      let ratingsString = ''
      
      if (!ratings) return ratingsString;
      
      ratings.forEach(rating => {
          ratingsString += `
          
          <div class= "rating-info rating-${rating.id}">
          <hr>
          <p>User Name: ${rating.username}
          <br>Rating: ${rating.star_rating} 
          
          <div class="stars-outer ">
            <div class="stars-inner " ></div>
          </div>
          <span class="number-rating "></span>
          
          <br>Comment: ${rating.comment}</p> 
          </div>
          `
          this.getRatings(ratings);
      });
      
      return ratingsString;
    }

    

      
    // renderLi() {
    //   return `<li>${this.name}, ${this.silhouette}, ${this.neckline},${this.length}, ${this.color}, ${this.img_url}, ${this.price}, <br> <br> ratings: ${this.renderRatings(this.ratings)}</li>`;
    // }
    // dressBindingsAndEventListeners() {
    //   this.viewDressButton = document.querySelector("main button");
    //   this.viewDress.addEventListener("click", this.viewDressModal);
    // }
    // viewDressModal = () => {
    //   console.log("im in viewDressModal");
    //   this.addDressModal.classList.add("visible");
    //   this.toggleBackdrop();
    // };

  }
  