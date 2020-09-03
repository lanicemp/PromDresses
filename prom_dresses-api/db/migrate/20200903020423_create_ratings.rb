class CreateRatings < ActiveRecord::Migration[6.0]
  def change
    create_table :ratings do |t|
      t.string :comment
      t.integer :star_rating
      t.integer :dress_id

      t.timestamps
    end
  end
end
