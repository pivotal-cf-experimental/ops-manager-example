exports.migrate = function(input) {
  // To view JavaScript console logs in the Rails debug log, be sure to make them single value and to only pass them
  // strings.  JSON.stringify is an easy way to dump a structure.
  console.log('the properties passed to migrate are: ');
  console.log(JSON.stringify(input));
  //migrate a secret
  input.properties['.properties.pineapple'] =
    { 'value': input.properties['.properties.example_selector.pizza_option.pineapple']['value'] };

  return input;
};
