window.onload = function()    {var stats = initStats();
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.  innerHeight, 0.1, 100);
            var spotLight = new THREE.SpotLight(0xffffaa);
            spotLight.position.set(-50,50,-10);
            spotLight.castShadow = true;
            scene.add(spotLight);
            var renderer = new THREE.WebGLRenderer();
            renderer.setClearColor(0xEEEEEE,1.0);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMapEnabled = true;
        
            document.getElementById('box').appendChild(renderer.domElement)
    
        var planeGeometry = new THREE.PlaneGeometry(60, 40,1,1);
        var planeMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);
        plane.rotation.x = -0.5*Math.PI
        plane.position.x = 50;
        plane.position.y = -20;
        plane.position.z = 0;
        plane.receiveShadow = true;
        scene.add(plane);

             var cubeGeometry = new THREE.CubeGeometry(110, 110, 110, 1, 1, 1);
             cubeGeometry.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, - 1 ) ); <!-- 定义一个立方体，-->

            var cubeMaterialArray = [];
            cubeMaterialArray.push(new THREE.MeshBasicMaterial({
                map : new THREE.TextureLoader().load('images/posx.jpg') <!-- 给每一面上贴图，下同 -->
            }));
             cubeMaterialArray.push(new THREE.MeshBasicMaterial({
                map : new THREE.TextureLoader().load('images/negx.jpg') <!-- 给每一面上贴图，下同 -->
            }));
            cubeMaterialArray.push(new THREE.MeshBasicMaterial({
                map : new THREE.TextureLoader().load('images/posy.jpg') <!-- 给每一面上贴图，下同 -->
            }));
             cubeMaterialArray.push(new THREE.MeshBasicMaterial({
                map : new THREE.TextureLoader().load('images/negy.jpg') <!-- 给每一面上贴图，下同 -->
            }));
             cubeMaterialArray.push(new THREE.MeshBasicMaterial({
                map : new THREE.TextureLoader().load('images/posz.jpg') <!-- 给每一面上贴图，下同 -->
            }));
            cubeMaterialArray.push(new THREE.MeshBasicMaterial({
                map : new THREE.TextureLoader().load('images/negz.jpg') <!-- 给每一面上贴图，下同 -->
            }));
            var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);

            cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
            cube.position.set(0, 0, 0); <!-- 立方体放置的位置 -->
            scene.add(cube);
            var geometry = new THREE.SphereGeometry( 3, 20, 20 );
            var material = new THREE.MeshLambertMaterial( {map : new THREE.TextureLoader().load('images/2.jpg')} );
            var sphere= new THREE.Mesh( geometry, material );
            sphere.position.x = 50;
            sphere.position.y = -00;
            sphere.castShadow = true;
            scene.add( sphere );
            // 设置添加小球 小方块
            var controls = new function () {
            this.rotationSpeed = 0.02;
            this.numberOfObjects = scene.children.length;
            this.removeCube = function () {
                var allChildren = scene.children;
                var lastObject = allChildren[allChildren.length - 1];
                if (lastObject instanceof THREE.Mesh) {
                    scene.remove(lastObject);
                    this.numberOfObjects = scene.children.length;
                }
            };
            this.addCube = function () {
                var cubeSize = Math.ceil((Math.random() * 3));
                var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
                var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;
                cube.name = "cube-" + scene.children.length;
                // 立方体的定位
                cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
                cube.position.y = Math.round((Math.random() * 5));
                cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
               
                scene.add(cube);
                this.numberOfObjects = scene.children.length;
            };
            this.outputObjects = function () {
                console.log(scene.children);
            }
        };
            var gui = new dat.GUI();
        gui.add(controls, 'rotationSpeed', 0, 0.5);
        gui.add(controls, 'addCube');
        gui.add(controls, 'removeCube');
        gui.add(controls, 'outputObjects');
        gui.add(controls, 'numberOfObjects').listen();
                         
                    


         
            camera.position.x = -6;
            camera.position.y = 0;
            camera.position.z = 0;
            camera.lookAt(scene.position);



         
            var orbitControls = new THREE.OrbitControls(camera);
            orbitControls.autoRotate = false;
            var step = 0;
            var clock = new THREE.Clock();
            // 核心渲染
            function render(){
            stats.update();
            sphere.rotation.z += 0.1;
            sphere.position.y = -80
            
            step+= 0.02;
            sphere.position.z =0+(30*(Math.cos(step)));
            sphere.position.y = -30+(20*Math.abs(Math.sin(step)));
                scene.traverse(function (e) {
                if (e instanceof THREE.Mesh && e != plane && e!= cube ) {
                    e.rotation.x += controls.rotationSpeed;
                    e.rotation.y += controls.rotationSpeed;
                    e.rotation.z += controls.rotationSpeed;
                }
            });
            
          
       
         var delta = clock.getDelta();
         orbitControls.update(delta);
         requestAnimationFrame(render); 
         renderer.render(scene,camera)   
         } 
         render();
        function initStats() {
            var stats = new Stats();
            stats.setMode(0); 
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
            document.getElementById("box1").appendChild(stats.domElement);
            return stats;
        }
    
      
       
}
