function Viewability (options) {
  var that = this;

  /* Check videos in view first load */
  this.checkVideosInview(options.players);

  /* Listen scroll to check videos in view */
  document.addEventListener('scroll', this.debounce(function () {
    that.checkVideosInview(options.players);
  }, 200));
}

Viewability.prototype.debounce = function (func, wait, immediate) {
	var timeout;
	return function() {
    var context = this;
    var args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/* Check item in viewport */
Viewability.prototype.checkInview = function (id) {
  var element = document.getElementById(id);
  var rect = element.getBoundingClientRect();
  if (rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.top.innerHeight) &&
      rect.right <= (window.top.innerWidth)
  ) {
    return true;
  }
  return false;
}

/* Play Video */
Viewability.prototype.playVideo = function (player) {
  player.isPlaying = true;
  player.player_.play();
}

/* Pause Video */
Viewability.prototype.pauseVideo = function (player) {
  player.isPlaying = false;
  player.player_.pause();
}

/* Check Videos in viewport */
Viewability.prototype.checkVideosInview = function (players, fnCalled) {
  var that = Viewability.prototype;
  var playingVideo = players.filter(function (player) {
    return player.isPlaying === true
  });

  players.forEach(function (player) {
    if (!that.checkInview(player.options_.id)) {
      that.pauseVideo(player);
    } else {
      if (playingVideo.length === 0) {    
        return that.playVideo(player);
      }
    }
  })

  /* If function called outside check again to handle many videos in viewport */
  if (fnCalled !== 'inner') that.checkVideosInview(players, 'inner');
}
