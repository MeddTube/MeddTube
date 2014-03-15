json.array!(@medications) do |medication|
  json.extract! medication, :id, :name, :route, :frequency, :dosage, :doesageunits, :orderdate, :provider_id, :prnstatus
  json.url medication_url(medication, format: :json)
end
