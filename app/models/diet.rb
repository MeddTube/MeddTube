class Diet < ActiveRecord::Base
  has_many :meddjoins
  has_many :patients, through: :meddjoins
  has_many :providers, through: :meddjoins
  has_many :videos, through: :meddjoins

  def self.patients_diets(patient)
    Patient.find(patient.id).diets
  end
end
