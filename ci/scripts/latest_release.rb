file_name = Dir.glob("#{ARGV[0]}/*.yml")
              .sort_by{ |x| x.scan(/\d+/)[0].to_i }
              .last

puts File.basename file_name
