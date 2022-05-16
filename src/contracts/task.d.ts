export type Task =
    | AcquireAccountBoundTask
    | BossKillCountTask
    | BossUntilUniqueTask
    | TrainSkillTask
    | CompleteQuestTask
    | CompleteDiaryTask;

export const enum TaskType {
    AcquireAccountBound = "acquireboa",
    BossKillCount = "bosskc",
    BossUntilUnique = "bossunique",
    CompleteDiary = "dodiary",
    CompleteQuest = "doquest",
    TrainSkill = "trainskill"
}

export const enum TaskLength {
    Long = 2,
    Medium = 1,
    Short = 0
}

export interface TaskTypeMap {
    [TaskType.AcquireAccountBound]: AcquireAccountBoundTask;
    [TaskType.BossKillCount]: BossKillCountTask;
    [TaskType.BossUntilUnique]: BossUntilUniqueTask;
    [TaskType.TrainSkill]: TrainSkillTask;
    [TaskType.CompleteQuest]: CompleteQuestTask;
    [TaskType.CompleteDiary]: CompleteDiaryTask;
}

interface BaseTask<T extends TaskType> {
    type: T;
}

export interface BossKillCountTask extends BaseTask<TaskType.BossKillCount> {}

export interface BossUntilUniqueTask
    extends BaseTask<TaskType.BossUntilUnique> {}

export interface TrainSkillTask extends BaseTask<TaskType.TrainSkill> {}

export interface CompleteQuestTask extends BaseTask<TaskType.CompleteQuest> {}

export interface CompleteDiaryTask extends BaseTask<TaskType.CompleteDiary> {}

export interface AcquireAccountBoundTask
    extends BaseTask<TaskType.AcquireAccountBound> {}

export interface Constraints {
    allowedTypes?: TaskType[];
    requiredMaxLength?: TaskLength;
}
