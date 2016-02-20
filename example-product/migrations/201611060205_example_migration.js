exports.migrate = function(properties) {
  // Append text to a string
  properties['.web_server.example_string']['value'] += '!';

  // Rename property 'example_port' to 'example_port_renamed',
  // retaining the previous value.

  properties['.properties.example_port_renamed'] = properties['.properties.example_port'];
  delete properties['.properties.example_port'];

  // Append text to a string list
  var string_list = properties['.properties.example_string_list']['value'].split(',');
  string_list.push('new-string-appended-by-v1');
  properties['.properties.example_string_list']['value'] = string_list.join(',');

  return properties;
};
