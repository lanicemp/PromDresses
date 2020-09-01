class CreateDresses < ActiveRecord::Migration[6.0]
  def change
    create_table :dresses do |t|
      t.string :name
      t.string :silhouette
      t.string :neckline
      t.string :length
      t.string :color
      t.string :img_url
      t.integer :price
      t.integer :dress_id

      t.timestamps
    end
  end
end
