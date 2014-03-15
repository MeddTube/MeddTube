json.array!(@conditions) do |condition|
  json.extract! condition, :id, :name, :dateonset, :icd9, :description
  json.url condition_url(condition, format: :json)
end
