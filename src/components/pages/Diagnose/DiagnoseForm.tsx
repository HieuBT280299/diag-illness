import {
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useFormik } from "formik";
import { CITIES, DISTRICTS, WARDS } from "../../../shared/constants/geodata";
import { sortByName } from "../../../shared/helper";

const initialValues = {
  symptom: 1,
  name: "",
  number: "",
  phone: "",
};

const DiagnoseForm = () => {
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const symptoms = [
    { title: "The Shawshank Redemption", id: 1 },
    { title: "The Godfather", id: 2 },
    { title: "The Godfather: Part II", id: 3 },
    { title: "The Dark Knight", id: 4 },
    { title: "12 Angry Men", id: 5 },
    { title: "Schindler's List", id: 6 },
    { title: "Pulp Fiction", id: 7 },
    { title: "The Lord of the Rings: The Return of the King", id: 8 },
    { title: "The Good, the Bad and the Ugly", id: 9 },
    { title: "Fight Club", id: 10 },
    { title: "The Lord of the Rings: The Fellowship of the Ring", id: 11 },
    { title: "Star Wars: Episode V - The Empire Strikes Back", id: 12 },
    { title: "Forrest Gump", id: 13 },
    { title: "Inception", id: 14 },
    { title: "The Lord of the Rings: The Two Towers", id: 15 },
    { title: "One Flew Over the Cuckoo's Nest", id: 16 },
    { title: "Goodfellas", id: 17 },
    { title: "The Matrix", id: 18 },
    { title: "Seven Samurai", id: 19 },
    { title: "Star Wars: Episode IV - A New Hope", id: 20 },
  ];

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 12 }}>
        Diagnose your illness
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <Autocomplete
                fullWidth
                // name="symptom"
                options={symptoms}
                getOptionLabel={(option: any) => option.title}
                renderInput={(params) => (
                  <TextField {...params} label="Symptom" variant="outlined" />
                )}
                // value={formik.values.symptom.id}
                // onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="number"
                label="Detailed address"
                variant="outlined"
                value={formik.values.number}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12} lg={9}>
              <TextField
                fullWidth
                name="phone"
                label="Phone number"
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
          <Grid item container style={{ marginTop: 12 }}>
            <Grid item>
              <Button type="submit" color="primary" variant="contained">
                Search
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default DiagnoseForm;
