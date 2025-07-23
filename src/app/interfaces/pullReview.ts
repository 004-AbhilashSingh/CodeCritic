interface finding {
    issue: string;
    recommendation: string;
}

interface improvement {
    file: string;
    changes: string;
}

export interface PullReview {
    summary: string;
    key_findings: finding[];
    suggested_improvements: improvement[];
    recommendation: string
}