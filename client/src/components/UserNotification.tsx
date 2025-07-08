// const NotificationsPage = () => {
//   const notifications = [
//     {
//       title: "Payment Received",
//       message: "You received $10,000 from Kebby Industries.",
//       time: "2 hours ago",
//     },
//     {
//       title: "Profile Updated",
//       message: "Your profile was successfully updated.",
//       time: "1 day ago",
//     },
//     {
//       title: "New Commission Earned",
//       message: "You've earned a new $15 commission.",
//       time: "3 days ago",
//     },
//     {
//       title: "Account Login",
//       message: "You logged in from a new device.",
//       time: "1 week ago",
//     },
//   ];

//   return (
//     <div className="bg-white p-4 font-sans flex">
//       {/* Left Sidebar - Actions */}
//       <div className="w-1/4 pr-4">
//         <div className="flex flex-col items-center">
//           <button className="text-sm font-medium text-blue-600 border border-gray-300 rounded-lg p-2 w-[10rem] mb-4 hover:text-blue-800">
//             NOTIFICATIONS
//           </button>
//           <img
//             src="./images/notification-icon.png"
//             alt="Notifications"
//             className="w-20 h-20 mb-4"
//           />
//           <p className="text-center text-gray-600 text-sm">
//             Stay up-to-date with the latest activity
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Notifications List */}
//       <div className="w-3/4">
//         <h1 className="text-xl font-bold mb-4">Recent Notifications</h1>
//         <div className="space-y-4">
//           {notifications.map((note, index) => (
//             <div
//               key={index}
//               className="border border-gray-200 rounded-lg p-4 shadow-sm"
//             >
//               <h2 className="font-semibold text-gray-800">{note.title}</h2>
//               <p className="text-sm text-gray-600">{note.message}</p>
//               <p className="text-xs text-gray-400 mt-1">{note.time}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;

const NotificationsPage = () => {
  const notifications = [
    {
      title: "Payment Received",
      message: "You received $10,000 from Kebby Industries.",
      time: "2 hours ago",
    },
    {
      title: "Profile Updated",
      message: "Your profile was successfully updated.",
      time: "1 day ago",
    },
    {
      title: "New Commission Earned",
      message: "You've earned a new $15 commission.",
      time: "3 days ago",
    },
    {
      title: "Account Login",
      message: "You logged in from a new device.",
      time: "1 week ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white rounded-xl shadow p-5 text-center">
        <img
          src="./images/notification-icon.png"
          alt="Notification Icon"
          className="w-16 h-16 mx-auto mb-4"
        />
        <h2 className="text-lg font-semibold text-blue-600 mb-2">
          Notifications
        </h2>
        <p className="text-sm text-gray-500">
          Stay informed with your latest updates and alerts.
        </p>
      </div>

      {/* Notification List */}
      <div className="w-full lg:w-3/4">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Recent Notifications
        </h1>

        <div className="space-y-4">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <h3 className="text-gray-800 font-medium">{note.title}</h3>
              <p className="text-sm text-gray-600">{note.message}</p>
              <p className="text-xs text-gray-400 mt-1">{note.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
