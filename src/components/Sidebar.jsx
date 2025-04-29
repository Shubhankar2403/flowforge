// Sidebar.jsx
const nodeTypes = [
    { type: 'text', label: 'Text Label' },
    { type: 'input', label: 'Input Field' },
    { type: 'button', label: 'Button' },
    { type: 'dropdown', label: 'Dropdown' },
  ];
  
  export default function Sidebar() {
    const handleDragStart = (event, nodeType) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <aside className="w-60 p-4 bg-gray-100 border-r">
        <h3 className="font-bold text-lg mb-4">Components</h3>
        {nodeTypes.map((item) => (
          <div
            key={item.type}
            className="p-2 bg-white rounded shadow mb-2 cursor-pointer text-center border"
            onDragStart={(event) => handleDragStart(event, item.type)}
            draggable
          >
            {item.label}
          </div>
        ))}
      </aside>
    );
  }
  