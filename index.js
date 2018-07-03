var postcss = require('postcss');

/**
 * Check if specified selector is a :host
 * @param  {String} selector
 * @return {Boolean}
 */
function isHostSelector(selector) {
  return /\:host:/.test(selector);
}

/**
 * Returns :host(:pseudo-selector) from a wrong :host:pseudo-selector
 * @param  {String} selector
 * @return {String}
 */
function getChangedHostSelector(selector) {
  return selector.replace(/:host:(.+)/, ':host(:$1)');
}

/**
 * PostCSS rule optimiser
 * @param {Rule} rule 
 */
function optimise(rule) {
  if (rule.selectors) {
    rule.selectors = rule.selectors.map(selector => {
      if (isHostSelector(selector)) {
        return getChangedHostSelector(selector);
      }
      return selector;
    });
  }
}

module.exports = postcss.plugin('postcss-minify-selectors', () => {
  return css => css.walkRules(optimise);
});
