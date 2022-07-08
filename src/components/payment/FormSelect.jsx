import Feedback from "react-bootstrap/esm/Feedback";
import Select from "react-select";

const FormSelect = ({
    value,
    onChange,
    options,
    error,
    onBlur,
    id,
    name,
    touched,
}) => {
    return (
        <div className="my-1">
            <div>
                <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable="true"
                    value={value}
                    options={options}
                    onChange={onChange}
                    id={id}
                    name={name}
                    onBlur={onBlur}
                />
            </div>
            {touched && error ? <p>{error}</p> : null}
            <Feedback>{error}</Feedback>
        </div>
    );
};

export default FormSelect;
