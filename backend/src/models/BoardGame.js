import mongoose from 'mongoose';

const boardGameSchema = new mongoose.Schema({
  title: String,
  createdAt: String,
  publishYear: String,
  publisher: String,
  isBaseGame: Boolean,
  descriptionShort: String,
  descriptionLong: String,
  imageUrl: String,
  hiresImageUrl: String,
  playersMax: Number,
  playersMin: Number,
  playtimeMax: Number,
  playtimeMin: Number,
  genre: String,
  rating: Number,
  relatedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  playerbase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
const BoardGame = mongoose.model('BoardGame', boardGameSchema);
export default BoardGame;
