json.array!(@providers) do |provider|
  json.extract! provider, :id, :firstname, :lastname, :npi, :license
  json.url provider_url(provider, format: :json)
end
