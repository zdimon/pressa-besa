import * as React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginLeft: 20,
    marginBottom: 11,
    minWidth: 40,
    marginTop: 0,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


export default function LangSwitcher(props) {
    const classes = useStyles();
    const [lang, setLang] = React.useState(localStorage.getItem('lang'));

    const handleChange = (event) => {
      setLang(event.target.value);
      localStorage.setItem('lang',event.target.value);
      document.location = `/${event.target.value}/`;
    };
   
    return (
 
      <Select
      className={classes.formControl}
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={lang}
      onChange={handleChange}
    >
      <MenuItem value="ru"><img width="20" src="/static/images/ru.svg" /></MenuItem>
      <MenuItem value="en"><img src="/static/images/uk.svg" /></MenuItem>
      <MenuItem value="de"><img src="/static/images/de.svg" /></MenuItem>
    </Select>   
  
    )
}