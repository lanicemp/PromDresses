class DressesController < ApplicationController
  before_action :set_dress, only: [:show, :update, :destroy]

  # GET /dresses
  def index
    @dresses = Dress.all

    render json: @dresses
  end

  # GET /dresses/1
  def show
    render json: @dress
  end

  # POST /dresses
  def create
    @dress = Dress.new(dress_params)

    if @dress.save
      render json: @dress, status: :created, location: @dress
    else
      render json: @dress.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /dresses/1
  def update
    if @dress.update(dress_params)
      render json: @dress
    else
      render json: @dress.errors, status: :unprocessable_entity
    end
  end

  # DELETE /dresses/1
  def destroy
    @dress.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dress
      @dress = Dress.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def dress_params
      params.require(:dress).permit(:name, :silhouette, :neckline, :length, :color, :img_url, :price, :dress_id)
    end
end
