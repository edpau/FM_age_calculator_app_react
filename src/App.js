import { useEffect, useState } from "react";
import moment from "moment";

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
  errorDay,
  onChangeErrorDay,
  errorMonth,
  onChangeErrorMonth,
  errorYear,
  onChangeErrorYear,
  errorDate,
  onChangeErrorDate,
  checkValid,
  onChangeCheckValid
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for day input
    if (!day) {
      onChangeErrorDay("This field is required");
    } else if (day < 1 || day > 31) {
      onChangeErrorDay("Must be a valid day");
    } else {
      onChangeErrorDay("");
    }

    // Validation for month input
    if (!month) {
      onChangeErrorMonth("Month is required");
    } else if (month < 1 || month > 12) {
      onChangeErrorMonth("Must be a valid month");
    } else {
      onChangeErrorMonth("");
    }

    // Validation for year input
    if (!year) {
      onChangeErrorYear("Year is required");
    } else if (year < 1900 || year > 2024) {
      onChangeErrorYear("Must be a valid year");
    } else {
      onChangeErrorYear("");
    }

    const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    const isValidDate = moment(dateString, "YYYY-MM-DD", true).isValid();
    const dateInMilliseconds = new Date(dateString).getTime();
    const dateInFuture = dateInMilliseconds > Date.now();

    if (!isValidDate || dateInFuture) {
      onChangeErrorDate("Invalid date");
    } else {
      onChangeErrorDate("");
    }

    onChangeCheckValid( day >= 1 &&
      day <= 31 &&
      month >= 1 &&
      month <= 12 &&
      year >= 1900 &&
      year <= 2024 &&
      isValidDate &&
      !dateInFuture) 
     
    // Call the handleCal function if all inputs are valid
    if (checkValid) {
      handleCal(day, month, year);
    }
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
            onChange={(e) => {
              onChangeDay(e.target.value);
            }}
          />
          {errorDay && <span>{errorDay}</span>}
          {!errorDay && !errorMonth && !errorYear && errorDate && (
            <span>{errorDate}</span>
          )}
        </label>
        <label>
          MONTH
          <input
            type="number"
            placeholder="MM"
            value={month}
            onChange={(e) => onChangeMonth(e.target.value)}
          />
          {errorMonth && <span>{errorMonth}</span>}
        </label>
        <label>
          YEAR
          <input
            type="number"
            placeholder="YYYY"
            value={year}
            onChange={(e) => onChangeYear(e.target.value)}
          />
          {errorYear && <span>{errorYear}</span>}
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

  const [errorDay, setErrorDay] = useState("");
  const [errorMonth, setErrorMonth] = useState("");
  const [errorYear, setErrorYear] = useState("");
  const [errorDate, setErrorDate] = useState("");

  const calculateAge = (day, month, year) => {
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
    setAge({ years, months, days });
  };

  const [checkValid, setCheckValid] = useState(true)

  useEffect(() => {
    calculateAge(day, month, year);
  }, []);



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
        errorDay={errorDay}
        onChangeErrorDay={setErrorDay}
        errorMonth={errorMonth}
        onChangeErrorMonth={setErrorMonth}
        errorYear={errorYear}
        onChangeErrorYear={setErrorYear}
        errorDate={errorDate}
        onChangeErrorDate={setErrorDate}
        checkValid= {checkValid}
        onChangeCheckValid = {setCheckValid}
      />
      {
        checkValid ? <p>
        {age.years}years{age.months}months{age.days}days
      </p> : <p>
        -- years -- months --days
      </p>

      }
      
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
