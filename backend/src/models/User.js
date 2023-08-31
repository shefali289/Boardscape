import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  createdAt: String,
  joinedEvents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  ],
  playedBoardGames: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BoardGame',
    },
  ],
});

const User = mongoose.model('User', userSchema);
export default User;
