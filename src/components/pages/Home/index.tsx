import { Jumbotron } from "reactstrap";
import GuestContent from "./GuestContent";
import HomeContent from "./HomeContent";

const Home = () => {
  return (
    <div className="home">
      <Jumbotron className="d-none d-sm-block">
        <div className="container">
          <div className="row row-header">
            <div>
              <h2>My page</h2>
              <h4>My page description</h4>
            </div>
          </div>
        </div>
      </Jumbotron>

      {/* {account == null ? <GuestContent /> : <HomeContent account={account} />} */}
    </div>
  );
};

export default Home;
