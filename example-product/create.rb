#!/usr/bin/env ruby
require 'yaml'

metadata_file = Dir.glob('metadata/*.yml').first
metadata = YAML.load_file(metadata_file)

product_name = metadata['name']
product_version = metadata['product_version']
timestamp = DateTime.now.strftime('%m-%d-%y')

zip_filename = "#{product_name}_#{product_version}_#{timestamp}.pivotal"
`zip -r #{zip_filename} metadata/ migrations/ releases/`

puts "Created - #{zip_filename}"
