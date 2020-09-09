class Rating < ApplicationRecord
    belongs_to :dress, foreign_key: :dress_id
end
