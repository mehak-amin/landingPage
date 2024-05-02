import React, { useState } from 'react';
import "./Teammates.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCalendar,
   faFilter,
    faMagnifyingGlass,
     faBarsStaggered,
      faArrowDownShortWide,
       faUser,
        faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import google from "../../assets/google.png"
import slack from "../../assets/slack.jpeg"

const Teamates = () => {

  const [addTeammate, setAddteammate] = useState(false);

  const toggleAddTeammate = () =>{
    setAddteammate(!addTeammate);
  }





  return (
    // <---- WRAPPER DIV ---->
    <div className='wrapper-div-teammates'>

       {/* <---- TOP DIV ----> */}

      <div className="top-div-teammates">

        <div className="left-top-teammates">

          <div className="heading-teammates">
          <h4 className='heading-h4-teammates'>Team Members</h4>
          <h4 className='responsive-h4-teammates'>Teammates</h4>
        </div>

        </div>
        

        
        <div className="right-top-teammates">

          <div className="calendar-teammates">
          <h4><FontAwesomeIcon icon={faCalendar}/></h4>
          <h4>April 11, 2024</h4>
        </div>

        <h4 className='filter-teammates'><FontAwesomeIcon icon={faFilter}/></h4>

        <div className="calendar-responsive-teammates">
          <div className='day-teammates'><h6>Day</h6></div>
          <div><h6>Week</h6></div>
          <div><h6>Month</h6></div>
        </div>

        <div className="add-teammates" onClick={toggleAddTeammate}>
          <h5>Add Team Members</h5>
        </div>
        </div>

      </div>

      {/* <---- CENTER DIV ----> */}

      <div className="center-div-teammates">

        <div className="center-top-teammates">

          <div className="search-teammates">
            <input type="text" placeholder='Search team member..!' /><div className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
          </div>

          <div className="center-top-right-teammates">
            <div className="center-teammates-filter">
            <FontAwesomeIcon icon={faBarsStaggered} />
            <h6>Filter</h6>
            </div>
            <div className="center-teammates-sort">
            <FontAwesomeIcon icon={faArrowDownShortWide} />
            <h6>Sort</h6>
            </div>
          </div>
        </div>


        <div className="center-bottom-teammates">
          <div className="center-bottom-buttons-teammates"><h5>Employees</h5><h5>21</h5></div>
          <div className="center-bottom-buttons-teammates"><h5>Working</h5><h5>15</h5></div>
          <div className="center-bottom-buttons-teammates"><h5>Late</h5><h5>3</h5></div>
          <div className="center-bottom-buttons-teammates"><h5>Slack</h5><h5>0</h5></div>
          <div className="center-bottom-buttons-teammates"><h5>Absent</h5><h5>3</h5></div>
        </div>

      </div>

      {/* <---- BOTTOM DIV ----> */}

      {addTeammate && 
      <div className="add-teammate-popup-wrapper">
        <div className="add-teammate-popup-teammates">

          <div className="addteammate-top-teammates">
            <h4>Add Teammate</h4>
            <div onClick={toggleAddTeammate}><h4><FontAwesomeIcon icon={faCircleXmark} /></h4></div>
          </div>
        
        <div className="center-addteammate-teammates">
          <h4>Add Team Members so you can Monitor their Output.</h4>
          <h5>Forming Teams helps you stay Structured.</h5>
        </div>

        <div className="inputs-addteammat-teammates">

          <div className="sec-input-holder-addteammate">
            <div>
              <h6>Full Name</h6>
              <input type="text" placeholder='Enter Your Full Name' />
            </div>
            <div>
              <h6>Email</h6>
              <input type="text" placeholder='Enter Your Email' />
            </div>
          </div>

          <div className="sec-input-holder-addteammate">
            <div>
              <h6>Department</h6>
              <select>
                <option>Management</option>
              </select>
            </div>
            <div>
              <h6>Role</h6>
              <select>
                <option>Employee</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bottom-addteammate-teammates">

          <div className="left-bottom-addteammate">
            <div><h5>Add Team Members</h5></div>
          </div>

          <div className="right-bottom-addteammate">

            <div className="sec-right-bottom-addteammate">
              <h6>Import From:</h6>
              <div className="auth-buttons-bottom-addteammate slack-addteammate"><img src={slack} alt="google" /><h5>Slack</h5></div>
              <div className="auth-buttons-bottom-addteammate google-addteammate"><img src={google} alt="google" /><h5>Workspace</h5></div>
            </div>

            <div className="sec-right-bottom-addteammate">
              <div className="cancle-bottom-addteammate"><h5>Cancle</h5></div>
              <div className="invite-bottom-addteammate"><h5>Invite</h5></div>
            </div>
          </div>
        </div>
      </div>
      </div>
      }
      
      <div className="bottom-div-teammates">
      <table className='table-teammates'>
    <tr className='bottom-table-row-teammates'>
        <td>Name</td>
        <td ><div><FontAwesomeIcon icon={faUser} />BASIT</div></td>
        <td ><div><FontAwesomeIcon icon={faUser} />HAZIK</div></td>
        <td><div><FontAwesomeIcon icon={faUser} />ZAHID</div></td>
        <td><div><FontAwesomeIcon icon={faUser} />ABID</div></td>
        <td><div><FontAwesomeIcon icon={faUser} />KHALID</div></td>
    </tr>
    <tr>
        <td>Role</td>
        <td>UI/UX</td>
        <td>Full Stack</td>
        <td>NodeJS</td>
        <td>NodeJS</td>
        <td>UI/UX</td>
    </tr>
    <tr>
        <td>Arrived At</td>
        <td>10.00 AM</td>
        <td>7.00 AM</td>
        <td>10.00 AM</td>
        <td>10.00 AM</td>
        <td>10.00 AM</td>
    </tr>
    <tr>
        <td>Left At</td>
        <td>4.00 PM</td>
        <td>9.00PM</td>
        <td>4.00 PM</td>
        <td>4.00 PM</td>
        <td>4.00 PM</td>
    </tr>
    <tr>
        <td>Productive Time</td>
        <td>3hr 56min</td>
        <td>12hr 1min</td>
        <td>3hr 56min</td>
        <td>3hr 56min</td>
        <td>3hr 56min</td>
    </tr>
    <tr>
        <td>Offline Time</td>
        <td>10m</td>
        <td>0m</td>
        <td>6m</td>
        <td>8m</td>
        <td>2m</td>
    </tr>
    <tr>
        <td>Active App</td>
        <td>Figma</td>
        <td>VS Code</td>
        <td>VS Code</td>
        <td>Youtube</td>
        <td>Figma</td>
    </tr>
    <tr>
        <td>Active Project</td>
        <td>DeskTime</td>
        <td>DeskTime</td>
        <td>DeskTime</td>
        <td>DeskTime</td>
        <td>DeskTime</td>
    </tr>
    <tr>
        <td>Desktime</td>
        <td>10m</td>
        <td>12hr</td>
        <td>10m</td>
        <td>10m</td>
        <td>10m</td>
    </tr>
</table>
<table className='table-responsive-teammates'>
    <tr>
        <td>Name</td>
        <td ><div><FontAwesomeIcon icon={faUser} />BASIT</div></td>
    </tr>
    <tr>
        <td>Role</td>
        <td>UI/UX</td>
        
    </tr>
    <tr>
        <td>Arrived At</td>
        <td>10.00 AM</td>
        
    </tr>
    <tr>
        <td>Left At</td>
        <td>4.00 PM</td>
        
    </tr>
    <tr>
        <td>Productive Time</td>
        <td>3hr 56min</td>
        
    </tr>
    <tr>
        <td>Offline Time</td>
        <td>10m</td>
        
    </tr>
    <tr>
        <td>Active App</td>
        <td>Figma</td>
        
    </tr>
    <tr>
        <td>Active Project</td>
        <td>DeskTime</td>
        
    </tr>
    <tr>
        <td>Desktime</td>
        <td>10m</td>
        
    </tr>
</table>

      </div>

    </div>
  )
}

export default Teamates