class Video < ActiveRecord::Base
  has_many :meddjoins
  has_many :patients, through: :meddjoins
  acts_as_votable
end

