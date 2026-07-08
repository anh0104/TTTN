import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// NOTE: React.StrictMode is intentionally removed.
// Puck editor uses @dnd-kit internally which calls DragDropManager effects on mount.
// React 19 StrictMode double-invokes effects (mount → unmount → remount),
// causing DragDropManager to destroy and re-create mid-render.
// During re-creation, CollisionObserver.computeCollisions runs against
// partially-initialized droppables whose IDs are undefined → crash:
// "Cannot read properties of undefined (reading 'toString')"
// See: https://github.com/puckeditor/puck/issues
createRoot(document.getElementById('root')).render(
  <App />
)
