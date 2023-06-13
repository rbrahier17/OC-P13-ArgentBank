/**
 * types.ts
 * This file defines the RootState interface that represents the overall state of the application from the Redux store
 * Currently, there is only the UserState interface from userSlice, but additional interfaces can be added in the future.
 */
import { UserState } from "../slices/userSlice";

export interface RootState {
  user: UserState;
}
