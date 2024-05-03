import React, { useState } from 'react'
import "./Departments.css"   
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCalendar,
   faFilter,
   faArrowDownShortWide,
   faMagnifyingGlass,
   faTrashCan,
   faEllipsis,
   faCircleXmark
  } from '@fortawesome/free-solid-svg-icons';
  import figma from "../../assets/figma.jpeg"






const Departments = () => {


    const [createDeparment, setcreateDeparment] = useState(false);

  const togglecreateDeparment = () =>{
    setcreateDeparment(!createDeparment);
  }



  return (
    <div className='wrapper-div-departments'>

{/* <---- TOP DIV ----> */}

<div className="top-div-departments">

 <div className="left-top-departments">

   <div className="heading-departments">
   <h4 className='heading-h4-departments'>Departments</h4>
   {/* <h4 className='responsive-h4-departments'>Teammates</h4> */}
 </div>

 </div>
 

 
 <div className="right-top-departments">

   <div className="calendar-departments">
   <h4><FontAwesomeIcon icon={faCalendar}/></h4>
   <h4>April 11, 2024</h4>
 </div>

 <h4 className='filter-departments'><FontAwesomeIcon icon={faFilter}/></h4>

 {/* <div className="calendar-responsive-departments">
   <div className='day-teammates'><h6>Day</h6></div>
   <div><h6>Week</h6></div>
   <div><h6>Month</h6></div>
 </div> */}

 <div className="add-departments" onClick={togglecreateDeparment}>
   <h5>Create Department</h5>
 </div>
 </div>
</div>
    {/* <---------------- CENTER DIV MANAGE APPS ------------------> */}

    <div className="center-div-departments">

        <div className="center-top-departments">

          <div className="search-departments">
            <input type="text" placeholder='Search Departments..!' /><div className="search-icon"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
          </div>

          <div className="center-top-right-departments">

            <div className="center-departments-sort">
            <FontAwesomeIcon icon={faArrowDownShortWide}/>
            <h6>Sort</h6>
            </div>

          </div>
        </div>

      </div>
{/* <----------------- BOTTOM DIV -----------------> */}
{createDeparment && 
      <div className="create-department-popup-wrapper">
        <div className="create-department-popup-departments">
        <div className="create-department-top-departments">
            <h4>Create Department</h4>
            <div onClick={togglecreateDeparment}><h4><FontAwesomeIcon icon={faCircleXmark} /></h4></div>
          </div>
          <div className="create-department-center-departments">
            <div className="create-department-top-center-departments">
                <h6>Department Name</h6>
                <input type="text" placeholder='Enter Department Name...!'/>
            </div>
          </div>
          <div className="create-department-bottom-departments">
            <div className="create-department-cancle-bottom-departments"><h6>Cancel</h6></div>
            <div className="create-department-invite-bottom-departments"><h6>Create</h6></div>
          </div>
      </div>
      </div>
      }



      <div className="bottom-div-departments">
        <div className="content-bottom-div-departments">
            <div className="top-div-bottom-departments">
                <div className="left-top-div-bottom-departments">
                    <h5>Select All</h5>
                </div>
                <div className="right-top-div-bottom-departments">
                   <h5>0 Departments Selected</h5>
                   <h6><FontAwesomeIcon icon={faTrashCan} /></h6>
                </div>
            </div>
            <div className="table-container-departments">
                <table>
                    <tr className='table-headding-departments'>
                        <th><h6>Role Name</h6></th>
                        <th><h6>Created</h6></th>
                        <th><h6>Members</h6></th>
                        <th><h6>Edit/Delete</h6></th>
                    </tr>
                    <tr>
                        <td className='table-data-appname-departments'><input type="checkbox" /> <h6>Management</h6></td>
                        <td><h6>Wed 24 April, 2024 02:22 PM</h6></td>
                        <td><h6>3</h6></td>
                        <td><h6><FontAwesomeIcon icon={faEllipsis} /></h6></td>
                    </tr>
                    
                </table>
            </div>
            <div className="responsive-table-departments">
                <table>
                    <tr>
                        <td><input type="checkbox" /><h6>Management</h6></td>
                        <td className='table-data-appname-departments'><h6><FontAwesomeIcon icon={faEllipsis} /></h6></td>
                    </tr>
                    <tr>
                        <td><h6>Created</h6></td>
                        <td className='date2-responsive-departments'><h6>Wed 20 April, 2024 02:33 PM</h6></td>
                        <td className='date-responsive-departments'><h6>Wed 20 April</h6></td>
                    </tr>
                    <tr>
                        <td><h6>Members</h6></td>
                        <td><h6>3</h6></td>
                    </tr>
                </table>
            </div>
        </div>
      </div>

    </div>
  )
}

export default Departments