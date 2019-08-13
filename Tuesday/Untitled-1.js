let scene, camera, renderer, cube, plane, i = 0, start = false;
function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 500);
	
	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('main-container').appendChild(renderer.domElement);

	const geometry1 = new THREE.BoxGeometry(1, 1, 1);
	const geometry2 = new THREE.PlaneGeometry(70, 5);

	const imgText1 = document.getElementById('cubeT');
 	const imgText2 = document.getElementById('planeT');

	const material1 = new THREE.MeshBasicMaterial();
	const material2 = new THREE.MeshBasicMaterial();

	const texture1 = new THREE.Texture(imgText1);
	const texture2 = new THREE.Texture(imgText2);
	material1.map = texture1;
	material2.map = texture2;

	material1.map.needsUpdate = true;
	material2.map.needsUpdate = true;

	cube = new THREE.Mesh(geometry1, material1);
	plane = new THREE.Mesh(geometry2, material2);
	scene.add(cube);
	scene.add(plane);

	plane.rotation.x = - Math.PI / 2;
	plane.position.y = -0.5;

	cube.position.x  = 0;
	cube.position.y  = 0;

	camera.position.x = 12;
	camera.position.y = 3;
	camera.position.z = 9;
}

function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function tw() {
	const coords = { x: cube.position.x, y: cube.position.y, rotation: 0};
	const tween = new TWEEN.Tween(coords) 
        .to({ x: 48, y: 0, rotation: Math.PI * 6}, 6000)
        .repeat(Infinity)
        .easing(TWEEN.Easing.Linear.None) 
        .onUpdate((alpha, beta) => { 

        	if(alpha.x < 24)
        	{
        		cube.rotation.z = -alpha.rotation;
        		cube.position.x = alpha.x;
        		cube.position.y = 3 * Math.abs(Math.sin(alpha.rotation));
        	}

        	else
        	{
        		cube.rotation.z = alpha.rotation;
        		cube.position.x = 48 - alpha.x;
        		cube.position.y = 3 * Math.abs(Math.sin(alpha.rotation));
        	}

        });
        tween.start()
}    


window.addEventListener('resize', onWindowResize,false);

init();
animate();
tw();