class Rating {
    // constructor(ratingJSON) {
    //     console.log("Im in rating.js");
    //     this.comment = ratingJSON.comment;
    //     this.star_rating = ratingJSON.star_rating;
    //     this.dress_id = ratingJSON.dress_id;
    //     this.user_name = ratingJSON.user_name
        
    // }

    constructor(rating ){
        console.log("Im in rating.js")
        this.comment = rating.comment
        this.star_rating = rating.star_rating
        this.dress_id = rating.dress_id
        this.username = rating.username
    }

    starPercentage(){
        // Get percentage
        const starPercentage = (this.star_rating / 5) * 100;
        console.log(starPercentage);

        // Round to nearest 10
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;
        console.log(starPercentageRounded)
        return starPercentageRounded
    } 
}