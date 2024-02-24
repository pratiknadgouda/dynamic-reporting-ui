import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import TemplateWindow from './TemplateModal';

const DoctorsView = () => {
    const data = [{
        name: "sam0",
        email: "123@gmail.com",
    }, {
        name: "sam1",
        email: "123@gmail.com",
    }, {
        name: "sam2",
        email: "123@gmail.com",
    }, {
        name: "sam3",
        email: "123@gmail.com",
    }, {
        name: "sam4",
        email: "123@gmail.com",
    }]

    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div className='px-5 py-5'>
            <h3 className='d-flex align-left'>
                {'Patients List'}
            </h3>


            <Table striped bordered hover size="sm" >
                <thead >
                    <tr className=' text-center'>
                        {/* <th></th> */}
                        <th className=' w-25'>Name</th>
                        <th className='w-25'>Email Id</th>
                        <th className='w-25'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => {
                        return (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td className='d-flex justify-content-around '>{<>
                                    <Button variant="primary" size="sm" >Update Report</Button>{' '}
                                    <Button variant="secondary" size="sm" onClick={() => setModalShow(true)}>View Report</Button>{' '}
                                </>}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <TemplateWindow
                show={modalShow}
                onHide={() => setModalShow(false)} />
        </div>
    )
}

export default DoctorsView
