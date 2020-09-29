import React, { useState, useEffect, Fragment } from "react";
import Axios from "axios";
import classes from "./form.module.css";
const Form = () => {
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(false);
    const [firstSelectValue, setFirstSelectValue] = useState(
        "53b3e4c5-00ae-11eb-9c81-3f23acb642db"
    );

    const [secondSelectValue, setSecondSelectValue] = useState([]);

    const [isShow, setIsShow] = useState(false);

    const setToggle = (isShow) => {
        if (isShow === "show") {
            setIsShow(true);
        }

        if (isShow === "hidden") {
            setIsShow(false);
        }
    };

    useEffect(() => {
        setIsloading(true);
        setError(false);
        Axios.get(`https://jsonblob.com/api/${firstSelectValue}`)
            .then((res) => {
                console.log(res);
                setToggle(res.data.display);
                setSecondSelectValue(res.data.options);
                setIsloading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsloading(false);
                console.log(err);
            });
    }, [firstSelectValue]);

    let inputs = (
        <Fragment>
            <select className={classes.Select}>
                {secondSelectValue.map((item) => {
                    return (
                        <option value={item.value} key={item.value}>
                            {item.label}
                        </option>
                    );
                })}
            </select>

            {isShow ? <input placeholder="Input..." type="text" className={classes.Input} /> : null}
        </Fragment>
    );

    let form = (
        <form>
            <select
                className={classes.Select}
                value={firstSelectValue}
                onChange={(e) => setFirstSelectValue(e.target.value)}
            >
                <option value="53b3e4c5-00ae-11eb-9c81-3f23acb642db">value 1</option>
                <option value="21a2e655-00b0-11eb-9c81-819afa016b02">value 2</option>
            </select>
            {isLoading && !error ? (
                <span>Loading....</span>
            ) : !isLoading && error ? (
                <span>{error}</span>
            ) : (
                inputs
            )}
        </form>
    );

    return <div className={classes.Form}>{form}</div>;
};

export default Form;
