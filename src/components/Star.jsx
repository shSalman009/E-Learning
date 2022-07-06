import { useState } from "react";

export default function Star({ number = 5, size = 25 }) {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);

    const handleClick = (value) => {
        setCurrentValue(value);
    };
    const mouseOn = (value) => {
        setHoverValue(value);
    };
    const mouseOut = () => {
        setHoverValue(undefined);
    };
    return (
        <div>
            {[...Array(number)].map((element, index) => (
                <svg
                    onClick={() => {
                        handleClick(index + 1);
                    }}
                    onMouseOver={() => {
                        mouseOn(index + 1);
                    }}
                    onMouseLeave={mouseOut}
                    key={index}
                    style={{
                        width: `${size}px`,
                        filter: `${
                            (hoverValue || currentValue) > index
                                ? "invert(54%) sepia(0%) saturate(2%) hue-rotate(33deg) brightness(94%) contrast(89%)"
                                : "invert(58%) sepia(85%) saturate(373%) hue-rotate(1deg) brightness(103%) contrast(92%)"
                        }`,
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                >
                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                </svg>
            ))}
        </div>
    );
}
