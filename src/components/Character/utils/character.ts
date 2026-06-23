import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        let character: THREE.Object3D;
        
        // Check if plain character.glb exists and is a real model (not the small dummy pointer file)
        let response = await fetch("/models/character.glb", { method: "HEAD" });
        let size = Number(response.headers.get("content-length") || 0);
        let usePlain = response.ok && size > 1000;

        let urlToLoad = "";
        if (usePlain) {
          urlToLoad = "/models/character.glb";
        } else {
          const encryptedBlob = await decryptFile(
            "/models/character.enc",
            "Character3D#@"
          );
          urlToLoad = URL.createObjectURL(new Blob([encryptedBlob]));
        }

        loader.load(
          urlToLoad,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.frustumCulled = true;

                // Color-matching with user's 3D avatar:
                // Kurta / Shirt: beige/sand (#DFD1BA)
                // Pants: off-white/cream (#EAE6DF)
                // Shoes: dark brown (#4A3525)
                // Hair & Eyebrows: black/dark (#151515)
                const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                const clonedMaterials: any[] = [];
                materials.forEach((material: any) => {
                  if (material && "color" in material) {
                    // Only clone and override if it is one of the target meshes we want to color-match
                    if (
                      child.name === "BODYSHIRT" ||
                      child.name === "Pant" ||
                      child.name === "Shoe" ||
                      child.name === "hair" ||
                      child.name === "Eyebrow" ||
                      child.name === "Cube002" ||
                      child.name === "Plane007" ||
                      child.name === "Neck" ||
                      child.name === "Hand" ||
                      child.name === "Ear001"
                    ) {
                      const clonedMaterial = material.clone();
                      if (child.name === "BODYSHIRT") {
                        clonedMaterial.color.set("#1E1B30"); // Dark Indigo / Navy Blue
                        if (clonedMaterial.map) clonedMaterial.map = null;
                        clonedMaterial.roughness = 0.6;
                      } else if (child.name === "Pant") {
                        clonedMaterial.color.set("#2D2D2D"); // Charcoal / Dark Grey
                        if (clonedMaterial.map) clonedMaterial.map = null;
                        clonedMaterial.roughness = 0.6;
                      } else if (child.name === "Shoe") {
                        clonedMaterial.color.set("#E2E2E2"); // White / Light Grey
                        if (clonedMaterial.map) clonedMaterial.map = null;
                        clonedMaterial.roughness = 0.5;
                      } else if (child.name === "hair" || child.name === "Eyebrow") {
                        clonedMaterial.color.set("#111111"); // Black hair & eyebrows
                        if (clonedMaterial.map) clonedMaterial.map = null;
                        clonedMaterial.roughness = 0.8;
                      } else if (
                        child.name === "Cube002" ||
                        child.name === "Plane007" ||
                        child.name === "Neck" ||
                        child.name === "Hand" ||
                        child.name === "Ear001"
                      ) {
                        clonedMaterial.color.set("#D1A382"); // Warm skin tone requested by user
                        if (clonedMaterial.map) clonedMaterial.map = null;
                        clonedMaterial.roughness = 0.6;
                      }
                      clonedMaterials.push(clonedMaterial);
                    } else {
                      clonedMaterials.push(material);
                    }
                  } else {
                    clonedMaterials.push(material);
                  }
                });
                mesh.material = Array.isArray(mesh.material) ? clonedMaterials : clonedMaterials[0];
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            
            const footR = character.getObjectByName("footR");
            if (footR) footR.position.y = 3.36;
            const footL = character.getObjectByName("footL");
            if (footL) footL.position.y = 3.36;
            
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
