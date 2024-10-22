'use client';
import { branches, teams } from '@/lib';
import React, { useState } from 'react';

const TeamMemberForm = () => {
  const [formData, setFormData] = useState({
    team: '',
    branch: '',
    enrollmentNumber: '',
    contactnumber: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { team, branch, enrollmentNumber, contactnumber } = formData;

    if (!team || !branch || !enrollmentNumber || !contactnumber) {
      alert('Please fill in all required fields.');
      return;
    }

    if (isNaN(enrollmentNumber)||enrollmentNumber.length < 14) {
      alert('Enrollment Number must be at least 14 digits.');
      return;
    }

    if (isNaN(contactnumber)||contactnumber.length < 10) {
      alert('Contact Number must be at least 10 digits.');
      return;
    }

    console.log('Form data', formData); // Log current formData
    alert('Form submitted successfully!');
  };

  return (
    <form className="min-w-0 md:max-w-[75%] mx-auto p-6 rounded-lg shadow-md bg-base-300" onSubmit={handleSubmit}>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Enrollment Number:</span>
        </label>
        <input
          type="text"
          name="enrollmentNumber"
          value={formData.enrollmentNumber}
          onChange={handleChange}
          required
          className="input  input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Branch:</span>
        </label>
        <select
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          required
          className="select select-bordered  w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
        >
          <option value="">Select Branch</option>
          {branches.map((branch) => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Team:</span>
        </label>
        <select
          name="team"
          value={formData.team}
          onChange={handleChange}
          required
          className="select w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team} value={team}>{team}</option>
          ))}
        </select>
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text">Contact Number:</span>
        </label>
        <input
          type="text"
          name="contactnumber"
          value={formData.contactnumber}
          onChange={handleChange}
          required
          className="input  input-bordered w-full border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary focus:border-primary"
        />
      </div>
      {(formData.team === "Designing" || formData.team === "Content-Editing") && (
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Upload PDF:</span>
          </label>
          <input type="file" className="file-input file-input-bordered w-full max-w-lg" accept='.pdf' />
        </div>
      )}
      <button type="submit" className="btn btn-primary w-full">Submit</button>
    </form>
  );
};

export default TeamMemberForm;
