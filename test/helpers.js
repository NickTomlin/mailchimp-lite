var chai = require('chai');
var sinon = require('sinon');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

global.expect = chai.expect;
global.sinon = sinon;
global.sandbox = sinon.sandbox.create();

afterEach(function () {
  global.sandbox.restore();
});
