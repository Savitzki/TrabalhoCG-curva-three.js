"use strict";

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
camera.position.set(0, 0, 5);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const cena = new THREE.Scene();

const materialLinha = new THREE.LineBasicMaterial({ color: 0x00ff00 });

var pontos = [];

var curva = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.5, 1, 0),
    new THREE.Vector3(-1, 0, 2),
    new THREE.Vector3(0.5, -0.5, 1),
    new THREE.Vector3(-1.2, -0.8, -1),
    new THREE.Vector3(0.7, -1, -1),
    new THREE.Vector3(0, 1, 1),
    new THREE.Vector3(-0.2, 0, 0),
    new THREE.Vector3(1, 1, -1),
]);

pontos = curva.getPoints(300);

var geometry = new THREE.BufferGeometry().setFromPoints(pontos);

var geometriaCarrinho = new THREE.BoxGeometry(0.13, 0.07, 0.06);
var materialCarrinho = new THREE.MeshLambertMaterial({ color: 0xFFFF00 });

var carrinho = new THREE.Mesh(geometriaCarrinho, materialCarrinho);
cena.add(carrinho);

const line = new THREE.Line(geometry, materialLinha);
cena.add(line);

var luz = new THREE.AmbientLight(0x929292);
cena.add(luz);

var luzPonto = new THREE.PointLight(0x888888);
luzPonto.position.set(2, 2, 4);
cena.add(luzPonto);

var t = 0;
const direcao = new THREE.Vector3(1, 0, 0);
const eixo = new THREE.Vector3();

function desenhar() {
    requestAnimationFrame(desenhar);
    t += 0.001;
    var pos = curva.getPoint(t);

    const tangente = curva.getTangent(t);
    const radianos = Math.acos(direcao.dot(tangente));
    eixo.crossVectors(direcao, tangente).normalize();

    carrinho.position.set(pos.x, pos.y, pos.z);

    carrinho.quaternion.setFromAxisAngle(eixo, radianos);

    controls.update();
    renderer.render(cena, camera);

    if (t >= 1) {
        t = 0;
    }
}
requestAnimationFrame(desenhar);