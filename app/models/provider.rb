class Provider < ActiveRecord::Base
  has_many :meddjoins
  has_many :patients, through: :meddjoins
  
end
