// export default function EcommerceMetrics() {
//   return (
//     <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
//       <div className="p-5 bg-white border border-gray-200 rounded-lg">
//         <div className="mb-1 flex space-x-3">
//           <div className="flex items-center justify-between">
//             <img src="./images/doctor_icon.svg" alt="" />
//           </div>
//           <div>
//             <h3 className="text-xl  font-bold text-gray-500">14</h3>
//             <p className="mt-1 text-lg font-bold text-gray-800">Employees</p>
//           </div>
//         </div>
//       </div>

//       <div className="p-5 bg-white border border-gray-200 rounded-lg">
//         <div className="mb-1 flex space-x-3">
//           <div className="flex items-center justify-between">
//             <img src="./images/appointments_icon.svg" alt="" />
//           </div>
//           <div>
//             <h3 className="text-xl  font-bold text-gray-500">32</h3>
//             <p className="mt-1 text-lg font-bold text-gray-800">Appointments</p>
//           </div>
//         </div>
//       </div>

//       <div className="p-5 bg-white border border-gray-200 rounded-lg">
//         <div className="mb-1 flex space-x-3">
//           <div className="flex items-center justify-between">
//             <img src="./images/patients_icon.svg" alt="" />
//           </div>
//           <div>
//             <h3 className="text-xl  font-bold text-gray-500">25</h3>
//             <p className="mt-1 text-lg font-bold text-gray-800">Patients</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function EcommerceMetrics() {
  const metrics = [
    {
      icon: "./images/doctor_icon.svg",
      count: 14,
      label: "Employees",
    },
    {
      icon: "./images/appointments_icon.svg",
      count: 32,
      label: "Appointments",
    },
    {
      icon: "./images/patients_icon.svg",
      count: 25,
      label: "Patients",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {metrics.map((item, index) => (
        <div
          key={index}
          className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src={item.icon}
                alt={item.label}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{item.count}</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">
                {item.label}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
