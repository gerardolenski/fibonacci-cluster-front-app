import {Job} from "./job";

export interface TaskStatistics {
  taskId: string;
  scheduledJobsCount: number
  finishedJobsCount: number
  finishedJobs: Job[];
}
