class Dress < ApplicationRecord
    has_many :ratings, foreign_key: :dress_id

    validates :name, :presence => true, uniqueness: true
    validates :img_url, :presence => true, uniqueness: true
end
