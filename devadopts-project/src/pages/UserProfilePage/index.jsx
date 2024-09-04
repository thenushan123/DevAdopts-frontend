// import React, { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";
// import "./userprofilepage.css";

// export default function UserProfilePage() {
//   const [userDetails, setUserDetails] = useState(null);
//   const token = localStorage.getItem("token");
//   const decodedtoken = jwtDecode(token);
//   const userId = decodedtoken.userId;

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3000/users/${userId}`,
//           {
//             headers: {
//               authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setUserDetails(response.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getUser();
//   }, [token, userId]);

//   console.log("userDeatils", userDetails);

//   if (userDetails) {
//     return (
//       <div className="container">
//         <div className="sidebar-container">
//           <div className="button">
//             <p className="text">Account Information</p>
//           </div>
//           <div className="button">
//             <p className="text">Preferences</p>
//           </div>
//           <div className="button">
//             <p className="text">Favourites</p>
//           </div>
//           <div className="button">
//             <p className="text">Donations</p>
//           </div>
//         </div>
//         <div className="information-container">
//           <p className="text1">First Name: {userDetails.first_name}</p>
//           <p className="text1">Surname: {userDetails.last_name}</p>
//           <p className="text1">Email: {userDetails.email}</p>
//         </div>
//       </div>
//     );
//   } else {
//     return <div>Loading</div>;
//   }
// }
