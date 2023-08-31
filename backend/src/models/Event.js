import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  createdAt: String,
  userId: String,
  description: String,
  location: String,
  startDateTime: String,
  endDateTime: String,
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  comments: [
    {
      text: String,
      userId: String,
      createdAt: String,
    },
  ],
  boardGamesToBePlayed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BoardGame',
    },
  ],
});
const Event = mongoose.model('Event', eventSchema);
export default Event;
