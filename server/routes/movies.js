const router = require("express").Router();
const { prisma } = require("../db");
const checkAuth = require("../middleware/index");
const fetchSubscription = require("../Services/fecthSubscription");

router.get(`/`, (req, res) => {
  return res.send("hi animix");
});

router.get(`/movies/list`, checkAuth, async (req, res) => {
  const offset = parseInt(req.query.offset);
  //   const from = offset;
  //   const to = offset+12
  //   const updatedMovieslist = movies.slice(from,to)

  // return res.json({movies:updatedMovieslist,count:movies.length})
  const subscription = await fetchSubscription(req.user.email);
  if (!subscription) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized; no plan",
        },
      ],
    });
  }
  const count = await prisma.movie.count();
  const movies = await prisma.movie.findMany({
    take: 12,
    skip: offset,
  });
  console.log(offset);
  return res.json({ movies, count });
});

router.get(`/movies/:id`, checkAuth, async (req, res) => {
  const subscription = await fetchSubscription(req.user.email);
  if (!subscription) {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized; no plan",
        },
      ],
    });
  }

  const { id } = req.params;
  // const movie =movies.find(movie=>movie.id===id);
  const movie = await prisma.movie.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  console.log(movie.title, subscription.name);
  if (movie.title === "South Park" && subscription.name === "Basic Plan") {
    return res.status(403).json({
      errors: [
        {
          msg: "Unauthorized; nee premium plan",
        },
      ],
    });
  }

  return res.send(movie);
});

module.exports = router;
