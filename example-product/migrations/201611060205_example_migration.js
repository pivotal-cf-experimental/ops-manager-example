exports.migrate = function(properties) {
  // To view JavaScript console logs in the Rails debug log, be sure to make them single value and to only pass them
  // strings.  JSON.stringify is an easy way to dump a structure.
  console.log('the properties passed to migrate are: ');
  console.log(JSON.stringify(properties));

  // Changing a selector option
  var currentPepperoniValue = properties.product_properties.example_selector.options.pizza_option.pepperoni.value;
  properties.product_properties.example_selector.options.pizza_option.pepperoni.value = !currentPepperoniValue;

  return properties;
};
