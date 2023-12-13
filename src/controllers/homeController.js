const getHomeInfo = (req, res) => {
  res.render("example.ejs", { title: "Hey", message: "Hello there!" });
};

module.exports = {
  getHomeInfo,
};
