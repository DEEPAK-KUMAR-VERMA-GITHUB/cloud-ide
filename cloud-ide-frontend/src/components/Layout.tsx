import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import Tabs from "./Tabs";

type Props = {};

const tabs = [
  { name: "index.html", isActive: true },
  { name: "script.js", isActive: false },
];

const Layout = (props: Props) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-row flex-grow">
        <Sidebar />
        <div className="flex-grow">
          <Tabs tabs={tabs} />
          <div className="p-4">{/* editor content goes here */}</div>
        </div>
      </div>
      <StatusBar />
    </div>
  );
};

export default Layout;
