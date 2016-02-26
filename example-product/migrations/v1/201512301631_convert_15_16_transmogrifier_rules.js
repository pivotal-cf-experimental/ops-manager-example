exports.migrate = function(input) {
  var current_version = getCurrentProductVersion();

  if (current_version.substring(0,3) == "1.5" || current_version.substring(0,3) == "1.6") {
    var properties_to_move = [
      "example_string",
      "example_migrated_integer",
      "example_boolean",
      "example_dropdown",
      "example_domain",
      "example_wildcard_domain",
      "example_string_list",
      "example_text",
      "example_ldap_url",
      "example_email",
      "example_http_url",
      "example_ip_address",
      "example_ip_ranges",
      "example_multi_select_options",
      "example_network_address_list",
      "example_network_address",
      "example_port",
      "example_smtp_authentication",
      "generated_rsa_cert_credentials",
      "generated_rsa_pkey_credentials",
      "generated_salted_credentials",
      "generated_simple_credentials",
      "generated_secret",
      "generated_uuid"
    ];

    for (var i in properties_to_move) {
      var property_name = properties_to_move[i];
      input.properties['.web_server.' + property_name] = input.properties['.properties.' + property_name];
      delete input.properties['.properties.' + property_name];
    }
  }
  return input;
};
