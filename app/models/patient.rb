class Patient < ActiveRecord::Base
  has_many :meddjoins
  has_many :labs
  has_many :medications, through: :meddjoins
  has_many :conditions, through: :meddjoins
  has_many :providers, through: :meddjoins
  has_many :diets, through: :meddjoins
  has_many :videos, through: :meddjoins
end
