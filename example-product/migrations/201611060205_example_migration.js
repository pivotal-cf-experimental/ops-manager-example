exports.migrate = function(properties) {
    //console.log('the properties passed to migrate are: ', properties);

    // Append '!'
    properties['product_properties']['example_string']["value"] = properties['product_properties']['example_string']["value"] + '!';

    // Rename property "example_port" => "example_port_renamed"
    properties['product_properties']['example_port_renamed'] = properties['product_properties']['example_port'];
    delete properties['product_properties']['example_port'];

    // Append "new-string-appended-by-v1" to string_list
    var string_list = properties['product_properties']['example_string_list']['value'].split(',');
    string_list.push('new-string-appended-by-v1');
    properties['product_properties']['example_string_list']['value'] = string_list.join(',');

    console.log(properties);
    return properties;
};
