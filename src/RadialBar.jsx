const RadialBar = ({ intervalHours, ranking }) => {
  // Map ranking (0-5) to percentage (0-100)
  const percentage = (ranking / 5) * 100;

  // Circle properties
  const circumference = 2 * Math.PI * 90;

  // Calculate stroke-dashoffset based on percentage
  const dashOffset = circumference * (1 - percentage / 100);

  // Adjust text ranking slightly based on number of digits
  const textX = intervalHours && (intervalHours.toString().length === 3 ? "58px" : "75px");

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="-25 -25 250 250"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle r="90" cx="100" cy="100" fill="transparent" stroke="#55505b" strokeWidth="20" />

      <circle
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        stroke="#509e86"
        strokeWidth="20"
        strokeLinecap="round"
        strokeDasharray={`${circumference}px`}
        strokeDashoffset={`${dashOffset}px`}
      />

      <text
        x={textX}
        y="115px"
        fill="#e0e0e0"
        fontSize="45px"
        fontWeight="bold"
        style={{ transform: "rotate(90deg) translate(0px, -196px)" }}
      >
        {intervalHours}h
      </text>
    </svg>
  );
};

export default RadialBar;
