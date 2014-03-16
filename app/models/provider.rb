class Provider < ActiveRecord::Base
  has_many :meddjoins
  has_many :patients, through: :meddjoins
  
  def self.patients_providers(patient)
    Patient.find(patient.id).providers
  end
end
