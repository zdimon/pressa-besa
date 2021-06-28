import * as React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function LangSwitcher(props) {
    
    const [lang, setLang] = React.useState(props.selector);

    const handleChange = (event) => {
      setLang(event.target.value);
      document.location = `/${event.target.value}/`;
    };
   
    return (
      <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={lang}
      onChange={handleChange}
    >
      <MenuItem value="ru">RU</MenuItem>
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="de">DE</MenuItem>
    </Select>       
    )
}