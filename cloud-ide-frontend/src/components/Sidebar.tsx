type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 ">
      <h2 className="text-lg font-semibold mb-2">File Explorer</h2>

      {/* file structure */}

      <ul>
        <li>index.html</li>
        <li>script.js</li>
      </ul>
    </div>
  );
};

export default Sidebar;
