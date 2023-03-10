import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Patient from "../components/Patient";
import {
  deleteToAPI,
  fetchAllPatients,
  onChangeSearch,
  patientsOrder,
} from "../features/patient/patientSlice";

const Home = () => {
  const dispatch = useDispatch();

  const patients = useSelector((state) => state.patients.patients);

  useEffect(() => {
    dispatch(fetchAllPatients());
  }, []);

  const handleDelete = async (patient) => {
    const confirmed = window.confirm("¿Desea ELIMINAR este paciente?");

    if (confirmed) {
      try {
        dispatch(deleteToAPI(patient));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSelect = (value) => {
    //Nombre
    if (value === "nombre") {
      const patientsCopy = [...patients];
      const order = patientsCopy.sort((a, b) => {
        const nombreA = a.nombre.toLowerCase();
        const nombreB = b.nombre.toLowerCase();
        if (nombreA < nombreB) {
          return -1;
        }

        if (nombreA > nombreB) {
          return 1;
        }
        return 0;
      });
      dispatch(patientsOrder(order));
    }
    //Apellido
    if (value === "apellido") {
      const patientsCopy = [...patients];
      const order = patientsCopy.sort((a, b) => {
        const apellidoA = a.apellido.toLowerCase();
        const apellidoB = b.apellido.toLowerCase();
        if (apellidoA < apellidoB) {
          return -1;
        }

        if (apellidoA > apellidoB) {
          return 1;
        }
        return 0;
      });
      dispatch(patientsOrder(order));
    }
    //Edad
    if (value === "edad") {
      const patientsCopy = [...patients];
      const order = patientsCopy.sort((a, b) => {
        return a.edad - b.edad;
      });
      dispatch(patientsOrder(order));
    }
  };

  return (
    <div>
      <div className="mx-2 my-6 flex justify-between">
        <div className="md:block flex-col justify-center items-center">
          <label className="font-mono md:text-2xl uppercase mx-2">
            Buscador:
          
          <input
            type="text"
            list="patients"
            onChange={(e) => dispatch(onChangeSearch(e.target.value))}
            className="p-2 rounded-xl w-full md:w-8/12"
          />
          </label>
          <datalist id="patients">
            {patients.map((patient) => 
            <option key={patient.id} value={patient.nombre + " " + patient.apellido}></option>
            )}
          </datalist>
        </div>
        <div className="md:block flex-col justify-center items-center">
          <label className="font-mono text-1xl mr-2"
          > Ordernar por:</label>
          <select
            className="w-3/5 md:w-32 p-3 rounded-lg text-xs mx-2 md:mr-36"
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="" disabled>
              -Ordernar por-
            </option>
            <option value="nombre">Nombre</option>
            <option value="apellido">Apellido</option>
            <option value="edad">Edad</option>
          </select>
        </div>
      </div>

      <div className="md:p-2 grid grid-cols-5 md:grid-cols-6 gap-16 bg-orange-500 rounded-sm mx-2 my-2">
        <p className="ml-4">Nombre</p>
        <p>Apellido</p>
        <p className="hidden md:block">Edad</p>
        <p className="hidden md:block">Telefono</p>
        <p className="col-span-2"></p>
      </div>

      {patients.length > 0 ? (
        patients.map((patient) => (
          <Patient
            key={patient.id}
            patient={patient}
            handleDelete={() => handleDelete(patient)}
          />
        ))
      ) : (
        <p className="text-lg md:mx-72 md:my-60">
          No existen pacientes aun. Vaya a "Nuevo Paciente" a su izquierda para
          agregar pacientes
        </p>
      )}
    </div>
  );
};

export default Home;
