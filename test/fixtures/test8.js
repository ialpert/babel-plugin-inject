(function (injectCSS, fixture) {


  global.test8Fixture = fixture;

  injectCSS(fixture);

}(inject('injectCSS'), inject('fixture.css')));