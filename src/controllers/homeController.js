const getHomeInfo = (req, res) => {
  res.status(200).json({
    message: "Welcome to Project with Nodejs Express and MongoDB",
  });

  // res.render("example.ejs", { title: "Hey", message: "Hello there!" });
};

module.exports = {
  getHomeInfo,
};
