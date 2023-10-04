import mongoose from "mongoose";

const schema = new mongoose.Schema({
  players: [
    {
      playerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: [true, "Player Id required"],
      },
    },
  ],

  fantasyName: {
    type: String,
    require: [true, "Fantasy name required"],
  },


  fantasyPrice: {
    type: Number,
    require: [true, "Fantasy price required"],
  },

  image: {
    type: String,
  },

  maxSelectablePlayers: {
    type: Number,
    require: [true, "Maximum selectable players required"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const fantasy = mongoose.model("Fantasy", schema);
