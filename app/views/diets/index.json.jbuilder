json.array!(@diets) do |diet|
  json.extract! diet, :id, :name, :restrictions, :guidelines, :recomendations
  json.url diet_url(diet, format: :json)
end
