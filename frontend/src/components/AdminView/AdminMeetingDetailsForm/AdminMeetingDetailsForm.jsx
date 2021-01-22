import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { GET_MEETING_DETAILS } from '../../../graphql/graphql';
import './AdminMeetingDetailsForm.scss';

function AdminMeetingDetailsForm({ meeting }) {
  const { loading, error, data, refetch } = useQuery(GET_MEETING_DETAILS, { variables: { meetingId: meeting.id } });

  // // eslint-disable-next-line no-console
  // if (loading) console.log('THE Loading: ', loading);
  // // eslint-disable-next-line no-console
  // if (error) console.log('THE Error: ', error);
  // // eslint-disable-next-line no-console
  // console.log(data);

  const { register, handleSubmit, errors } = useForm({ mode: 'onTouched' });
  const onSubmit = () => {
    refetch();
    console.log(data);
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="form-section">
        <h4 className="form-title">Basic Information</h4>
        <div className="form-field">
          <label for="meeting-details-date">Date</label>
          <input
            id="meeting-details-date"
            name="date"
            type="date"
            ref={register}
          />
        </div>
        <div className="form-field">
          <label for="meeting-details-time">Time</label>
          <input
            id="meeting-details-time"
            name="time"
            type="time"
            ref={register}
          />
        </div>
        <div className="form-field">
          <label for="meeting-details-status">Meeting Status</label>
          <select id="meeting-details-status" name="meeting-status" defaultValue="update-status" ref={register}>
            <option value="update-status" disabled>Update Status</option>
            <option value="in-progress">In Progress</option>
            <option value="in-recess">In Recess</option>
            <option value="ended">Ended</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </section>

      <section className="form-section">
        <h4 className="form-title">Virtual Meeting Information</h4>
        <div className="form-field">
          <label for="meeting-details-link">Virtual Meeting Link</label>
          <input
            id="meeting-details-link"
            name="virtual-meeting-link"
            type="text"
            ref={register}
          />
        </div>
        <div className="form-field">
          <label for="meeting-details-id">Virtual Meeting ID</label>
          <input
            id="meeting-details-id"
            name="virtual-meeting-id"
            type="text"
            ref={register}
          />
        </div>
        <div className="form-field">
          <label for="meeting-details-phone">Call-in Information</label>
          <input
            id="meeting-details-phone"
            name="call-in-information"
            type="text"
            ref={register}
          />
        </div>
      </section>

      <section className="form-section">
        <h4 className="form-title">Meeting Broadcast</h4>
        <div className="form-field">
          <label for="meeting-details-broadcast-link">City of San José Link</label>
          <input
            id="meeting-details-broadcast-link"
            name="city-link"
            type="text"
            ref={register}
          />
        </div>
        <div className="form-field">
          <label for="meeting-details-youtube-link">Channel</label>
          <input
            id="meeting-details-youtube-link"
            name="youtube-link"
            type="text"
            ref={register}
          />
        </div>
      </section>
      
      <section className="form-section">
        <h4 className="form-title">Public Comment</h4>
        <div className="form-field">
          <label for="meeting-details-email-before">Email - Before Meeting</label>
          <input
            id="meeting-details-email-before"
            name="email-before-meeting"
            type="text"
            ref={register}
          />
        </div>
        <div className="form-field">
          <label for="meeting-details-email-during">Email - During Meeting</label>
          <input
            id="meeting-details-email-during"
            name="email-during-meeting"
            type="text"
            ref={register}
          />
        </div>
        <div className="form-field">
          <label for="meeting-details-e-comment">eComment</label>
          <input
            id="meeting-details-e-comment"
            name="e-comment"
            type="text"
            ref={register}
          />
        </div>
      </section>

      <input type="submit"/>
    </form>
  )
}

export default AdminMeetingDetailsForm;
