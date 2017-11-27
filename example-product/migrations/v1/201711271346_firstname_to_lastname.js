exports.migrate = function(input) {
  console.log('inside Caitlyn & Brian migration');
  console.log('the properties passed to migrate are: ');
  console.log(JSON.stringify(input));

  if ( input.properties['.properties.caitlyn_and_brian_selector']['value'] === 'caitlyn' ) {
    console.log('*******************************************\n')
    input.properties['.properties.yu_and_cunnie_selector'] = {'value': 'yu'};
    console.log(JSON.stringify(input.properties))
  }

  return input;
};
