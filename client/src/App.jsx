import Canvas from './canvas'
import { Home, Customizer } from './pages'

const App = () => {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />
    </main>
  )
}

export default App

/**
 * This code from GPT-4o
 */

// import { Canvas } from '@react-three/fiber'
// import { OrbitControls, useGLTF } from '@react-three/drei'

// const TShirtModel = () => {
//   const { scene } = useGLTF('./shirt_baked.glb') // Make sure you have a 3D model of a T-Shirt
//   return <primitive object={scene} />
// }

// const App = () => {
//   return (
//     <div style={{ height: '100vh' }}>
//       <Canvas>
//         <OrbitControls />
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} />
//         <TShirtModel />
//       </Canvas>
//     </div>
//   )
// }

// export default App
