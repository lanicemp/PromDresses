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
      // this.dressBindingsAndEventListeners();
      this.ratings = dressJSON.ratings ? dressJSON.ratings : []
      //   this.comment = ratingJSON.comment
    }

    renderDressRatings(ratings) {
      console.log("ratings")
      let ratingsString = ''
      
      if (!ratings) return ratingsString;

      ratings.forEach(rating => {
          ratingsString += `<hr><p>UserName: ${rating.username}<br>Rating: ${rating.star_rating}<br>Comment: ${rating.comment}</p>`
      });
      return ratingsString;
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
            <label for="userName "> User Name  </label>
            <input type="text" name="userName" id="userName" />
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
      renderLi(isViewDressModal) {
        return `
          <li id="${this.id}" class="dress_card">
            <img class="dress_img" src="${this.img_url}">
            <div class = "dress_info"> 
              <h3>${this.name}<h3>
              <td>
                <div class="stars-outer">
                  <div class="stars-inner"></div>
                </div>
                <span class="number-rating"></span>
              </td>
              <br>
              <br>
            </div>
            ${this.renderDressDetails(isViewDressModal, this)}
          </li>
        `;
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
  