import PatientLayout from '../PatientLayout';
import img from '../../../images/Patient.png';
import '../../../styles/PatientProfile.css'

export default function PatientProfile() {

   return(
    <div>
        <PatientLayout>
        <div className="container patientProfile mt-5">
          <div className="container patientCard rounded-5 w-100 h-100 mb-5 pb-5">

                <div class="row mt-2 d-flex p-4">
                    <div class="col-12 col-lg-3 image-container">
                        <div className="image-wrapper rounded-5">
                        <img className="patientImage rounded-5" src={img} alt="patient"/>
                        </div>
                    </div>

                    <div class="col-12 col-lg-6">
                        <div className="patientDetails pt-1">
                            <div id="patientName">
                                <h1>John Andreson</h1>
                            </div>
                            <div className="patientInfo mt-3">
                                <div className="div-info mb-3">
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" className="bi bi-telephone svg-info" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                    </svg>
                                    <p className="phoneNumber ms-3 mt-5">(+20)123 400 6768</p>
                                </div>
                                <div className="div-info mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" className="bi bi-envelope svg-info" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                    </svg>
                                    <p className="email ms-3 mt-5">Johna@gmail.com</p>
                                </div>
                                <div className="div-info mb-3">
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="currentColor" className="bi bi-telephone svg-info" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                    </svg>
                                    <p className="address ms-3 mt-5">100 St Maadi,Cairo</p>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>  

                <div className="another-info row mt-4 d-flex justify-content-center">

                    <div className="birthDate info col-lg-3 col-12 rounded-4 me-5 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="white" className="bi bi-calendar-check svg-another-info" viewBox="0 0 16 16">
                        <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                        </svg>
                        <p>Date of Birth</p>
                        <h3 className="mt-3 ms-4">March 15, 1985</h3>

                    </div>
                    <div className="bloodType info col-lg-3 col-12 rounded-4 me-5 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="white" className="bi bi-droplet svg-another-info" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
                        <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
                        </svg>
                        <p>Blood Type</p>
                        <h3 className="mt-3 ms-4">A+</h3>

                    </div>
                    <div className="allegies info col-lg-3 col-12 rounded-4 p-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" fill="white" className="bi bi-exclamation-circle svg-another-info" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
                        </svg>
                        <p>Allegies</p>
                        <h3 className="mt-3 ms-4">Penicillin</h3>

                    </div>

                </div>

            </div>
        </div>
        </PatientLayout>
    </div>
   );

};
