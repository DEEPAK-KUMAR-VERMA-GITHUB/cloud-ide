interface Tab {
  name: string;
  isActive: boolean;
}

type Props = {
  tabs: Tab[];
};

const Tabs: React.FC<{ tabs: Tab[] }> = ({ tabs }: Props) => {
  return (
    <div className="flex space-x-4 border-b border-gray-300">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`py-2 px-4 ${
            tab.isActive ? "border-b-2 border-blue-500" : ""
          }`}
        >
          {" "}
          {tab.name}{" "}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
