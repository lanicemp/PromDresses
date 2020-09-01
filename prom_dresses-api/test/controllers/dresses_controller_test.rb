require 'test_helper'

class DressesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @dress = dresses(:one)
  end

  test "should get index" do
    get dresses_url, as: :json
    assert_response :success
  end

  test "should create dress" do
    assert_difference('Dress.count') do
      post dresses_url, params: { dress: { color: @dress.color, dress_id: @dress.dress_id, img_url: @dress.img_url, length: @dress.length, name: @dress.name, neckline: @dress.neckline, price: @dress.price, silhouette: @dress.silhouette } }, as: :json
    end

    assert_response 201
  end

  test "should show dress" do
    get dress_url(@dress), as: :json
    assert_response :success
  end

  test "should update dress" do
    patch dress_url(@dress), params: { dress: { color: @dress.color, dress_id: @dress.dress_id, img_url: @dress.img_url, length: @dress.length, name: @dress.name, neckline: @dress.neckline, price: @dress.price, silhouette: @dress.silhouette } }, as: :json
    assert_response 200
  end

  test "should destroy dress" do
    assert_difference('Dress.count', -1) do
      delete dress_url(@dress), as: :json
    end

    assert_response 204
  end
end
