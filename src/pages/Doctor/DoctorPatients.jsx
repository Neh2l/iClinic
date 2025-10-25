import React, {useState} from 'react'
import DoctorHeader from "../../components/layout/doctorHeader";
import DoctorSidebar from "../../components/layout/doctorSidebar";
import Footer from "../../components/layout/Footer";
import img from "../../images/Face.png"

const initialPatients = [
    {
        id:1,
        patientName:"Albert Flores",
        patientID: "123445" ,
        date: "Des 04.12 ",
        patientGender: "Female",
        patientDiseases: "Diabates",
        patientStatus: "In-Treatment",
        image: img,
    },
    {
        id:2,
        patientName:"Albert Flores",
        patientID: "123445" ,
        date: "Des 04.12 ",
        patientGender: "Female",
        patientDiseases: "Diabates",
        patientStatus: "In-Treatment",
        image: img,
    },
    {
        id:3,
        patientName:"Albert Flores",
        patientID: "123445" ,
        date: "Des 04.12 ",
        patientGender: "Female",
        patientDiseases: "Diabates",
        patientStatus: "In-Treatment",
        image: img,
    },
    {
        id:4,
        patientName:"Albert Flores",
        patientID: "123445" ,
        date: "Des 04.12 ",
        patientGender: "Female",
        patientDiseases: "Diabates",
        patientStatus: "In-Treatment",
        image: img,
    },
    {
        id:5,
        patientName:"Albert Flores",
        patientID: "123445" ,
        date: "Des 04.12 ",
        patientGender: "Female",
        patientDiseases: "Diabates",
        patientStatus: "In-Treatment",
        image: img,
    }
];

function SinglePatient({patient,openDropdown, toggleDropdown, handleMessage, handleReport}){
    return(
        <>
        {/* Desktop/Tablet Table Row */}
            <tr className="d-none d-md-table-row border-bottom">
                <td className="p-3">
                    <div className="d-flex align-items-centers">
                        <img src={patient.image} alt={patient.patientName} className="rounded-circle me-2" style={{width: '40px', height:'40px'}}/>
                        <span>{patient.patientName}</span>
                    </div>
                </td>
                <td className="p-3">{patient.patientID}</td>
                <td className="p-3">{patient.date}</td>
                <td className="p-3">{patient.patientGender}</td>
                <td className="p-3">{patient.patientDiseases}</td>
                <td className="p-3 position-relative">
                    <button onClick={()=> toggleDropdown(patient.id)} className="btn btn-sm" style={{fontSize:'20px'}} >⋮ </button>
                    {openDropdown ===patient.id && (
                        <div className="position-absolute bg-white border rounded shadow" 
                          style={{ right: 0, top: '100%', zIndex: 1000, minWidth: '150px' }}>
                          <button onClick={() => handleMessage(patient)} className="btn btn-sm w-100 text-start px-3 py-2 border-bottom">Message </button>
                          <button onClick={() => handleReport(patient)} className="btn btn-sm w-100 text-start px-3 py-2">Report </button>
                        </div>
                    )}
                </td>
            </tr>
            {/* Mobile Card View */}
            <div className="d-md-none border rounded p-3 mb-3">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center">
                    <img src={patient.image} alt={patient.patientName} className="rounded-circle me-2" style={{ width: '50px', height: '50px' }} />
                    <div>
                        <h6 className="mb-0">{patient.patientName}</h6>
                        <small className="text-muted">ID: {patient.patientID}</small>
                    </div>
                    </div>
                    <div className="position-relative">
                        <button onClick={() => toggleDropdown(patient.id)} className="btn btn-sm" style={{ fontSize: '20px' }}>⋮ </button>
                        
                        {openDropdown === patient.id && (
                            <div className="position-absolute bg-white border rounded shadow" 
                                style={{ right: 0, top: '100%', zIndex: 1000, minWidth: '150px' }}>
                            <button onClick={() => handleMessage(patient)}  className="btn btn-sm w-100 text-start px-3 py-2 border-bottom">Message</button>
                            <button onClick={() => handleReport(patient)} className="btn btn-sm w-100 text-start px-3 py-2">Report </button>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className="d-flex justify-content-between mb-2">
                    <strong>Date:</strong>
                    <span>{patient.date}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <strong>Gender:</strong>
                    <span>{patient.patientGender}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <strong>Disease:</strong>
                    <span>{patient.patientDiseases}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                    <strong>Status:</strong>
                    <span className="badge bg-info text-dark">{patient.patientStatus}</span>
                </div>
            </div>
        </>
    );
}
const DoctorPatients=()=>{
    const [openDropdown, setOpenDropdown]= useState(null);
    const toggleDropdown=(id)=>{
        setOpenDropdown(openDropdown === id ? null: id);
    };
    const handleMessage = (patient) => {
        alert(`Opening message for ${patient.patientName}`);
        setOpenDropdown(null);
    };

    const handleReport = (patient) => {
        alert(`Opening report for ${patient.patientName}`);
        setOpenDropdown(null);
    };
    return(
        <div className="d-flex flex-column" >
                <DoctorHeader />

            <div className="d-flex flex-grow-1">
                <div className="d-none d-lg-block" 
                    style={{ width: "240px", position: "sticky", top: "60px", height: "calc(100vh - 60px)", overflowY: "auto" }}>
                    <DoctorSidebar />
                </div>
                <div className="flex-grow-1 p-4">
                    <div className="container-fluid">
                         {/* Search */}
                        <div className="mb-4 desc">
                            <input type="text" className="form-control rounded-4" placeholder="Search" style={{ maxWidth: '400px' }} />
                        </div>

                        <div className="bg-white rounded shadow-sm">
                            <div className="p-3">
                                <h3 className="mb-0">patients list</h3>
                            </div>
                            {/* Desktop Table */}
                            <div className="d-none d-md-block table-responsive">
                                <table className="table table-hover mb-0">
                                    <thead>
                                        <tr className="primary-color">
                                            <th className="p-3">Patient name</th>
                                            <th className="p-3">Patient ID</th>
                                            <th className="p-3">Date</th>
                                            <th className="p-3">Gender</th>
                                            <th className="p-3">Diseases</th>
                                            <th className="p-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {initialPatients.map((patient) => (
                                            <SinglePatient
                                                key={patient.id}
                                                patient={patient}
                                                openDropdown={openDropdown}
                                                toggleDropdown={toggleDropdown}
                                                handleMessage={handleMessage}
                                                handleReport={handleReport}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="d-md-none p-3">
                                {initialPatients.map((patient) => (
                                    <SinglePatient
                                        key={patient.id}
                                        patient={patient}
                                        openDropdown={openDropdown}
                                        toggleDropdown={toggleDropdown}
                                        handleMessage={handleMessage}
                                        handleReport={handleReport}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
export default DoctorPatients;

