import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
 

export default function FormControlLabelPosition() {
    const [value, setValue] = React.useState("female");

    function handleChange(event) {
        setValue(event.target.value);
    }

    return (
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="position"
                name="position"
                value={value}
                onChange={handleChange}
                row
            >
                <FormControlLabel
                    value="1"
                    control={<Radio color="secondary" />}
                    label="Initiative"
                    labelPlacement="end"
                />

                <FormControlLabel
                    value="2"
                    control={<Radio color="primary" />}
                    label="Tags Location"
                    labelPlacement="end"
                />

                <FormControlLabel
                    value="3"
                    control={<Radio color="primary" />}
                    label="Location"
                    labelPlacement="end"
                />
            </RadioGroup>
        </FormControl>
    );
}
