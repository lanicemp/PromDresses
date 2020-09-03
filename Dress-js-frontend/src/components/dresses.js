class Dresses {
  constructor() {
    this.dresses = [];
    this.baseUrl = "http://localhost:3000/api/v1/dresses"
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
    this.viewDress = document.getElementById("dress_card");

    this.dressForm.addEventListener("submit", this.createNewDress.bind(this));
    this.startAddDressButton.addEventListener(
      "click",
      this.showDressModal.bind(this)
    );
    this.backdrop.addEventListener("click", this.backdropClickHandler);
    // this.viewDress.addEventListener('click', this.viewDressModal);
  }
  toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
  };

  viewDressModal = () => {
    console.log("im in viewDressModal");
  };

  showDressModal = () => {
    console.log("im in showDressModal");
    // function() {}
    this.addDressModal.classList.add("visible");
    this.toggleBackdrop();
  };

  closeDressModal = () => {
    this.addDressModal.classList.remove("visible");
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
        length: this.newDressLength.value
        
      }
    fetch(this.baseUrl,{
          
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(dress),
        
      }).then(res=>res.json())

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
        this.newDressPrice.value= " ";
        this.newDressLength.value = " ";
        this.render();
      });
    this.closeDressModal();
    console.log(dress);
  }
  fetchAndLoadDresses() {
    fetch(this.baseUrl).then((res) => res.json())
     
      .then((dresses) => {
        dresses.forEach((dress) => this.dresses.push(new Dress(dress)));
        console.log(this.dresses);
      })
      .then(() => {
        this.render();
      });
  }
  render() {
    const dressesContainer = document.getElementById("dress-container");
    dressesContainer.innerHTML = this.dresses
      .map(
        (dress) =>
          ` <div class="gallery">
            <ul class="dress_card" id="dress_card" >
            <div class = "dress_img"  >
            <img src ="${dress.img_url}" >
            </div>
            <div class = "dress_info"> 
            <h3>${dress.name}<h3>
            <p> silhouette: ${dress.silhouette}
            <br> neckline: ${dress.neckline} 
            <br> length: ${dress.length}
            <br> price: $${dress.price}</p>
            </div>
            
            </ul>
            </div>`
      )
      .join("");
    // this.dressesContainer.innerHTML = this.dresses.map(dress => dress.renderLi()).join("");
    // this.dressesContainer.innerHTML = this.dresses.map(dress => dress.renderLi()).join('')
  }
}
