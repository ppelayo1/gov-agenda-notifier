import { gql } from '@apollo/client';

export const GET_ALL_MEETINGS_WITH_ITEMS = gql`
  query {
    getAllMeetingsWithItems {
      meeting {
        id
        status
      }
      items {
        id
        status
        order_number
        title_loc_key
      }
    }
  }
`;

export const GET_MEETING_DETAILS = gql`
  query ($meetingId: Int!) {
    getMeeting(id: $meetingId) {
      id
      status
      meeting_type
      created_timestamp
      updated_timestamp
      meeting_start_timestamp
      meeting_end_timestamp
      virtual_meeting_url
    }
  }
`;