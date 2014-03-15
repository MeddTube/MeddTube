json.array!(@videos) do |video|
  json.extract! video, :id, :name, :url, :category, :thumburl
  json.url video_url(video, format: :json)
end
