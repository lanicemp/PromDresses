class Dress < ApplicationRecord
    has_many :ratings, foreign_key: :dress_id

    validates :name, :presence => true, uniqueness: true
    validates :img_url, :presence => true, uniqueness: true


 def self.get_average_rating 
    # Call on the ratings to be able to calculate the average rating.  Dress.ratings should work. 
    binding.pry 
 end 





end
