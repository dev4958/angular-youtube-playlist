'use strict';

export default {
  class: '.animated-image',
  animation: function() {
    return {
      enter: function(element, done) {
        let controller = element.controller('animatedImage');
        controller.fadeIn(controller.image, done);
      },
      leave: function(element, done) {
        let controller = element.controller('animatedImage');
        controller.fadeOut(controller.image, done);
      }
    };
  }
}
