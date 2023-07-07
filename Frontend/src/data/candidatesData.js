let d = [];
const totalInterviewees = 20;

for (let i = 1; i <= totalInterviewees; i++) {
  let x = parseInt(i/3)  +1;
  d.push({
    id: i,
    address: {
      city: 'Hyderabad',
      country: 'India',
      state: 'Telangana',
      street: 'Road No 5'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    email: 'candidate@outlook',
    name: `Candidate${i}`,
    phone: '0000000000',
    interviewer : `Interviewer${i%3 === 0 ? 3 : i%3}`,
    slot : x,
    status: "Round 1",
    interviewStatus : "Ongoing"
  });
}

export const data = d;

// export const data = [
//     {
//       id: '1',
//       address: {
//         city: 'Cleveland',
//         country: 'USA',
//         state: 'Ohio',
//         street: '2849 Fulton Street'
//       },
//       avatar: '/assets/avatars/avatar-carson-darrin.png',
//       email: 'carson.darrin@devias.io',
//       name: 'Candidate1',
//       phone: '3044283097',
//       interviewer : "Interviewer1",
//       slot : 1,
//       status: "Eliminated"
//     },
//     {
//       id: '2',
//       address: {
//         city: 'Cleveland',
//         country: 'USA',
//         state: 'Ohio',
//         street: '2849 Fulton Street'
//       },
//       avatar: '/assets/avatars/avatar-carson-darrin.png',
//       email: 'carson.darrin@devias.io',
//       name: 'Candidate2',
//       phone: '3044283097',
//       interviewer : "Interviewer2",
//       slot : 1,
//       status: "Ongoing"
//     },
//     {
//       id: '3',
//       address: {
//         city: 'Cleveland',
//         country: 'USA',
//         state: 'Ohio',
//         street: '2849 Fulton Street'
//       },
//       avatar: '/assets/avatars/avatar-carson-darrin.png',
//       email: 'carson.darrin@devias.io',
//       name: 'Candidate3',
//       phone: '3044283097',
//       interviewer : "Interviewer1",
//       slot : 1,
//       status: "Round 2"
//     },
//     {
//       id: '4',
//       address: {
//         city: 'Cleveland',
//         country: 'USA',
//         state: 'Ohio',
//         street: '2849 Fulton Street'
//       },
//       avatar: '/assets/avatars/avatar-carson-darrin.png',
//       email: 'carson.darrin@devias.io',
//       name: 'Candidate4',
//       phone: '3044283097',
//       interviewer : "Interviewer2",
//       slot : 1,
//       status: "Eliminated"
//     },
//     {
//       id: '5',
//       address: {
//         city: 'Cleveland',
//         country: 'USA',
//         state: 'Ohio',
//         street: '2849 Fulton Street'
//       },
//       avatar: '/assets/avatars/avatar-carson-darrin.png',
//       email: 'carson.darrin@devias.io',
//       name: 'Candidate5',
//       phone: '3044283097',
//       interviewer : "Interviewer1",
//       slot : 1,
//       status: "Eliminated"
//     }
// ];
