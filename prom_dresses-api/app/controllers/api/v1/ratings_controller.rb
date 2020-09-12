class Api::V1::RatingsController < ApplicationController
  before_action :set_rating, only: [:show, :update, :destroy]
  #  before_action :set_dress

  #  def new 
  #   @rating= @dress.ratings.build
  #  end 

  # GET /ratings
  def index
    
  #  if params[:dress_id]
  #     @dress = Dress.find(params[:dress_id])
      @ratings = Rating.all
      render json: @ratings, except:[:created_at, :updated_at] ,status: 200
      
  #  else 
      # @ratings= Rating.all
      # binding.pry 
    # end
  end 

  # GET /ratings/1
  def show
   
    @rating = Rating.find(params[:id])
    render json: @rating
  end

  # POST /ratings
  def create
    @rating = Rating.new(rating_params)

    if @rating.save
      render json: @rating, status: :created, location: @rating
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /ratings/1
  def update
    if @rating.update(rating_params)
      render json: @rating
    else
      render json: @rating.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ratings/1
  def destroy
    @rating = Rating.find(params[:id])
    @rating.destroy
    render json: {ratingID: @rating.id}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rating
      @rating = Rating.find(params[:id])
    end
    

    # Only allow a trusted parameter "white list" through.
    def rating_params
      params.require(:rating).permit(:comment, :star_rating, :dress_id, :username)
    end
    # def set_dress
    #   binding.pry 
    #   @dress = Dress.find(params[:id])
    # end
end
