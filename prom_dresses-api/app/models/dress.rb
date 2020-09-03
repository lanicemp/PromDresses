class Dress < ApplicationRecord
    has_many :ratings, foreign_key: :dress_id

end
