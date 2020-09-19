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
      this.ratings = dressJSON.ratings ? dressJSON.ratings.map(rating => new Rating(rating)) : []

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
        `} 
      }

    renderDressRatings(ratings) {
      console.log("Im in Render Dress Ratings ")
      console.log(ratings.star_rating)
      let ratingsString = ''
      
      if (!ratings) return ratingsString;
      
      ratings.forEach(rating => {
        // debugger
          ratingsString += `
          
          <div class= "rating-info rating-${rating.id}">
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
          `
      });
      return ratingsString;
    }


  }
  