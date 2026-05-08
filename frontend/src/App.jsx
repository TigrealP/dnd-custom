import { useState } from 'react'
import Navbar from './components/Layout/Navbar'
import CharacterSheet from './components/CharacterSheet'

function App() {
  const [activeTab, setActiveTab] = useState('character')

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d1a', color: '#fff' }}>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main style={{ padding: '24px' }}>
        {activeTab === 'character' && <CharacterSheet />}
        {activeTab === 'dice'      && <p style={{ color: '#fff' }}>Dados — próximo paso</p>}
      </main>
    </div>
  )
}

export default App