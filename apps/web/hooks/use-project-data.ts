import { useLoggedInUser } from "@bitmetro/auth-react";
import { useProjectsState } from "../state/projects";

interface Result {
  userCanSaveProject: boolean;
}

export const useProjectData = (): Result => {
  const [id, projectOwnerId] = useProjectsState(s => [s._id, s.projectOwnerId]);
  const loggedInUser = useLoggedInUser();

  const userOwnsProject = !id || !!loggedInUser && loggedInUser._id === projectOwnerId;

  return { userCanSaveProject: userOwnsProject }
}
