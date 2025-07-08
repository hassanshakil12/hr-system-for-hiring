// const BookedRankingTable = () => {
//   const salesData = [
//     {
//       rank: 1,
//       img: "./images/profile_img.svg",
//       name: "Richard James",
//       sales: "$89,000",
//       age: 28,
//       date: "2025-04-26",
//       time: "10:30 AM",
//       testType: "Blood Test (CBC)",
//       priority: "Urgent",
//       instruction: "Fasting Required"
//     },
//     {
//       rank: 2,
//       img: "./images/profile_img.svg",
//       name: "Richard James",
//       sales: "$89,000",
//       age: 28,
//       date: "2025-04-26",
//       time: "10:30 AM",
//       testType: "Blood Test (CBC)",
//       priority: "Urgent",
//       instruction: "Bring Prior Report"
//     }, {
//       rank: 3,
//       img: "./images/profile_img.svg",
//       name: "Richard James",
//       sales: "$89,000",
//       age: 28,
//       date: "24th,July,2024",
//       time: "10:30 AM",
//       testType: "Blood Test (CBC)",
//       priority: "Urgent",
//       instruction: "Bring Prior Report"
//     },
//     {
//       rank: 4,
//       img: "./images/profile_img.svg",
//       name: "Richard James",
//       sales: "$89,000",
//       age: 28,
//       date: "2025-04-26",
//       time: "10:30 AM",
//       testType: "Blood Test (CBC)",
//       priority: "Urgent",
//       instruction: "Bring Prior Report"
//     },
//   ];

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-sm overflow-x-auto lg:overflow-visible">
//     <h1 className="text-center text-xl font-bold">Schedule Appointments</h1>
//     <table className="w-full border-collapse min-w-[600px]">
//       <thead>
//         <tr>
//           <th colSpan={4} className="py-2">
//             <div className="flex justify-center"></div>
//           </th>
//         </tr>
//         <tr className="border-b border-gray-800">
//           <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center tracking-wider">#</th>
//           <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center tracking-wider">Patient</th>
//           <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center tracking-wider">Age</th>
//           <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center tracking-wider">Date & Time</th>
//           <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center tracking-wider">Test Type</th>
//           <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center tracking-wider">Priority</th>
//           <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center tracking-wider">Instruction</th>
//         </tr>
//       </thead>
//       <tbody className="divide-y divide-gray-800">
//         {salesData.map((item) => (
//           <tr key={item.rank}>
//             <td className="py-2 md:py-3 text-xs md:text-sm font-medium text-center">{item.rank}</td>
//             <td className="py-2 md:py-3 text-xs md:text-sm text-center">
//               <img src={item.img} alt={item.name} className="inline-block w-6 h-6 md:w-8 md:h-8 mr-2" />
//               {item.name}
//             </td>
//             <td className="py-2 md:py-3 text-xs md:text-sm text-center">{item.age}</td>
//             <td className="py-2 md:py-3 text-xs md:text-sm text-center">{item.date} , {item.time}</td>
//             <td className="py-2 md:py-3 text-xs md:text-sm text-center">{item.testType}</td>
//             <td className="py-2 md:py-3 text-xs md:text-sm text-center">{item.priority}</td>
//             <td className="py-2 md:py-3 text-xs md:text-sm text-center">{item.instruction}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//   );
// };

// export default BookedRankingTable;

const BookedRankingTable = () => {
  const salesData = [
    {
      rank: 1,
      img: "./images/profile_img.svg",
      name: "Richard James",
      sales: "$89,000",
      age: 28,
      date: "2025-04-26",
      time: "10:30 AM",
      testType: "Blood Test (CBC)",
      priority: "Urgent",
      instruction: "Fasting Required",
    },
    {
      rank: 2,
      img: "./images/profile_img.svg",
      name: "Richard James",
      sales: "$89,000",
      age: 28,
      date: "2025-04-26",
      time: "10:30 AM",
      testType: "Blood Test (CBC)",
      priority: "Urgent",
      instruction: "Bring Prior Report",
    },
    {
      rank: 3,
      img: "./images/profile_img.svg",
      name: "Richard James",
      sales: "$89,000",
      age: 28,
      date: "2024-07-24",
      time: "10:30 AM",
      testType: "Blood Test (CBC)",
      priority: "Urgent",
      instruction: "Bring Prior Report",
    },
    {
      rank: 4,
      img: "./images/profile_img.svg",
      name: "Richard James",
      sales: "$89,000",
      age: 28,
      date: "2025-04-26",
      time: "10:30 AM",
      testType: "Blood Test (CBC)",
      priority: "Urgent",
      instruction: "Bring Prior Report",
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm overflow-x-auto lg:overflow-visible">
      <h1 className="text-center text-xl font-bold mb-3">
        Schedule Appointments
      </h1>
      <table className="w-full border-collapse min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center">
              #
            </th>
            <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center">
              Patient
            </th>
            <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center">
              Age
            </th>
            <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center">
              Date & Time
            </th>
            <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center">
              Test Type
            </th>
            <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center">
              Priority
            </th>
            <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center">
              Instruction
            </th>
            <th className="py-3 text-xs md:text-sm font-medium text-gray-500 uppercase text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {salesData.map((item) => (
            <tr key={item.rank}>
              <td className="py-2 text-xs md:text-sm text-center">
                {item.rank}
              </td>
              <td className="py-2 text-xs md:text-sm text-center">
                <div className="flex items-center justify-center gap-2">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                  />
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="py-2 text-xs md:text-sm text-center">
                {item.age}
              </td>
              <td className="py-2 text-xs md:text-sm text-center">
                {item.date}, {item.time}
              </td>
              <td className="py-2 text-xs md:text-sm text-center">
                {item.testType}
              </td>
              <td className="py-2 text-xs md:text-sm text-center">
                {item.priority}
              </td>
              <td className="py-2 text-xs md:text-sm text-center">
                {item.instruction}
              </td>
              <td className="py-2 text-xs md:text-sm text-center">
                <span className="inline-block px-3 py-1 rounded-3xl text-xs font-semibold bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookedRankingTable;
