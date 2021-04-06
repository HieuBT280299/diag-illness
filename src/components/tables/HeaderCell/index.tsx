import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";

const HeaderCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.common.black,
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default HeaderCell;
