function dateToDay(dateInput) {
  const myDate = new Date(dateInput);
  console.log(myDate.getTime());
  if (myDate === Nan)
  {
    
  }
  alert(myDate.toLocaleDateString("en-US", { weekday: "long" }));
}

dateToDay("high");
