class Medication < ActiveRecord::Base
  has_many :meddjoins
  has_many :patients, through: :meddjoins
  has_many :providers, through: :meddjoins
  has_many :videos, through: :meddjoins
end
