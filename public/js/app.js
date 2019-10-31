var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();

var controls = new THREE.OrbitControls( camera, renderer.domElement );

var light = new THREE.PointLight( 0x00f0000, 1, 100 );
light.position.set( 5, 5, 5 );
scene.add( light );

var loader = new THREE.CubeTextureLoader();
loader.setPath( 'textures/' );
loader.setCrossOrigin('anonymous'); 

var textureCube = loader.load( [
	'wood.jpg', 'wood.jpg',
	'wood.jpg', 'wood.jpg',
	'monopoly_board.jpg', 'wood.jpg'
] );
textureCube.minFilter = THREE.LinearFilter

textureCube.repeat.x = 1; 
//textureCube.offset.x = 0.5 * ( 1 - textureCube.repeat.x );


controls.dampingFactor = 0.1; // friction
controls.rotateSpeed = 0.5; // mouse sensitivity
controls.maxPolarAngle = 2*Math.PI;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 5, 5, .1 );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

controls.update();

var animate = function () {
	requestAnimationFrame( animate );
    controls.update();
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
    renderer.render( scene, camera );
};

animate();
