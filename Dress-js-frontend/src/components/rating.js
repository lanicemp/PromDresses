class Rating {
    // constructor(ratingJSON) {
    //     console.log("Im in rating.js");
    //     this.comment = ratingJSON.comment;
    //     this.star_rating = ratingJSON.star_rating;
    //     this.dress_id = ratingJSON.dress_id;
    //     this.user_name = ratingJSON.user_name
        
    // }

    constructor(comment, star_rating, dress_id, user_name ){
        console.log("Im in rating.js")
        this.comment = comment
        this.star_rating = star_rating
        this.dress_id = dress_id
        this.user_name = user_name
    }

    getRatings() {
      
        console.log( "im in rating.get ratings")
       
       //  console.log(ratings)
       for (let rating in ratings) {
         // Get percentage
         const starPercentage = (ratings[rating] / starsTotal) * 100;
 
         // Round to nearest 10
         const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
 
         // Set width of stars-inner to percentage
         document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;
 
         // Add number rating
         document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
 
         this.renderDressRatings(this.ratings)
       }
     } 
}