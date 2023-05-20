import React, { useState, useEffect } from 'react'
import './App.css';


// Get the device informations like 
// DeviceId,LastActivityTime, Tags, CameraType, 
// UserID and SnapshotSignedUrl from API https://6cw4vl6ty7.execute-api.ap-northeast-1.amazonaws.com/dev 
// and show those data in table using ReactJS.
//  Also implement a filter for CameraType.

function App() {
  const [deviceData, setDeviceData] = useState([])
  const [filteredDeviceData, setfilteredDeviceData] = useState([])
  function getDataFromAPI() {
    fetch(
      "https://6cw4vl6ty7.execute-api.ap-northeast-1.amazonaws.com/dev")
      .then((res) => res.json())
      .then((result) => {
        if (result.statusCode === 200) {
          setDeviceData(result.body.data)
          setfilteredDeviceData(result.body.data)
        }
        else {
          console.log("Somthing wrong")
        }
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getDataFromAPI()
  }, [])

  const filterData = (e) => {
    let searchtext = e.target.value.toLowerCase()
    let filterData = deviceData.filter(data => data.CameraType.toLowerCase().includes(searchtext))
    setfilteredDeviceData(filterData)
  }

  return (
    <div className="App">
      <div className='filter'>
        <input placeholder='Search...' onChange={(e) => filterData(e)} />
      </div>

      <div className='table'>
        <table>
          <tr>
            <th>DeviceId</th>
            <th>LastActivityTime</th>
            <th>Tags</th>
            <th>CameraType</th>
            <th>UserID</th>
          </tr>
          {filteredDeviceData?.map((item, index) =>
            <tr key={index}>

              <td>{item.DeviceID}</td>
              <td>{item.LastActivityTime}</td>
              <td>{item.DeviceId}
                {item.Tags.map((tag,i) =>
                  <div key={i} className="chip">
                   {tag}
                  </div>
                )}

              </td>
              <td>{item.CameraType}</td>
              <td>{item.UserID}</td>
            </tr>
          )}

        </table>
      </div>

    </div>
  );
}

export default App;
