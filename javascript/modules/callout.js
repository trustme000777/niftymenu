import Prefs from 'prefs.js'

/**
 * @namespace Callout
 * @private
 * @memberof  Nifty
 * @description Methods for adding callouts to items
 */
const Callout = (function() {
  /**
   * Sets the arrow callout
   * @memberof   Callout
   *
   * @param      {boolean}  bool    Add or remove arrow
   * @param      {element}   el     DOM element or jQuery object, applies to all .arrow if empty
   * @return     {boolean}  Result
   */
  const setArrow = (bool, el) => {
    if (!el && !bool) {
      $('.arrow').each(function(i,n) {
        setArrow(false,$(n));
      });
      return;
    }

    if (!(el instanceof jQuery)) {
      el = $(el);
    }

    if (el.get(0).tagName !== 'LI') {
      el = el.parents('li').first();
    }

    if (bool) {
      setArrow(false);
      setShortcut(false);
      const style = Prefs.get('arrowStyle') || 'arrow';
      const direction = el.find('ul').length ? 'left' : 'right';
      $('.clicked').removeClass('clicked');
      el.addClass('arrow arrow-'+style+' clicked '+direction).append('<b><i></i></b>');
      el.parents('li').addClass('clicked');
    } else {
      el.removeClass('arrow arrow-arrow arrow-circle').find('b').remove();
    }
  };

  /**
   * Toggles the arrow callout
   * @memberof   Callout
   *
   * @param      {jquery}   el      jQuery object, all .arrow if empty
   * @return     {boolean}  Result
   */
  const toggleArrow = (el) => {
    if (!el) {
      setArrow(false);
      return;
    }

    if (!(el instanceof jQuery)) {
      el = $(el);
    }

    if (el.hasClass('arrow')) {
      setArrow(false, el);
    } else {
      setArrow(false);
      setShortcut(false);
      setArrow(true, el);
    }
  };

  /**
   * Sets the shortcut callout
   * @memberof   Callout
   *
   * @param      {boolean}  bool    Add or remove shortcut callout
   * @param      {element}   el     DOM element or jQuery object containing shortcut,
   *                                applies to all .shortcut-callout if empty
   * @return     {boolean}  Result
   */
  const setShortcut = (bool, el) => {
    if (!el && !bool) {
      $('.shortcut-callout').each(function(i,n) {
        setShortcut(false,$(n));
      });
      return;
    }

    if (!(el instanceof jQuery)) {
      el = $(el);
    }

    if (el.get(0).tagName !== 'LI') {
      el = el.parents('li').first();
    }

    if (bool) {
      setShortcut(false);
      setArrow(false);
      $('.clicked').removeClass('clicked');
      el.addClass('clicked').find('.shortcut').addClass('shortcut-callout');
      el.parents('li').addClass('clicked');
    } else {
      el.find('.shortcut').removeClass('shortcut-callout');
    }
  };

  /**
   * Toggles the shortcut callout
   * @memberof   Callout
   *
   * @param      {jquery}   el      jQuery object, all .arrow if empty
   * @return     {boolean}  Result
   */
  const toggleShortcut = (el) => {
    if (!el) {
      setShortcut(false);
      return;
    }

    if (!(el instanceof jQuery)) {
      el = $(el);
    }

    if (el.has('.shortcut-callout').length) {
      setShortcut(false, el);
    } else {
      setShortcut(false);
      setShortcut(true, el);
    }
  };

  /**
   * Toggles a checkmark on the clicked menu item.
   * @memberof   Callout
   * @param      {jquery}   el      jQuery object, all .arrow if empty.
   * @return     {boolean}  Result
   */
  const toggleCheckmark = (el) => {
    if (!(el instanceof jQuery)) {
      el = $(el);
    }

    if (el.hasClass('checked')) {
      el.removeClass('checked');
    } else {
      el.addClass('checked');
    }
    return true;
  };

  /**
  * Sets the style of the callout arrow
  * @memberof   Callout
  * @param      {string}  style    'circle' or 'arrow'
  */
  const setArrowStyle = (style) => {
    let newStyle = 'arrow';
    if (style && style === 'circle') {
      newStyle = 'circle';
      $('.arrow-arrow').removeClass('arrow-arrow').addClass('arrow-circle');
    } else {
      $('.arrow-circle').removeClass('arrow-circle').addClass('arrow-arrow');
    }
    Prefs.set('arrowStyle', newStyle);
  };

  /**
   * Toggles arrow style between circle and arrow.
   * @memberof   Callout
   */
  const toggleArrowStyle = () => {
    let newStyle;
    const current = Prefs.get('arrowStyle');
    if (current === 'circle') {
      newStyle = 'arrow';
      $('#arrowStyle','.controls').text('Arrow style: Arrow');
    } else {
      newStyle = 'circle';
      $('#arrowStyle','.controls').text('Arrow style: Circle');
    }
    setArrowStyle(newStyle);
  };

  return {
    setArrow,
    setArrowStyle,
    toggleArrowStyle,
    toggleArrow,
    toggleCheckmark,
    setShortcut,
    toggleShortcut
  }
})();

export default Callout;
