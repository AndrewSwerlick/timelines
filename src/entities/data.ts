export interface Timeline {
    id: string;
    momentIds: string[];
}

export interface Moment {
    id: string;
    parentId?: string;
    branchPointId?: string;
    // fortunes: Fortune[]
    // failures: Failure[]
    // narrative: string
    // fixed: boolean
    timelineId?: string;
}

export interface BranchPoint {
    id: string;
    sourceTimelineId: string,
    branches: {timelineId: string, momentId: string}[]
}