import React, { useEffect, useState} from 'react';
import { Calendar, momentLocalizer, } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TrainingsCalendar(){

const localizer = momentLocalizer(moment)

const [customerTrainings, setCustomerTrainings] = useState([]);

useEffect(() => getTrainings(), []);

    const getTrainings = () => {
          fetch('https://customerrest.herokuapp.com/gettrainings',
            {
              method: 'GET',
              headers: {
                  'Content-Type':'application/json'
              },
            }
          )
            .then(response => response.json())  
    }

const TrainingsCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      style={{height: 500, marginLeft: 80, marginRight: 80, marginTop: 80}}
      events={customerTrainings}
    />
  </div>
)
return(
    <div>
        <TrainingsCalendar/>
    </div>

);

}