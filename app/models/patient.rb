class Patient < ActiveRecord::Base
  has_many :medications
  has_one :diet
  has_many :conditions
end
