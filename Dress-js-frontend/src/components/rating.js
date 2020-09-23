class Rating {
    
    constructor(rating ){
        //Assigning the values to the parameter of rating.  Creating the Rating object.
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
    deleteThisRating(e) {
        console.log(e)
        }

}