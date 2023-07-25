import getCurrentUser from "./_action/getCurrentUser";

const Home = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <div className="text-center">
        {currentUser ? <div>認証中</div> : <div>未認証</div>}
      </div>
    </div>
  );
};

export default Home;
