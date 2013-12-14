var camera, scene, renderer;
var mesh;
var mouseX = 0, mouseY = 10;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var rotate;
var hero_obj;
var plane;

		// var audio = document.getElementById("music")
		// audio.volume=0.2;
		
init();
animate();

function init() {

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	scene = new THREE.Scene();

	var geometry = new THREE.PlaneGeometry(121,121, 121, 121);
	var material = new THREE.MeshLambertMaterial( { color: 0xffffff, wireframe: true } );
	plane = new THREE.Mesh( geometry, material );
	scene.add( plane );
	plane.position.y -= 0.5;
	plane.rotation.x -= 1.571;

	var Gtitle = new THREE.TextGeometry( "{Bobby Carrot}", {
		size: 3, height: 0.5, curveSegments: 3,
		font: "helvetiker", weight: "bold", style: "normal",
	});

	var plus = new THREE.TextGeometry( "Create  •", {
		size: 1.1, height: 0.2, curveSegments: 3,
		font: "helvetiker", weight: "normal", style: "normal",
	});

	var moins = new THREE.TextGeometry( "Play      •", {
		size: 1.1, height: 0.2, curveSegments: 3,
		font: "helvetiker", weight: "normal", style: "normal",
	});

	var Gmenu = new THREE.TextGeometry( "--------------------------", {
		size: 1.2, height: 0.4, curveSegments: 3,
		font: "helvetiker", weight: "normal", style: "normal",
	});

	var Material_characters = new THREE.MeshLambertMaterial( { color: 0xEEEEEE} );

	mesh_title = new THREE.Mesh( Gtitle, Material_characters );
	mesh_menu = new THREE.Mesh( Gmenu, Material_characters );
	minus = new THREE.Mesh( moins, Material_characters );
	maxus = new THREE.Mesh( plus, Material_characters );


	scene.add( minus );
	scene.add( maxus );		
	scene.add( mesh_title );
	scene.add( mesh_menu );

	minus.rotation.x  -= 1.571;
	maxus.rotation.x  -= 1.571;
	mesh_menu.rotation.x  -= 1;
	mesh_title.rotation.x  -= 0.8;

	minus.rotation.y  += 0.15;
	maxus.rotation.y  += 0.15;
	mesh_menu.rotation.y  += 0;

	camera.position.z = 5;
	camera.position.y = 10;
	camera.rotation.x -= 1;

	setbasepostion (-7.8,0.5,minus);
	setbasepostion (-7.8,2.5,maxus);
	setbasepostion (-8,-2,mesh_menu);
	setbasepostion (-15,-7,mesh_title);


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
	var light4 = new THREE.PointLight( 0x9922ff, 0.6, 5 );
	light4.position.set( -2, 2, 2 );
	scene.add( light4 );
	//blue light (ond a droite)
	var light5 = new THREE.PointLight( 0x0000ff, 0.8, 30 );
	light5.position.set( 8, 2, -6 );
	scene.add( light5 );
	//red light
	var light6 = new THREE.PointLight( 0xff4444, 0.8, 20 );
	light6.position.set( -9, 2, 0 );
	scene.add( light6 );
	//white
	var light7 = new THREE.PointLight( 0x00ffff, 0.6, 10 );
	light7.position.set( 0, 0, -8);
	scene.add( light7);
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



	var jsonLoader = new THREE.JSONLoader();
	jsonLoader.load( "objs/bunny_obj.js", addModelToScene ); 

}

window.onload = function() {
  var gui = new dat.GUI();

	var f1 = gui.addFolder('hero position');
	f1.add(hero_obj.position, 'x', -5, 5);
	f1.add(hero_obj.position, 'y', -5, 5);
	f1.add(hero_obj.position, 'z', -5, 5);


	var f2 = gui.addFolder('hero size');
	f2.add(hero_obj.scale, 'x', -5, 5);
	f2.add(hero_obj.scale, 'y', -5, 5);
	f2.add(hero_obj.scale, 'z', -5, 5);

	var f3 = gui.addFolder('plane');
	f3.add(plane.rotation, 'x', -5, 5);
	f3.add(plane.rotation, 'y', -5, 5);
	f3.add(plane.rotation, 'z', -5, 5);

	// var f4 = gui.addFolder('plane2');
	// f4.add(plane.rotation, 'x', -5, 5);
	// f4.add(plane.rotation, 'y', -5, 5);
	// f4.add(plane.rotation, 'z', -5, 5);

	gui.close();
};


function addModelToScene( geometry, materials ) {
	var material = new THREE.MeshFaceMaterial( materials );
	hero_obj = new THREE.Mesh( geometry, material );
	hero_obj.scale.set(0.18,0.18,0.18);
	scene.add( hero_obj );
	setbasepostion (2,1,hero_obj);
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
	console.log("pos en x :" + hero_obj.position.x);
		hero_obj.position.x -= 1;
		hero_obj.rotation.y = 0.1;
		break;

		case 39: /*droite*/
		console.log("pos en x :" + hero_obj.position.x);
		hero_obj.rotation.y = 3.5;
		hero_obj.position.x += 1;
		break;

		case 38: /*haut*/
		console.log("pos en z :" + -hero_obj.position.z);
		hero_obj.rotation.y = 5;
		hero_obj.position.z -= 1;
		break;

		case 40: /*bas*/
		console.log("pos en z :" + -hero_obj.position.z);
		hero_obj.rotation.y = 1;
		hero_obj.position.z += 1;
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
