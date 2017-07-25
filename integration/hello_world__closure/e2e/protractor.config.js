const protractorCapabilities = require('../../../browser-providers.conf.js').protractorCapabilities;

exports.config = {
  specs: [
    '../built/e2e/*.e2e-spec.js'
  ],
  capabilities: protractorCapabilities,
  directConnect: true,
  baseUrl: 'http://localhost:8080/',
  framework: 'jasmine',
  useAllAngular2AppRoots: true
};
