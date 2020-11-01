import {Job} from "./job";

export interface TaskStatistics {
  taskId: string;
  jobsCount: number
  jobs: Job[];
}
