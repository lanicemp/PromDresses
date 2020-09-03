class Api::V1::DressesController < ApplicationController
  before_action :set_dress, only: [:show, :update, :destroy]

  # GET /dresses
  def index
    @dresses = Dress.all

    render json: @dresses, except:[:created_at, :updated_at] ,status: 200
  end

  # GET /dresses/1
  def show
    @dress = Dress.find(params[:id])
    render json: @dress, status: 200 
  end

  # POST /dresses
  def create
    @dress = Dress.new(dress_params)

    if @dress.save
      render json: @dress, status: :created 
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
    @dress = Dress.find(params[:id])
    @dress.destroy
    render json: {dressID: @dress.id}
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
