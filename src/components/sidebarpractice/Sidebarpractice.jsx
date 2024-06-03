import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faCog,
  faChartBar,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons"; // Import desired icons

const Sidebarpractice = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
    setDropdownOpen(false); // Close the dropdown when settings are toggled
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const data = {
    logo: "App Tracker",
    sections: [
      {
        title: "Main menu",
        items: [
          { name: "Dashboard", link: "/dashboard", icon: faHome },
          { name: "My Screen", link: "/myscreen", icon: faChartBar },
        ],
      },
      {
        title: "Data Administration",
        items: [
          { name: "Teammates", link: "/teammates", icon: faChartBar },
          { name: "Work Planners", link: "/workplanners", icon: faChartBar },
          { name: "Ventures", link: "/ventures", icon: faChartBar },
          {
            name: "Absence Calendar",
            link: "/absencecalendar",
            icon: faChartBar,
          },
          {
            name: "Screen Captures",
            link: "/screencaptures",
            icon: faChartBar,
          },
          { name: "Fellow Workers", link: "/fellowworkers", icon: faChartBar },
          { name: "Reports", link: "/reports", icon: faChartBar },
          { name: "Data Export", link: "/dataexport", icon: faChartBar },
          { name: "Offline Times", link: "/offlinetimes", icon: faChartBar },
        ],
      },
      {
        title: "Customization",
        items: [
          {
            name: "Settings",
            icon: faCog,
            subItems: [
              { name: "Setting 1", link: "/setting1", icon: faCog },
              { name: "Setting 2", link: "/setting2", icon: faCog },
            ],
          },
          { name: "Affiliates", link: "/affiliates", icon: faUser },
        ],
      },
    ],
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light border-right">
      <div className="p-3 border-bottom">
        <span className="navbar-brand">{data.logo}</span>
      </div>

      <div className="flex-column p-3">
        {data.sections.map((section, index) => (
          <div key={index}>
            {section.title && <hr />}
            {section.title && (
              <div className="font-weight-bold">{section.title}</div>
            )}

            {section.items.map((item, idx) => (
              <div key={idx}>
                {item.name === "Settings" ? (
                  <div
                    className="nav-link"
                    onClick={() => {
                      toggleSettings();
                      toggleDropdown();
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} /> {item.name}{" "}
                    <FontAwesomeIcon icon={faAngleDown} />
                  </div>
                ) : (
                  <Link to={item.link} className="nav-link">
                    <FontAwesomeIcon icon={item.icon} /> {item.name}
                  </Link>
                )}

                {item.subItems && item.name === "Settings" && settingsOpen && (
                  <div className="pl-3">
                    {item.subItems.map((subItem, subIdx) => (
                      <div key={subIdx}>
                        <Link to={subItem.link} className="nav-link">
                          <FontAwesomeIcon icon={subItem.icon} /> {subItem.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebarpractice;

// -------------------------------------------------------------------
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faUser,
//   faCog,
//   faChartBar,
// } from "@fortawesome/free-solid-svg-icons"; // Import desired icons

// const Sidebarpractice = () => {
//   const [settingsOpen, setSettingsOpen] = useState(false);

//   const toggleSettings = () => {
//     setSettingsOpen(!settingsOpen);
//   };

//   const data = {
//     logo: "App Tracker",
//     sections: [
//       {
//         title: "Main menu",
//         items: [
//           { name: "Dashboard", link: "/dashboard", icon: faHome }, // Add icon property
//           { name: "My Screen", link: "/myscreen", icon: faChartBar }, // Add icon property
//         ],
//       },
//       {
//         title: "Data Administration",
//         items: [
//           { name: "Teammates", link: "/teammates", icon: faChartBar },
//           { name: "Work Planners", link: "/workplanners", icon: faChartBar },
//           { name: "Ventures", link: "/ventures", icon: faChartBar },
//           {
//             name: "Absence Calendar",
//             link: "/absencecalendar",
//             icon: faChartBar,
//           },
//           {
//             name: "Screen Captures",
//             link: "/screencaptures",
//             icon: faChartBar,
//           },
//           { name: "Fellow Workers", link: "/fellowworkers", icon: faChartBar },
//           { name: "Reports", link: "/reports", icon: faChartBar },
//           { name: "Data Export", link: "/dataexport", icon: faChartBar },
//           { name: "Offline Times", link: "/offlinetimes", icon: faChartBar },
//         ],
//       },
//       {
//         title: "Customization",
//         items: [
//           {
//             name: "Settings",
//             icon: faCog,
//             subItems: [
//               { name: "Setting 1", link: "/setting1", icon: faCog }, // Add icon property
//               { name: "Setting 2", link: "/setting2", icon: faCog }, // Add icon property
//             ],
//           },
//           { name: "Affiliates", link: "/affiliates", icon: faUser }, // Add icon property
//         ],
//       },
//     ],
//   };

//   return (
//     <div className="d-flex flex-column vh-100 bg-light border-right">
//       <div className="p-3 border-bottom">
//         <span className="navbar-brand">{data.logo}</span>
//       </div>

//       <div className="flex-column p-3">
//         {data.sections.map((section, index) => (
//           <div key={index}>
//             {section.title && <hr />}
//             {section.title && (
//               <div className="font-weight-bold">{section.title}</div>
//             )}

//             {section.items.map((item, idx) => (
//               <div key={idx}>
//                 {item.name === "Settings" ? (
//                   <div className="nav-link" onClick={toggleSettings}>
//                     <FontAwesomeIcon icon={item.icon} /> {item.name}
//                   </div>
//                 ) : (
//                   <Link to={item.link} className="nav-link">
//                     <FontAwesomeIcon icon={item.icon} /> {item.name}
//                   </Link>
//                 )}

//                 {item.subItems && item.name === "Settings" && settingsOpen && (
//                   <div className="pl-3">
//                     {item.subItems.map((subItem, subIdx) => (
//                       <div key={subIdx}>
//                         <Link to={subItem.link} className="nav-link">
//                           <FontAwesomeIcon icon={subItem.icon} /> {subItem.name}
//                         </Link>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebarpractice;
