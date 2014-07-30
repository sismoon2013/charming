/* globals describe, it, expect, charm */

describe('charm', function () {

  var createElement = function (innerHTML) {
    var elem = document.createElement('div');
    elem.innerHTML = innerHTML || '';
    document.body.appendChild(elem);
    return elem;
  };

  it('should not inject spans when element has no child nodes', function() {
    var elem = createElement();
    charm(elem);
    expect(elem.innerHTML).toMatch('');
  });

  it('should not inject spans when element has no child text nodes', function() {
    var innerHTML = '<span></span>',
      elem = createElement(innerHTML);
    charm(elem);
    expect(elem.innerHTML).toMatch(innerHTML);
  });

  it('should inject spans when element has a single child text node', function() {
    var elem = createElement('foo');
    charm(elem);
    expect(elem.innerHTML).toMatch('<span class="char0">f</span><span class="char1">o</span><span class="char2">o</span>');
  });

  it('should inject spans when element has multiple child text nodes', function() {
    var elem = createElement('<span>foo</span> <span>bar <span>baz</span></span>');
    charm(elem);
    expect(elem.innerHTML).toMatch('<span><span class="char0">f</span><span class="char1">o</span><span class="char2">o</span></span><span class="char3"> </span><span><span class="char4">b</span><span class="char5">a</span><span class="char6">r</span><span class="char7"> </span><span><span class="char8">b</span><span class="char9">a</span><span class="char10">z</span></span></span>');
  });

  it('can inject custom tags', function() {
    var elem = createElement('foo');
    charm(elem, {
      tagName: 'b'
    });
    expect(elem.innerHTML).toMatch('<b class="char0">f</b><b class="char1">o</b><b class="char2">o</b>');
  });

  it('can inject spans without classes', function() {
    var elem = createElement('foo');
    charm(elem, {
      classPrefix: false
    });
    expect(elem.innerHTML).toMatch('<span>f</span><span>o</span><span>o</span>');
  });

  it('can inject spans with a custom class prefix', function() {
    var elem = createElement('foo');
    charm(elem, {
      classPrefix: 'c'
    });
    expect(elem.innerHTML).toMatch('<span class="c0">f</span><span class="c1">o</span><span class="c2">o</span>');
  });

});