const ProcessingAnim = ({ title }: { title: string }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-row items-center justify-center font-SESAT no-select">
      <div className="w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" className="m-auto bg-none block" width="30px" height="30px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <g transform="rotate(0 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(30 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(60 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(90 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(120 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(150 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(180 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(210 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(240 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(270 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(300 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
            </rect>
          </g><g transform="rotate(330 50 50)">
            <rect x="45.5" y="7" rx="4.5" ry="6.4" width="9" height="20" fill="currentColor">
              <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
            </rect>
          </g>
        </svg>
      </div>
      <span className="ml-1">{title}</span>

    </div>
  );
}
//3D4451
export default ProcessingAnim;