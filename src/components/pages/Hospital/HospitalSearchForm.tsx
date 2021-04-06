import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const HospitalSearchForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" placeholder="John" />

        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="Doe" />

        <label htmlFor="email">Email</label>
        <Field
          id="email"
          name="email"
          placeholder="john@acme.com"
          type="email"
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
};

export default HospitalSearchForm;
