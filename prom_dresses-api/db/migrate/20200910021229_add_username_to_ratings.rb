class AddUsernameToRatings < ActiveRecord::Migration[6.0]
  def change
    add_column :ratings, :username, :string
  end
end
