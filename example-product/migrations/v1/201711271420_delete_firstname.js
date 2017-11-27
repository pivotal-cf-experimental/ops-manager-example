exports.migrate = function(input) {
  console.log('inside Caitlyn & Brian migration, stage two');
  console.log('the properties passed to migrate are: ');
  console.log(JSON.stringify(input));

  delete input.properties['.properties.yu_and_cunnie_selector'];
  return input;
};
