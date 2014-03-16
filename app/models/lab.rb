class Lab < ActiveRecord::Base
  belongs_to :patient
  
  def self.patients_labs(patient)
    Patient.find(patient.id).labs
  end

end
