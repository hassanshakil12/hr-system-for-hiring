// const AvailableEmployees = () => {
//   const employees = Array(6).fill({
//     name: "Richard James",
//     imageUrl: "./images/employe-img.png"
//   });

//   return (
//     <div className="container mx-auto p-6 bg-white">
//       <h1 className="text-xl font-semibold mb-6 text-center text-gray-800">Available Employees</h1>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//         {employees.map((employee, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-md shadow-sm overflow-hidden border border-gray-100"
//           >            <div className="aspect-square bg-blue-200">
//               <img
//                 src={employee.imageUrl}
//                 alt={employee.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             <div className="p-3 text-center">
//               <p className="text-sm font-medium text-gray-700 truncate">{employee.name}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AvailableEmployees;

import { SetStateAction, useState } from "react";
import { createPortal } from "react-dom";

const Employees = () => {
  const employees = Array(5).fill({
    name: "Richard James",
    imageUrl: "./images/employe-img.png",
    employeeId: "202205",
    joined: "2022-05-15",
    email: "alexvincent@gmail.com",
    phone: "+1 123 456 7890",
    address: "S25 E 68th Street, New York, NY 10651-78 156-187-60",
    gender: "Male",
  });

  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const handleView = (employee: SetStateAction<any>) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    document.body.style.overflow = "auto";
  };

  const handleDeleteClick = (employee: any) => {
    setSelectedEmployee(employee);
    setIsConfirmDeleteOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleConfirmDelete = () => {
    // Put your delete logic here
    alert(`Deleted: ${selectedEmployee.name}`);
    setIsConfirmDeleteOpen(false);
    setSelectedEmployee(null);
    document.body.style.overflow = "auto";
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setSelectedEmployee(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {employees.map((employee, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition hover:shadow-lg"
            >
              <div className="aspect-square">
                <img
                  src={employee.imageUrl}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {employee.name}
                </p>
                <div className="mt-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleView(employee)}
                    className="text-xs px-4 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteClick(employee)}
                    className="text-xs px-4 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View Modal */}
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl overflow-auto max-h-[90vh] relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>

              <div className="flex flex-col items-start">
                <div className="w-32 h-32 mb-6 rounded-md overflow-hidden bg-gray-300">
                  <img
                    src={selectedEmployee.imageUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h1 className="text-2xl font-bold mb-1">
                  {selectedEmployee.name}
                </h1>
                <hr className="w-full my-2" />

                <div className="w-full mb-4">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Other Information
                  </h2>
                  <p className="text-sm">
                    Employee ID: {selectedEmployee.employeeId}
                  </p>
                  <p className="text-sm">Joined: {selectedEmployee.joined}</p>
                </div>

                <div className="w-full mb-4">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Contact Information
                  </h2>
                  <p className="text-sm">Email: {selectedEmployee.email}</p>
                  <p className="text-sm">Phone: {selectedEmployee.phone}</p>
                  <p className="text-sm">Address: {selectedEmployee.address}</p>
                </div>

                <div className="w-full">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Basic Information
                  </h2>
                  <p className="text-sm">Gender: {selectedEmployee.gender}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen &&
        createPortal(
          <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full relative">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Are you sure you want to delete this employee?
              </h2>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Employees;
