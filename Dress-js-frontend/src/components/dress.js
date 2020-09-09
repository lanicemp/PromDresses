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
      this.dress_id = dressJSON.dress_id;
      this.price = dressJSON.price;
      // this.dressBindingsAndEventListeners();
      
    //   this.comment = ratingJSON.comment
    }
  
    renderLi() {
      return `<li>${this.name}, ${this.silhouette}, ${this.neckline},${this.length}, ${this.color}, ${this.img_url},${this.dress_id}, ${this.price} </li>`;
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
  