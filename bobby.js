var camera, scene, renderer;
var mesh;
var mouseX = 0, mouseY = 10;
var menu = 1;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var rotate;
var hero_obj;
var plane;
var Material_characters;
var level = 0;
var gui = 0;
var colision = [[]];
var carrot_pos = [[]];
var carrot = [];
var nb_carrot ;

var cube = [];

		
init();
animate();



function init() {

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	scene = new THREE.Scene();


	init_menu();


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

function init_menu() {

	camera.position.z = 5;
	camera.position.y = 10;
	camera.position.x = 0;
	camera.rotation.x = -1;

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

	var Gmenu = new THREE.TextGeometry( "-----------***-------------", {
		size: 1.2, height: 0.4, curveSegments: 3,
		font: "helvetiker", weight: "normal", style: "normal",
	});

	Material_characters = new THREE.MeshLambertMaterial( { color: 0xEEEEEE} );

	mesh_title = new THREE.Mesh( Gtitle, Material_characters );
	mesh_menu = new THREE.Mesh( Gmenu, Material_characters );
	minus = new THREE.Mesh( moins, Material_characters );
	maxus = new THREE.Mesh( plus, Material_characters );


	scene.add( minus );
	scene.add( maxus );		
	scene.add( mesh_title );
	scene.add( mesh_menu );

	setbasepostion (-7.8,0.5,minus);
	setbasepostion (-7.8,2.5,maxus);
	setbasepostion (-8,-2,mesh_menu);
	setbasepostion (-15,-7,mesh_title);


	minus.rotation.x  -= 1.571;
	maxus.rotation.x  -= 1.571;
	mesh_menu.rotation.x  -= 1;
	mesh_title.rotation.x  -= 0.8;

	minus.rotation.y  = 0.15;
	maxus.rotation.y  = 0.15;
}

function initgui() {
  var gui = new dat.GUI({ autoPlace: false });
  var customContainer = document.getElementById('gui');
	customContainer.appendChild(gui.domElement);

	var f0x = gui.addFolder('camera position');
	f0x.add(camera.position, 'x', -25, 25);
	f0x.add(camera.position, 'y', -25, 25);
	f0x.add(camera.position, 'z', -25, 25);

	var f0 = gui.addFolder('camera rotation');
	f0.add(camera.rotation, 'x', -6, 6);
	f0.add(camera.rotation, 'y', -6, 6);
	f0.add(camera.rotation, 'z', -6, 6);


	var f1 = gui.addFolder('hero position');
	f1.add(hero_obj.position, 'x', -15, 15);
	f1.add(hero_obj.position, 'y', -15, 15);
	f1.add(hero_obj.position, 'z', -15, 15);


	var f2 = gui.addFolder('hero size');
	f2.add(hero_obj.scale, 'x', 0.10, 15);
	f2.add(hero_obj.scale, 'y', 0.10, 15);
	f2.add(hero_obj.scale, 'z', 0.10, 15);
	// f2.add(params, 'interation')

	var f3 = gui.addFolder('plane rotation');
	f3.add(plane.rotation, 'x', -6, 6);
	f3.add(plane.rotation, 'y', -6, 6);
	f3.add(plane.rotation, 'z', -6, 6);

	// var f4 = gui.addFolder('plane2');
	// f4.add(plane.rotation, 'x', -5, 5);
	// f4.add(plane.rotation, 'y', -5, 5);
	// f4.add(plane.rotation, 'z', -5, 5);
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


function detect (lol) {
	var x, z;

	z = hero_obj.position.z;
	x =	hero_obj.position.x;

	switch(lol) {
		case 37: /*gauche*/
			x =	x - 1;
		break;
		case 39: /*droite*/
			x = x + 1;
		break;
		case 38: /*haut*/
			z = z - 1;
		break;
		case 40: /*bas*/
			z = z + 1;
		break;	
	}

	for(var i = 0; i < colision.length; i++){
    if (colision[i][0] == x && colision[i][1] ==  z) {
      	return (1);
      }
		}
	return (0);
}

function onKeyDown ( event ) {

	// console.log(event.keyCode);

	if (hero_obj && detect(event.keyCode) == 0) {
		switch( event.keyCode ) {
			case 37: /*gauche*/
				hero_obj.rotation.y = 0.1;
				hero_obj.position.x -= 1;
				if (menu == 0) { camera.position.x -= 1;}
			break;

			case 39: /*droite*/
				hero_obj.rotation.y = 3.5;
				hero_obj.position.x += 1;
				if (menu == 0) { camera.position.x += 1;}
			break;

			case 38: /*haut*/
				hero_obj.rotation.y = 5;
				hero_obj.position.z -= 1;
				if (menu == 0) { camera.position.z -= 1;}
			break;

			case 40: /*bas*/
				hero_obj.rotation.y = 1;
				hero_obj.position.z += 1;
				if (menu == 0) { camera.position.z += 1;}
			break;	
		}
	}
};


function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}


function initlevel(level_name, size_wall, titley){
	scene.remove( mesh_title );
	var Gtitle = new THREE.TextGeometry(level_name, {
		size: 3, height: 1.5, curveSegments: 3,
		font: "helvetiker", weight: "bold", style: "normal",
	});
	mesh_title = new THREE.Mesh( Gtitle, Material_characters );

	scene.add( mesh_title );
	setbasepostion (-6,	titley, mesh_title);
	mesh_title.rotation.x  -= 0.8;




	var geometry = new THREE.CubeGeometry( 0.7, 0.7, 0.7 );
	var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );

	var length = size_wall;
	var height = length;

	var side = [[-(length/2),-(length/2)],[(height/2),-(height/2)]];

	for(var i = 0; i < length; i++){

		for(var j = 0; j < 2; j++){
			cube[i+(length*j)] = new THREE.Mesh( geometry, material );
			scene.add( cube[i+(length*j)] );
			colision[i+(length*j)] = [ side[j][0] ,i + side[j][1]];
			setbasepostion (colision[i+(length*j)][0],colision[i+(length*j)][1],cube[i+(length*j)]);
		}
	}

	for(var i = 0; i < length; i++){
			for(var j = 2; j < 4; j++){
			cube[i+(length*j)] = new THREE.Mesh( geometry, material );
			scene.add( cube[i+(length*j)] );
			colision[i+(length*j)] = [ i + side[j-2][1] ,side[j-2][0]];
			setbasepostion (colision[i+(length*j)][0],colision[i+(length*j)][1],cube[i+(length*j)]);
		}
	}
	cube[length*4+1] = new THREE.Mesh( geometry, material );
	scene.add( cube[length*4+1] );
	colision[length+1] = [length / 2,length/2];
	setbasepostion (colision[length+1][0],colision[length+1][1],cube[length*4+1]);

	var geometry = new THREE.CylinderGeometry(0, 0.3, 2, 50, 50, false);
	var material = new THREE.MeshLambertMaterial( { color: 0xffffff } );


	for(var i = 0; i < nb_carrot; i++){
		carrot[i] = new THREE.Mesh( geometry, material );
		scene.add( carrot[i] );
		carrot[i].position.y = 0.5;
		setbasepostion(carrot_pos[i][0],carrot_pos[i][1],carrot[i])
	}
}



