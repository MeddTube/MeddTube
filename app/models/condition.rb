class Condition < ActiveRecord::Base
  has_many :meddjoins
  has_many :patients, through: :meddjoins
  has_many :providers, through: :meddjoins
  has_many :videos, through: :meddjoins

  def self.patients_conditions(patient)
    Patient.find(patient.id).conditions
  end
end
