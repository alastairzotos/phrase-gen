import { useProjectsState } from "../state/projects";
import { getUserDetails } from "../utils/user";

interface Result {
  userCanSaveProject: boolean;
}

export const useProjectData = (): Result => {
  const [id, projectOwner] = useProjectsState(s => [s._id, s.projectOwner]);
  const loggedInUser = getUserDetails();

  const userOwnsProject = !id || !!loggedInUser && loggedInUser._id === projectOwner?._id;

  return { userCanSaveProject: userOwnsProject }
}
