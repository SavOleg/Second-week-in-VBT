let scene, camera, renderer, cube, plane, i = 0, start;
// alert(document.getElementById('cubeT'));
function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 500);
	
	// scene.background = new THREE.CubeTextureLoader()
	// .setPath( 'images/cube/' )
	// .load( [
	// 	'dark-s_px.png',
	// 	'dark-s_nx.png',
	// 	'dark-s_py.png',
	// 	'dark-s_ny.png',
	// 	'dark-s_pz.png',
	// 	'dark-s_nz.png'
	// ] );

	renderer = new THREE.WebGLRenderer({ antialias: true});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('main-container').appendChild(renderer.domElement);

	const geometry1 = new THREE.BoxGeometry(1, 1, 1);
	const geometry2 = new THREE.PlaneGeometry(999999999999999999999, 5);

	const imgText = document.getElementById('cubeT');

	console.log(imgText);



	
	// const texture1  = new THREE.TextureLoader().load('images/cratetex.png');
	// const texture2  = new THREE.TextureLoader().load('images/cratetex.png');
	//const material1 = new THREE.MeshBasicMaterial({ map: texture1 });
	//const material1 = new THREE.MeshBasicMaterial({ map: texture2 });
	const material1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
	const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

	// const img = document.creteElement('img');

	// img.onload = () => {
	// 	console.log('test');
	// };

	// img.src = 'url';

	const texture1 = new THREE.Texture(imgText);
	material1.map = texture1;

	material1.map.needsUpdate = true;

	cube = new THREE.Mesh(geometry1, material1);
	plane = new THREE.Mesh(geometry2, material2);
	scene.add(cube);
	scene.add(plane);

	plane.rotation.x = - Math.PI / 2;
	plane.position.y = -0.5;

	camera.position.x = 12;
	camera.position.y = 3;
	camera.position.z = 10;
}

function animate() {
	requestAnimationFrame(animate);
	cube.rotation.z = -i;
		cube.position.x = i * 2;
		cube.position.y = 3 * Math.abs(Math.sin(i));
		i += 0.05;
	

	console.log(i);
	if(parseInt(cube.position.x) > camera.position.x + 12)
	{
		start = true;
	}

	else if(parseInt(cube.position.x) < camera.position.x - 12)
	{
		start = false;
	}

	if(start)
	{
		camera.position.x += 0.9;
	}

	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize,false);

init();
animate();


