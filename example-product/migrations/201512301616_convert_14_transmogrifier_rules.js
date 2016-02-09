exports.migrate = function(input) {
  var current_version = getCurrentProductVersion();

  if (current_version.substring(0,3) == "1.4") {
    input.properties['.web_server.example_http_url'].value = "http://migrated-value.com";
    input.properties['.web_server.example_migrated_integer'] = input.properties['.web_server.example_integer'];
    delete input.properties['.web_server.example_integer'];
  }
  return input;
};
