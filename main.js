var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 200, 5000);

camera.position.set(-300, 250, 300);

//point camera at given coordinate
camera.lookAt(new THREE.Vector3(0,0,0));

var renderer = new THREE.WebGLRenderer({ antialias: true })

//set a near white clear color
renderer.setClearColor(0x000000);

//renderer size should be the same as the window
renderer.setSize(window.innerWidth, window.innerHeight);



document.body.appendChild(renderer.domElement);


window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector3()

var plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 200, 200, 20, 20 ),
	new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } )
	);
plane.rotateX(Math.PI/2);
// scene.add(plane);


//make some shapes!
var geometry = new THREE.SphereGeometry(4, 32, 32);

let sphereArr = [];

sphereX = -10;
//make loop for multiples



for (var h = 0; h < 10;) {
	let spherePosY = 4 + (10 * h)
	for(var i = 0; i < 10;) {
		let spherePosZ = -100 + (10 * i);
		for(var j = 0; j < 10; j++) {
			var randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
			var material = new THREE.MeshLambertMaterial( {color: randomColor} )
			var sphere = new THREE.Mesh( geometry, material );
			sphere.position.x = -10 + j * 10;
			sphere.position.y = spherePosY;
			sphere.position.z = spherePosZ;
			// sphere.position.z = 4 - i * 10;
			sphereArr.push(sphere);
			scene.add(sphere);
			sphereX += 1;
		}
		i++;
	}
	h++;
}



var light = new THREE.PointLight( 0xffffff, 1, 3000 );
light.position.set(40, 250, 200)
scene.add( light );

var pointLight3 = new THREE.PointLight( 0xffffff, 1.2, 2000);
pointLight3.position.set(-100, -200, -40);
scene.add(pointLight3)

var pointLight = new THREE.PointLight( 0xffffff, 1.4, 5000 );
pointLight.position.set(0, 10, 230);
scene.add( pointLight );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', function() { renderer.render( scene, camera )})

var clock = new THREE.Clock();
var time = 0;
var delta = 0;

var render = function() {
	controls.update(); 
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

// var render = function() {
// 	controls.update();

// 	renderer.render(scene, camera);

// 	requestAnimationFrame(render);
// }

var newSphereArray = [];



function onMouseMove(event) {
	event.preventDefault();
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);

	var intersects = raycaster.intersectObjects(scene.children, true);
	for (var i = 0; i < intersects.length; i++) {
		var yLayerDelta = 10
		this.tl = gsap.timeline();
		// this.tl.to(intersects[i].object.scale, 1, {x: 0.5, ease: Expo.easeOut});
		this.tl.to(intersects[i].object.position, {x: intersects[i].object.position.x, y: intersects[i].object.position.y, z:intersects[i].object.position.z, duration: 5, ease: "bounce.out", y: Math.floor(Math.round(intersects[i].object.position.y - 200))})
	}


}


render();

window.addEventListener('mousemove', onMouseMove);
