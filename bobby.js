
var camera, scene, renderer;
var mesh;
var caube;
var mouseX = 0, mouseY = 10;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var rotate;
var hero_obj;

		// var audio = document.getElementById("music")
		// audio.volume=0.2;
		
init();
animate();

function init() {

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 400;

	scene = new THREE.Scene();

	var geometry = new THREE.PlaneGeometry(121,121, 121, 121);
	var material = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: true } );
	plane = new THREE.Mesh( geometry, material );
	scene.add( plane );
	plane.position.y -= 0.5;
	plane.rotation.x -= 1.571;

	var geometry = new THREE.SphereGeometry(0.6,32,16);
	var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );
	hero = new THREE.Mesh( geometry, material );
	scene.add( hero );

	var helper = new THREE.WireframeHelper( hero );
	helper.material.depthTest = true;
	helper.material.opacity = 1;
	helper.material.transparent = true;	
	helper.material.color.set( 0x0000ff );
	scene.add( helper );



	var geometry_volume = new THREE.TextGeometry( "VOLUME", {
		size: 1.2, height: 0.2, curveSegments: 3,
		font: "helvetiker", weight: "normal", style: "normal",
	});

	var plus = new THREE.TextGeometry( "+", {
		size: 1.3, height: 0.2, curveSegments: 3,
		font: "helvetiker", weight: "normal", style: "normal",
	});

	var moins = new THREE.TextGeometry( "-", {
		size: 1.3, height: 0.2, curveSegments: 3,
		font: "helvetiker", weight: "normal", style: "normal",
	});

	var zero = new THREE.TextGeometry( "stop", {
		size: 0.5, height: 0.15, curveSegments: 3,
		font: "helvetiker", weight: "normal", style: "normal",
	});

	var red1 = new THREE.MeshLambertMaterial( { color: 0xEEEEEE} );
	var red2 = new THREE.MeshLambertMaterial( { color: 0xEEEEEE} );
	var play = new THREE.MeshLambertMaterial( { color: 0xEEEEEE} );
	minus = new THREE.Mesh( moins, red1 );
	maxus = new THREE.Mesh( plus, red2 );
	play = new THREE.Mesh( geometry_volume, play );
	zerom = new THREE.Mesh( zero, red2 );

	scene.add( minus );
	scene.add( maxus );		
	scene.add( play );
	scene.add( zerom );

	minus.rotation.x  -= 1.571;
	maxus.rotation.x  -= 1.571;
	zerom.rotation.x  -= 1.571;
	play.rotation.x  -= 1;

	minus.rotation.y  += 0.15;
	maxus.rotation.y  += 0.15;
	zerom.rotation.y  += 0.15;

	camera.position.z = 5;
	camera.position.y = 10;
	camera.rotation.x -= 1;


	//red
	var light = new THREE.PointLight( 0xff0000, 0.7, 12 );
	light.position.set( 2, 2, 1 );
	scene.add( light );
	//bleu
	var light2 = new THREE.PointLight( 0x0000ff, 0.9, 12 );
	light2.position.set( -2, 2, 1 );
	scene.add( light2 );
	//vert
	var light3 = new THREE.PointLight( 0x00ff00, 0.6, 12 );
	light3.position.set( 2, 2, 3 );
	scene.add( light3 );
	//violet
	var lightw = new THREE.PointLight( 0x9922ff, 0.6, 5 );
	lightw.position.set( -2, 2, 2 );
	scene.add( lightw );
	//?
	var lightw = new THREE.PointLight( 0x0000ff, 0.8, 30 );
	lightw.position.set( 8, 2, -6 );
	scene.add( lightw );
	//blue light
	var lightw = new THREE.PointLight( 0xff4444, 0.8, 20 );
	lightw.position.set( -9, 2, 0 );
	scene.add( lightw );
	//?
	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.09 );
	directionalLight.position.set( 0, 2, 0 );
	scene.add( directionalLight );

	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'keydown', onKeyDown, false );

	
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );

	setbasepostion (-7.8,0.7,minus);
	setbasepostion (-4.4,0.7,maxus);
	setbasepostion (-6.4,0.4,zerom);
	setbasepostion (-9,-1,play);

	var jsonLoader = new THREE.JSONLoader();
	jsonLoader.load( "objs/bunny_obj.js", addModelToScene ); 
	setbasepostion (0,2,hero);
}


function addModelToScene( geometry, materials ) {
	var material = new THREE.MeshFaceMaterial( materials );
	hero_obj = new THREE.Mesh( geometry, material );
	hero_obj.scale.set(0.18,0.18,0.18);
	scene.add( hero_obj );
	setbasepostion (2,2,hero_obj);
	hero_obj.position.y = 0.4;
};

function setbasepostion ( a , b, elem ) {

	elem.position.x = a;
	elem.position.z = b;
};


function onKeyDown ( event ) {

	console.log(event.keyCode);

	switch( event.keyCode ) {
	//38 haut
	//40 bas
	//37 gauche
	//39 droite

	case 37: /*gauche*/
	console.log("pos en x :" + hero.position.x);
		//hero_obj.position.x -= 1;
		//hero_obj.rotation.y = 0.1;
		hero.position.x -= 1;
		break;

		case 39: /*droite*/
		console.log("pos en x :" + hero.position.x);
		//					hero_obj.rotation.y = 3.5;
		//					hero_obj.position.x += 1;
		hero.position.x += 1;
		break;

		case 38: /*haut*/
		console.log("pos en z :" + -hero.position.z);
		//					hero_obj.rotation.y = 5;
		//					hero_obj.position.z -= 1;
		hero.position.z -= 1;
		break;

		case 40: /*bas*/
		console.log("pos en z :" + -hero.position.z);
		//					hero_obj.rotation.y = 1;
		//					hero_obj.position.z += 1;
		hero.position.z += 1;
		break;	
	}
};

var timeplus = 0;

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

	requestAnimationFrame( animate );
//.rotation.y += 0.01;
stats.update();

 // if ( hero.position.x == -8 && hero.position.z == 0) {
 // 	audio.volume = 0.3;
 // }

 // if ( hero.position.x == -6 &&	hero.position.z == 0) {
 // 	audio.volume = 0;
 // }

 // if ( hero.position.x == -4 &&	hero.position.z == 0) {
 // 	audio.volume = 0.9;
 // }

 renderer.render( scene, camera );
}
