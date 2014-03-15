json.array!(@patients) do |patient|
  json.extract! patient, :id, :firstname, :lastname, :birthdate, :address, :medicalrecordnumber, :phone, :medication_id, :diet_id, :condition_id
  json.url patient_url(patient, format: :json)
end
