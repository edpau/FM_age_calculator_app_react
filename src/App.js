import { useState } from "react";

function DisplayAge() {
  return (
    <div>
      <p>Date</p>
    </div>
  );
}

function DateInput({
  day,
  onChangeDay,
  month,
  onChangeMonth,
  year,
  onChangeYear,
  handleCal,
}) {
  const handleSubmit = (e) => {
    handleCal(e, day, month, year);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label>
          DAY
          <input
            type="number"
            placeholder="DD"
            value={day}
            onChange={(e) => onChangeDay(e.target.value)}
          />
        </label>
        <label>
          MONTH
          <input
            type="number"
            placeholder="MM"
            value={month}
            onChange={(e) => onChangeMonth(e.target.value)}
          />
        </label>
        <label>
          YEAR
          <input
            type="number"
            placeholder="YYYY"
            value={year}
            onChange={(e) => onChangeYear(e.target.value)}
          />
        </label>
      </div>
      <input type="submit" className="button" value="Cal" />
    </form>
  );
}

function AgeCalCard() {
  const [day, setDay] = useState(24);
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState(1984);

  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const calculateAge = (e, day, month, year) => {
    // check y e is passed in
    e.preventDefault();

    // Milliseconds in a year 1000*60*60*24*365.25
    const millisecondsPerYear = 31557600000;

    let today = new Date();
    let dob = new Date(year, month - 1, day);
    let diff = today.getTime() - dob.getTime();

    // Convert milliseconds into years
    let years = Math.floor(diff / millisecondsPerYear);

    // Calculate remaining days after extracting years
    let remainingDays = diff % millisecondsPerYear;

    // Convert remaining days into months and days
    let months = Math.floor(remainingDays / (millisecondsPerYear / 12));
    let days = Math.floor(
      (remainingDays % (millisecondsPerYear / 12)) / (1000 * 60 * 60 * 24)
    );

    // we can setAge in this way, straight to a string
    //  setAge(`${years} years ${months} months ${days} days`)

    //give same result, need to learn
     //setAge({years:years, months:months, days:days})
     //setAge((prevAge) => ({ ...prevAge, years, months, days }));
    setAge({years, months, days})
  
  };
 


  return (
    <div>
      <DateInput
        day={day}
        onChangeDay={setDay}
        month={month}
        onChangeMonth={setMonth}
        year={year}
        onChangeYear={setYear}
        handleCal={calculateAge}
      />
      <p>{age.years}years{age.months}years{age.days}days</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <AgeCalCard />
    </div>
  );
}

export default App;
