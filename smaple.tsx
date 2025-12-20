//  const checkAuthStatus = async () => {
//       try {
//         const response = await axiosInstance.get(API_ROUTES.AUTH_STATUS);
//         const { user, accessToken, roomState } = response.data;

//         dispatch(completeInitialHydration({ user, accessToken }));

//         if (roomState) {
//           dispatch(setPrivateRoom(roomState));

//           // Calculate state for EVERY member to restore the "Connected" UI
//           roomState.members.forEach((member: any) => {
//             if (member.id !== user.id) {
//               dispatch(setInviteState({ friendId: member.id, state: "connected" }));
//             }
//           });

//           // Handle specific "Pending" state for Host
//           if (roomState.status === "pending" && roomState.hostId === user.id) {
//             // If host is waiting for a specific guest, you need that guestId from Redis
//             // Ensure your backend RoomData includes 'targetGuestId' if pending
//           }
//         } else {
//           dispatch(clearPrivateRoom());
//         }
//       } catch (error) {
//         console.error("Hydration error", error);
//       }
//     };