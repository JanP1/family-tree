import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import '../../styles/CreateTreePopup.css';

type Tree = {
  id: number;
  name: string;
};

export default function CreateTreePopup() {
  const [treeNames, setTreeNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrees() {
      try {
        const trees: Tree[] = await invoke('get_all_trees');
        const firstThree = trees.slice(0, 3).map(tree => tree.name);
        setTreeNames(firstThree);
      } catch (err) {
        setError('Failed to load trees');
        console.error(err);
      }
    }

    fetchTrees();
  }, []);

  return (
    <div className="create-tree-popup-container">

      {error && <div className="error">{error}</div>}

      <div className="tree-names">
        <h3>First 3 Trees:</h3>
        {treeNames.length > 0 ? (
          treeNames.map((name, idx) => <div key={idx}>{name}</div>)
        ) : (
          <div>Loading...</div>
        )}
      </div>

      {/* You can add form fields or buttons below here */}
    </div>
  );
}
