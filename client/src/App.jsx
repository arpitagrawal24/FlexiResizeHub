import axios from 'axios';
import { useEffect, useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import Cell from './components/Cell';
import DataForm from './components/DataForm';

function App() {
  const [data, setData] = useState('');
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [changeData, setChangeData] = useState(null);

  useEffect(() => {
    fetchData();
    fetchCounts();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/getData`);

      // console.log(response.data.data[0]);
      setData(response.data.data[0]);

      localStorage.setItem('data', JSON.stringify(response.data.data[0]));

    } catch (error) {
      console.error('Error fetching data for Cell 1:', error);
    }
  };

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/count`);
      setAddCount(response.data.count.addOperation);
      setUpdateCount(response.data.count.updateOperation);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <PanelGroup direction="horizontal" autoSaveId="persistence">

        <Panel minSizePixels={100}>

          <PanelGroup direction="vertical" autoSaveId="persistence">
            <Panel minSizePixels={100}>
              <PanelGroup direction="horizontal" autoSaveId="persistence">
                <Panel minSizePixels={100} className="w-1/2">
                  <Cell
                    title={data?.title}
                    type="txt"
                    data={data}
                  />
                </Panel>
                <PanelResizeHandle className="w-2 bg-inherit cursor-col-resize" />
                <Panel minSizePixels={100} className="w-1/2">
                  <Cell
                    title="Image"
                    type="img"
                  />
                </Panel>
              </PanelGroup>
            </Panel>

            <PanelResizeHandle className="h-2 bg-inherit cursor-row-resize" />

            <Panel minSizePixels={100}>
              <Cell
                title="Button"
                type="btn"
                addCount={addCount}
                updateCount={updateCount}
                changeData={changeData}
                setChangeData={setChangeData}
              />
            </Panel>

          </PanelGroup>

        </Panel>

      </PanelGroup>
      {changeData && (
        <DataForm
          changeData={changeData}
          setChangeData={setChangeData}
          fetchCounts={fetchCounts}
          fetchData={fetchData}
          data={data}
        />
      )}
    </div>
  );
}

export default App;
