json.array!(@videos) do |video|
  json.extract! video, :id, :name, :url, :type, :thumburl
  json.url video_url(video, format: :json)
end
