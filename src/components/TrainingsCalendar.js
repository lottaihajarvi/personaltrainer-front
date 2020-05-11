import React, { useEffect, useState} from 'react';
import { Calendar, momentLocalizer, } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TrainingsCalendar(){

const localizer = momentLocalizer(moment)

const [trainings, setTrainings] = useState([]);

const TrainingsCalendar = props => (
  <div>
    <Calendar
      localizer={localizer}
      style={{height: 500, marginLeft: 80, marginRight: 80, marginTop: 80}}
      events={trainings}
    />
  </div>
)
return(
    <div>
        <TrainingsCalendar/>
    </div>

);

}