function initlevel1() {
	scene.remove( minus );
	scene.remove( maxus );	
	scene.remove( mesh_menu );

	nb_carrot = 3;
	carrot_pos = [[0,2],[-2,3],[3,0]];

	initlevel("Level1", 8, -9);

}

function initlevel2() {
	for(var i = 0; i < (cube.length * 2); i++){
		scene.remove( cube[i] );
	}

	nb_carrot = 5;
	carrot_pos = [[4,4],[-2,3],[3,1],[3,-4],[1,4]];

	initlevel("Level2", 10, -8);
}

function carrot_verif() {
	for(var i = 0; i < carrot_pos.length; i++){
		if (hero_obj.position.x == carrot_pos[i][0] && hero_obj.position.z == carrot_pos[i][1] && 
			carrot_pos[i] != false ) {
			scene.remove( carrot[i] );
			nb_carrot -= 1;
			carrot_pos[i] = false;
		}
	}
	return ((nb_carrot == 0) ? 0 : 1);
}


function restore_menu() {
	for(var i = 0; i < (cube.length * 2); i++){
		scene.remove( cube[i] );
		colision[i] = false;
	}

	scene.remove( mesh_title );

	nb_carrot = 0;
	carrot_pos = [];


	level = 0;
	menu = 1;
	init_menu();
	setbasepostion (2,1,hero_obj);
	hero_obj.rotation.y = 0.1;
}

function animate() {

	requestAnimationFrame( animate );
	stats.update();

 	if (hero_obj && gui == 0) {
		initgui();
		gui = 1;
	}

	if ( hero_obj && hero_obj.position.x == -2 && hero_obj.position.z == 0 && menu == 1 && level == 0) {
		setbasepostion (0,0,hero_obj);
		initlevel1();
		level = 1;
		menu = 0;
	}

	if (hero_obj && level == 1 && carrot_verif() == 0)
	{
		initlevel2();
		console.log("level 2");
		level = 2;
	}

	if (hero_obj && level == 2 && carrot_verif() == 0) {
		restore_menu();
	}

 renderer.render( scene, camera );


}
