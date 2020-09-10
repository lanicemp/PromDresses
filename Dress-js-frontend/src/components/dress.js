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
      
    //   this.comment = ratingJSON.comment
    }
    renderRating(ratings) {
      console.log("ratings")
      let ratingsString = ''
      
      if (!ratings) return ratingsString;

      ratings.forEach(rating => {
          ratingsString += `<p><i>${rating.star_}</i></p>`
      });
     
      return ratingsString;
     
  }
    renderLi() {
      return `<li>${this.name}, ${this.silhouette}, ${this.neckline},${this.length}, ${this.color}, ${this.img_url}, ${this.price}, <br> <br> ratings: ${this.renderRatings(this.ratings)}</li>`;
    }
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
  