class Medication < ActiveRecord::Base
  has_one :provider
  belongs_to :patient
end
