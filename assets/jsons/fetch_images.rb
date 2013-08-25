require "json"
require "shellwords"

albums = JSON.parse(File.read("albums.json"), :symbolize_names => true)

current_dir = File.absolute_path(File.dirname(__FILE__))

albums.each do |album|
  system "wget -O #{current_dir}/../images/#{Shellwords::escape(album[:name])}.jpg #{album[:cover_url]}" 
end
