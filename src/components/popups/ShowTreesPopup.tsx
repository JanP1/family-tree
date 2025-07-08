import '../../styles/ShowTreesPopup.css'
import { useEffect, useState } from 'react'
import { PopupTreeDisplay } from './PopupTreeDisplay'

import { invoke } from '@tauri-apps/api/core'

type Tree = {
  id: number
  name: string
}

export default function ShowTreesPopup() {
  const [trees, setTrees] = useState<Tree[]>([])

  useEffect(() => {
    invoke<Tree[]>('get_all_trees')
      .then((result) => {
        setTrees(result)
      })
      .catch((error) => {
        console.error('Failed to fetch trees:', error)
      })
  }, [])

  return (
    <div className="show-trees-popup-container">
      <div className="popup-area">
        {trees.map((tree) => (
          <PopupTreeDisplay key={tree.id} description={tree.name} />
        ))}
      </div>
    </div>
  )
}
