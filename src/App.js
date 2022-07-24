import React, { useState } from 'react';
import { Button, ListGroup, Table } from 'react-bootstrap';
import MyListGroup from './components/MyListGroup';
import MyModal from './components/MyModal';
import 'bootstrap/dist/css/bootstrap.min.css';

let personList = [];

const App = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [gender, setGender] = useState(0)
  const [pid, setPersonId] = useState(0)

  const tableRecords = () => {
    let itemList = [];
    for (let i = 1; i < 10; i++) {
      itemList.push(
        <tr>
          <td>{i}</td>
          <td className='col-md-5'>
            <Button variant="outline-danger" onClick={() => { setModalShow(true); setPersonId(i); setGender(0) }}>
              {i}の女性
            </Button>
          </td>
          <td className='col-md-5'>
            <Button variant="outline-primary" onClick={() => { setModalShow(true); setPersonId(i); setGender(1) }}>
              {i}の男性
            </Button>
          </td>
        </tr>
      );
    }
    return itemList;
  }

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <main>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {tableRecords()}
          </tbody>
        </Table>
        <MyModal
          personList={personList}
          pid={pid}
          gender={gender}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </main>
    </div>
  );
}

export default App;
