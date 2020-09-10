class Rating {
    constructor(ratingJSON) {
        console.log("Im in rating.js");
        this.comment = ratingJSON.comment;
        this.star_rating = ratingJSON.star_rating;
        this.dress_id = ratingJSON.dress_id;
        this.user_name = ratingJSON.user_name
        
    }

    // constructor(comment, star_rating, dress_id, user_name ){
    //     console.log("Im in rating.js")
    //     this.comment = comment
    //     this.star_rating = star_rating
    //     this.dress_id = dress_id
    //     this.user_name = user_name
    // }
}