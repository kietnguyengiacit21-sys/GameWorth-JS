const gameRepository = require('../repositories/gameRepository');

async function getGames(req, res, next) {
  try {
    const games = await gameRepository.findAll();
    res.json(games);
  } catch (error) {
    next(error);
  }
}

async function getGameById(req, res, next) {
  try {
    const game = await gameRepository.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        message: 'Game not found',
      });
    }

    res.json(game);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGames,
  getGameById,
};
