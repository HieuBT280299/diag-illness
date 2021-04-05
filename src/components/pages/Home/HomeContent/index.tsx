const HomeContent = ({ account }: any) => {
  const accountFullName = account.firstName + " " + account.lastName;
  return (
    <div className="container">
      <div className="row row-content">
        <div className="col-12 mt-5">
          <h2>Welcome back, {accountFullName}</h2>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
