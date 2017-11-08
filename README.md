# VideoJS Viewability

*VideoJS Viewability* script, allows to handle viewability for multiple videos

## Demo 1

![Viewability Demo 1](https://irfansimsar.github.io/videojs-viewability/demo-video-1.gif "Viewability Demo 1")


## Demo 2

![Viewability Demo 2](https://irfansimsar.github.io/videojs-viewability/demo-video-2.gif "Viewability Demo 2")

## Usage

### Step 1
Add script to your page
```html
<script type="text/javascript" src="viewability.js"></script>
```
### Step 2
- Create a array to hold players that init
- Push every player objects to players array
```javascript
var players = [] // Create a array to hold players that init
function initPlayer (id) {
  /* Your Player Configuration */
  window[`quark-${id}`] = new videojs(`#${id}`, {
    techOrder: ['html5'],
    'autoplay': false
  });
  
  window[`quark-${id}`].src({
    src: 'sample.mp4',
    type: 'video/mp4'
  });

  /* Push player objects to players array on every init
     to handle viewability between each other */
  players.push(window[`quark-${id}`])
}

/* Init players */
initPlayer('player-1')
initPlayer('player-2')
initPlayer('player-3')
```

### Step 3
Create new Viewability instance with players array
```javascript
/* Init Viewability */
var viewability = new Viewability({
  players: players
})
```