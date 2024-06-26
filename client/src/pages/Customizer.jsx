import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'

import state from '../store'
import { download } from '../assets'
import config from '../config/config'
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants'
import { downloadCanvasToImage, reader } from '../config/helpers'
import { fadeAnimation, slideAnimation } from '../config/motion'
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab
} from '../components'

const Customizer = () => {
  const snap = useSnapshot(state)

  const [file, setFile] = useState('')

  const [prompt, setPrompt] = useState('')

  const [generatingImg, setGeneratingImg] = useState(false)

  const [activeEditorTab, setActiveEditorTab] = useState('')

  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  // Show tab content depending on the activeTab
  const generateTabContent = () => {
    const tabContentMap = {
      colorpicker: <ColorPicker />,
      filepicker: (
        <FilePicker file={file} setFile={setFile} readFile={readFile} />
      ),
      aipicker: (
        <AIPicker
          prompt={prompt}
          setPrompt={setPrompt}
          generatingImg={generatingImg}
          handleSubmit={handleSubmit}
        />
      )
    }

    return tabContentMap[activeEditorTab] || null
  }

  const handleSubmit = async (type) => {
    if (!prompt) return alert('Please enter a prompt')

    try {
      // Call our Back-End to generate an AI image!
      /**
       * setGeneratingImg(true)
       *
       * const response = await fetch(config.production.backendUrl, {
       *   method: 'POST',
       *   headers: { 'Content-Type': 'application/json' },
       *   body: JSON.stringify({ prompt: prompt })
       * })
       *
       * const data = await response.json()
       *
       * handleDecals(type, `data:image/png;base64,${data.photo}`)
       */

      alert('Unfortunately, my API key has expired :(')
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab('')
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName]
        break

      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName]
        break

      default:
        state.isLogoTexture = true
        state.isFullTexture = false
        break
    }

    // After setting the state, activeFilterTab is updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result)
      setActiveEditorTab('')
    })
  }

  return (
    <AnimatePresence>
      {snap.intro === false && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() =>
                      setActiveEditorTab((prevTab) =>
                        prevTab === tab.name ? '' : tab.name
                      )
                    }
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>

          <motion.div
            className="absolute z-10 bottom-5 right-5"
            {...fadeAnimation}
          >
            <button className="download-btn" onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt="Download Image"
                className="w-3/5 h-3/5 object-contain"
              />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer
