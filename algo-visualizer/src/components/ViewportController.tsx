import { useState } from "react";

const ViewportController = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex justify-around gap-4 -mt-2">
      <a className="cursor-pointer">
        <BackIcon color="#4398c7" />
      </a>
      <a className="cursor-pointer block" onClick={togglePlay}>
        <PauseIcon color="#4398c7" hidden={!isPlaying ? "hidden" : ""} />
        <PlayIcon color="#4398c7" hidden={isPlaying ? "hidden" : ""} />
      </a>
      <a className="cursor-pointer">
        <NextIcon color="#4398c7" />
      </a>
    </div>
  );
};

interface IconProps {
  hidden?: string;
  color?: string;
}

const BackIcon = ({ color }: IconProps) => (
  <svg
    className="rotate-180 hover:saturate-300 transition-all delay-20 duration-200 ease-in-out"
    width="30px"
    viewBox="0 0 24 24"
    fill={`${color}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M3.76172 7.21957V16.7896C3.76172 18.7496 5.89172 19.9796 7.59172 18.9996L11.7417 16.6096L15.8917 14.2096C17.5917 13.2296 17.5917 10.7796 15.8917 9.79957L11.7417 7.39957L7.59172 5.00957C5.89172 4.02957 3.76172 5.24957 3.76172 7.21957Z"
        fill={`${color}`}
      ></path>{" "}
      <path
        d="M20.2383 18.9303C19.8283 18.9303 19.4883 18.5903 19.4883 18.1803V5.82031C19.4883 5.41031 19.8283 5.07031 20.2383 5.07031C20.6483 5.07031 20.9883 5.41031 20.9883 5.82031V18.1803C20.9883 18.5903 20.6583 18.9303 20.2383 18.9303Z"
        fill={`${color}`}
      ></path>{" "}
    </g>
  </svg>
);

const NextIcon = ({ color }: IconProps) => (
  <svg
    className="hover:saturate-300 transition-all delay-20 duration-200 ease-in-out"
    width="30px"
    viewBox="0 0 24 24"
    fill={`${color}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M3.76172 7.21957V16.7896C3.76172 18.7496 5.89172 19.9796 7.59172 18.9996L11.7417 16.6096L15.8917 14.2096C17.5917 13.2296 17.5917 10.7796 15.8917 9.79957L11.7417 7.39957L7.59172 5.00957C5.89172 4.02957 3.76172 5.24957 3.76172 7.21957Z"
        fill={`${color}`}
      ></path>{" "}
      <path
        d="M20.2383 18.9303C19.8283 18.9303 19.4883 18.5903 19.4883 18.1803V5.82031C19.4883 5.41031 19.8283 5.07031 20.2383 5.07031C20.6483 5.07031 20.9883 5.41031 20.9883 5.82031V18.1803C20.9883 18.5903 20.6583 18.9303 20.2383 18.9303Z"
        fill={`${color}`}
      ></path>{" "}
    </g>
  </svg>
);

const PlayIcon = ({ hidden, color }: IconProps) => (
  <svg
    className={`${hidden} hover:saturate-300 transition-all delay-20 duration-200 ease-in-out`}
    fill={`${color}`}
    width="30px"
    height="30px"
    viewBox="-5.6 -5.6 67.20 67.20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      id="SVGRepo_bgCarrier"
      strokeWidth="0"
      transform="translate(12.319999999999999,12.319999999999999), scale(0.56)"
    >
      <rect
        x="-5.6"
        y="-5.6"
        width="67.20"
        height="67.20"
        rx="33.6"
        fill="#ffffff"
      ></rect>
    </g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 23.7109 37.0469 C 22.6327 37.7031 21.4140 37.1875 21.4140 36.0625 L 21.4140 19.9375 C 21.4140 18.8594 22.7030 18.3906 23.7109 18.9766 L 36.8827 26.7812 C 37.8436 27.3437 37.8671 28.6797 36.8827 29.2656 Z"></path>
    </g>
  </svg>
);

const PauseIcon = ({ hidden, color }: IconProps) => (
  <svg
    className={`${hidden} hover:saturate-300 transition-all delay-20 duration-200 ease-in-out`}
    fill={`${color}`}
    width="30px"
    height="30px"
    viewBox="-5.6 -5.6 67.20 67.20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      id="SVGRepo_bgCarrier"
      stroke-width="0"
      transform="translate(10.64,10.64), scale(0.62)"
    >
      <rect
        x="-5.6"
        y="-5.6"
        width="67.20"
        height="67.20"
        rx="33.6"
        fill="#ffffff"
      ></rect>
    </g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M 27.9999 51.9063 C 41.0546 51.9063 51.9063 41.0781 51.9063 28 C 51.9063 14.9453 41.0312 4.0937 27.9765 4.0937 C 14.8983 4.0937 4.0937 14.9453 4.0937 28 C 4.0937 41.0781 14.9218 51.9063 27.9999 51.9063 Z M 21.8593 36.4609 C 20.7812 36.4609 20.3124 35.8984 20.3124 35.0312 L 20.3124 20.9922 C 20.3124 20.1484 20.7812 19.5625 21.8593 19.5625 L 23.9921 19.5625 C 25.0702 19.5625 25.5390 20.1484 25.5390 20.9922 L 25.5390 35.0312 C 25.5390 35.8984 25.0702 36.4609 23.9921 36.4609 Z M 31.9843 36.4609 C 30.9296 36.4609 30.4140 35.8984 30.4140 35.0312 L 30.4140 20.9922 C 30.4140 20.1484 30.9296 19.5625 31.9843 19.5625 L 34.1171 19.5625 C 35.1718 19.5625 35.6640 20.1484 35.6640 20.9922 L 35.6640 35.0312 C 35.6640 35.8984 35.1718 36.4609 34.1171 36.4609 Z"></path>
    </g>
  </svg>
);

export default ViewportController;
