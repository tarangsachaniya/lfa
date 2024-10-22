import mongoose, { Schema } from "mongoose";
import { branches, teams } from "..";

const teamMemberSchema = new Schema({
      userId:{
            type: String,
            required: true
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
      },
      portfolio:{
            type: String,
            default: 'null'
      }
},{
      timestamps: true,
});

const TeamMember = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;