import React, {useState, useEffect} from "react";

function Clock(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return <span>{date.toLocaleTimeString()}</span>;
}

export default Clock;
