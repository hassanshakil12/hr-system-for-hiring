// const AddEmployee = () => {
//   return (
//     <div className="max-w-5xl p-6 bg-white rounded-lg shadow-md">
//       <div>
//         <div className="flex items-center space-x-3 mb-8">
//           <div className="relative">
//             <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
//               {/* Placeholder for patient picture */}
//               <svg
//                 className="w-8 h-8 text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//             </div>
//             <button className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600">
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="flex flex-col">
//             <h1 className="text-xl text-[#7B7B7B]">Upload picture</h1>
//           </div>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Full name
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Name"
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//             </div>
//             <input
//               type="email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Email"
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 Contact Number
//               </label>
//             </div>
//             <input
//               type="tel"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Contact Number"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Address
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Hire Date
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Hire Date"
//             />
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 Employee ID
//               </label>
//             </div>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Username
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//             </div>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Job Role
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <label className="block text-sm font-medium text-gray-700">
//                 Shift
//               </label>
//             </div>
//             <input
//               type="text"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col ">
//         <div className="mt-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             About
//           </label>
//           <textarea
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows={3}
//             placeholder="Write About Yourself"
//           ></textarea>
//         </div>

//         <div className="mt-6 flex justify-center space-x-5 items-center">
//           <button className="px-6 py-2 bg-[#A7CDEA] text-black rounded-3xl hover:bg-blue-600">
//             Add Employee
//           </button>
//           <button className="px-6 py-2 bg-[#A7CDEA] text-black rounded-3xl hover:bg-blue-600">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;

import React from "react";

// Define prop types for InputField
interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
}

// Reusable InputField Component
const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder = "",
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

const AddEmployee: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-8">
      {/* Upload Section */}
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-2 border-gray-300">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 sm:mt-0">
          <h2 className="text-lg font-semibold text-gray-700">
            Upload Profile Picture
          </h2>
          <p className="text-sm text-gray-500">Max size: 5MB | JPG or PNG</p>
        </div>
      </div>

      {/* Form Section */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side */}
        <div className="space-y-5">
          <InputField label="Full Name" placeholder="Enter full name" />
          <InputField label="Email" type="email" placeholder="Enter email" />
          <InputField
            label="Contact Number"
            type="tel"
            placeholder="e.g. +1 123 456 7890"
          />
          <InputField label="Address" placeholder="Enter address" />
          <InputField label="Hire Date" type="date" />
        </div>

        {/* Right Side */}
        <div className="space-y-5">
          <InputField label="Employee ID" placeholder="e.g. EMP1023" />
          <InputField label="Username" placeholder="Create username" />
          <InputField
            label="Password"
            type="password"
            placeholder="Create password"
          />
          <InputField label="Job Role" placeholder="e.g. Frontend Developer" />

          {/* Shift Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shift
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select Shift
              </option>
              <option value="morning">Morning (8AM - 4PM)</option>
              <option value="evening">Evening (4PM - 12AM)</option>
              <option value="night">Night (12AM - 8AM)</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
      </form>

      {/* About */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          About
        </label>
        <textarea
          rows={4}
          placeholder="Write something about the employee..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-5 mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Add Employee
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
