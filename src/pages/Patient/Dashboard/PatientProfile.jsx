import PatientLayout from '../PatientLayout';
import img from '../../../images/Patient.png';
import '../../../styles/PatientProfile.css'

export default function PatientProfile() {

   return(
    <div>
        <PatientLayout>
        <div className="container patientProfile mt-5">
            <div className="container patientCard rounded-5 w-100 h-100 p-4">
                <div className="image-wrapper rounded-5">
                   <img className="patientImage rounded-5" src={img} alt="patient"/>
                </div>
                


            </div>
        </div>



        </PatientLayout>
    </div>
   );

};
