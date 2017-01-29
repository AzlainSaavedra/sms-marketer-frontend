/**
 * Created by azlain on 28/01/17.
 */
angular.module('standartApp')
.filter('ruleName', function() {

    // In the return function, we must pass in a single parameter which will be the data we will work on.
    // We have the ability to support multiple other parameters that can be passed into the filter optionally
    return function(input, params, optional2) {
        var output;
        for(var i=0;i<params.length;i++){
            if(params[i].id == input){
                output = params[i].name;
                break;
            }else{
                output = null;
            }
        }

        return output;
    }

});