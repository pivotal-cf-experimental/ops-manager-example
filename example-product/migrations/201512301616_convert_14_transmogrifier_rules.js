exports.migrate = function(properties) {
  var current_version = getCurrentProductVersion();

  if (current_version.substring(0,3) == "1.4") {
    properties.job_properties.web_server.example_http_url.value = "http://migrated-value.com";
    properties.job_properties.web_server.example_migrated_integer = properties.job_properties.web_server.example_integer;
    delete properties.job_properties.web_server.example_integer;
  }
  return properties;
};
