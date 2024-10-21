import mongoose, { Schema } from "mongoose";
import { branches, teams } from "..";

const teamMemberSchema = new Schema({
      userId:{
            type: Schema.Types.ObjectId,
            ref: 'User'
      },
      team:{
            type: String,
            required: true,
            enum : teams
      },
      position:{
            type: String,
            required: true,
            enum: ['Member','Head'],
            default: 'Member'
      },
      branch : {
            type: String,
            required: true,
            enum: branches
      },
      enrollmentNumber:{
            type: Number,
            required: true,
            minlength: 14
      },
      issue:{
            type: String,
            default: "2.1"
      },
      contactnumber:{
            type: Number,
            required: true,
            minlength: 10
      },
      requestStatus:{
            type: Boolean,
            default: false
      }
},{
      timestamps: true,
});

const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;