// create and export configuration variables

// container for all environments
let environment = {};

//staging default environment
environment.staging = {
    'port': 3000,
    'envName': 'staging'
};

// producton environment
environment.production = {
    'port': 5000,
    'envName': 'production'
};

//  determine which environment should be passed as a command line argument
let currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// check that the current environment is one of the environments above, if not, default to staging
let environmentToExport = typeof(environment[currentEnvironment]) == 'object' ? environment[currentEnvironment] : environment.staging;

// export the module
module.exports = environmentToExport;